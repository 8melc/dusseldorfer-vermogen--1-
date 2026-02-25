from fastapi import (
    APIRouter,
    Request,
    HTTPException,
    Depends,
    Response,
    BackgroundTasks,
)
from pydantic import BaseModel
import stripe
import json
from app.auth import AuthorizedUser
from typing import Dict, Any, Optional
import firebase_admin
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1.client import Client as FirestoreClient
import time
import os

router = APIRouter()

# Initialize Stripe with the secret key
stripe_api_key = os.environ.get("STRIPE_API_KEY")
if not stripe_api_key:
    print("WARNING: STRIPE_API_KEY is not set in environment")

stripe.api_key = stripe_api_key
webhook_secret = os.environ.get("STRIPE_WEBHOOK_SECRET")
if not webhook_secret:
    print("WARNING: STRIPE_WEBHOOK_SECRET is not set in environment")


# Get Firebase configuration from environment
def get_firebase_config() -> dict | None:
    extensions = os.environ.get("DATABUTTON_EXTENSIONS", "[]")
    try:
        extensions = json.loads(extensions)
        for ext in extensions:
            if ext["name"] == "firebase-auth":
                return ext["config"]["firebaseConfig"]
    except Exception as e:
        print(f"Error parsing Firebase config: {str(e)}")
    return None


# Initialize Firestore with proper project configuration
firestore_client = None
try:
    # Get the service account JSON from secrets
    service_account_json = os.environ.get("FIREBASE_SERVICE_ACCOUNT")

    if service_account_json:
        print("Found Firebase service account in secrets, initializing with credentials")
        # Parse the JSON string to a dictionary
        try:
            service_account_info = json.loads(service_account_json)
            # Initialize Firebase with the service account credentials
            if not firebase_admin._apps:
                cred = credentials.Certificate(service_account_info)
                firebase_admin.initialize_app(cred)

            # Initialize Firestore client
            firestore_client = firestore.client()
            print("Firestore initialized successfully with service account credentials")
        except json.JSONDecodeError as e:
            print(f"Error parsing service account JSON: {str(e)}")
    else:
        print("No Firebase config found, using JSON storage")
except Exception as e:
    print(f"Error initializing Firestore: {str(e)}")
    # We'll continue and fallback to JSON storage if Firestore is not available


# Webhook endpoint to handle Stripe events
@router.post("/webhook")
async def stripe_webhook(request: Request):
    try:
        # Get the request body
        payload = await request.body()
        sig_header = request.headers.get("stripe-signature")

        # Verify the signature
        try:
            event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
        except stripe.error.SignatureVerificationError:
            raise HTTPException(status_code=400, detail="Invalid signature")

        # Handle the event
        event_data = event["data"]["object"]

        # Handle different event types
        if event["type"] == "checkout.session.completed":
            # A payment was successful, update the user's subscription status
            customer_id = event_data["customer"]
            subscription_id = event_data.get("subscription")
            client_reference_id = event_data.get("client_reference_id")

            # Print debug information
            print(
                f"Checkout completed. Customer: {customer_id}, Subscription: {subscription_id}, User: {client_reference_id}"
            )

            # Store the subscription information
            if subscription_id:
                # Get subscription details from Stripe to have accurate plan information
                try:
                    subscription = stripe.Subscription.retrieve(subscription_id)
                    plan_name = "Premium"
                    # Try to get a better name from the product
                    if subscription and subscription.get("items") and subscription["items"].get("data"):
                        product_id = subscription["items"]["data"][0].get("price", {}).get("product")
                        if product_id:
                            product = stripe.Product.retrieve(product_id)
                            if product and product.get("name"):
                                plan_name = product["name"]
                except Exception as e:
                    print(f"Error retrieving subscription details: {str(e)}")
                    plan_name = "Premium"

                # Store subscription data
                subscription_data = {
                    "customer_id": customer_id,
                    "subscription_id": subscription_id,
                    "status": "active",
                    "plan": plan_name,
                    "created_at": int(time.time()),
                    "updated_at": int(time.time()),
                }

                # Store in Firestore if available, otherwise fallback to JSON
                if firestore_client:
                    try:
                        # If we have a client_reference_id (user ID), use that as the document ID
                        doc_ref = None
                        doc_id = None

                        if client_reference_id:
                            doc_id = client_reference_id
                            doc_ref = firestore_client.collection("subscriptions").document(doc_id)
                        else:
                            # Create a special document ID format for customer IDs
                            doc_id = f"customer_{customer_id}"
                            doc_ref = firestore_client.collection("subscriptions").document(doc_id)
                            # Also log this situation for debugging
                            print(
                                f"No client_reference_id found, storing subscription under customer ID: {customer_id}"
                            )

                        # Set the document data
                        doc_ref.set(subscription_data)

                        # Verify the write by reading it back
                        doc = doc_ref.get()
                        if doc.exists:
                            print(f"Successfully saved subscription data to Firestore for: {doc_id}")
                            print(f"Data: {doc.to_dict()}")
                        else:
                            print(f"Warning: Subscription data was written but could not be read back for: {doc_id}")

                    except Exception as e:
                        print(f"Error saving to Firestore: {str(e)}")
                else:
                    print("WARNING: Firestore client not available, subscription data not saved")

        elif event["type"] == "customer.subscription.updated":
            # Subscription was updated
            customer_id = event_data["customer"]
            subscription_id = event_data["id"]
            status = event_data["status"]

            if firestore_client:
                try:
                    # Query Firestore to find the subscription by subscription_id
                    subscription_query = (
                        firestore_client.collection("subscriptions")
                        .where("subscription_id", "==", subscription_id)
                        .limit(1)
                    )
                    subscription_docs = subscription_query.get()

                    for doc in subscription_docs:
                        # Update the found document
                        firestore_client.collection("subscriptions").document(doc.id).update(
                            {"status": status, "updated_at": int(time.time())}
                        )
                        print(f"Updated subscription status in Firestore for user: {doc.id}")
                except Exception as e:
                    print(f"Error updating Firestore: {str(e)}")
            else:
                print("WARNING: Firestore client not available, subscription update not saved")

        elif event["type"] == "customer.subscription.deleted":
            # Subscription was cancelled
            customer_id = event_data["customer"]
            subscription_id = event_data["id"]

            if firestore_client:
                try:
                    # Query Firestore to find the subscription by subscription_id
                    subscription_query = (
                        firestore_client.collection("subscriptions")
                        .where("subscription_id", "==", subscription_id)
                        .limit(1)
                    )
                    subscription_docs = subscription_query.get()

                    for doc in subscription_docs:
                        # Update the found document
                        firestore_client.collection("subscriptions").document(doc.id).update(
                            {"status": "cancelled", "updated_at": int(time.time())}
                        )
                        print(f"Marked subscription as cancelled in Firestore for user: {doc.id}")
                except Exception as e:
                    print(f"Error updating Firestore for cancelled subscription: {str(e)}")
            else:
                print("WARNING: Firestore client not available, subscription cancellation not saved")

        # Return a 200 response to acknowledge receipt of the event
        print(f"Successfully processed Stripe event: {event['type']}")
        return {"status": "success", "event": event["type"]}

    except Exception as e:
        print(f"Error processing webhook: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Endpoint to check a user's subscription status
class SubscriptionStatusResponse(BaseModel):
    has_subscription: bool
    status: str = ""
    plan: str = ""


@router.get("/subscription-status")
async def get_subscription_status(user: AuthorizedUser) -> SubscriptionStatusResponse:
    try:
        user_id = user.sub

        # First try to check Firestore if available
        if firestore_client:
            try:
                # Check if user has a subscription in Firestore
                subscription_doc = firestore_client.collection("subscriptions").document(user_id).get()

                if subscription_doc.exists:
                    subscription = subscription_doc.to_dict()
                    # Only show active subscription if status is active
                    if subscription.get("status") == "active":
                        return SubscriptionStatusResponse(
                            has_subscription=True,
                            status=subscription.get("status", ""),
                            plan=subscription.get("plan", "Premium"),
                        )

                # If not found by user ID and user has email, try to find by email in Stripe
                if hasattr(user, "email") and user.email:
                    try:
                        # Try to find the customer in Stripe by email
                        customers = stripe.Customer.list(email=user.email)
                        if customers and customers.data:
                            # For each customer with this email
                            for customer in customers.data:
                                customer_key = f"customer_{customer.id}"
                                # Check if we have a subscription for this customer in Firestore
                                customer_doc = firestore_client.collection("subscriptions").document(customer_key).get()
                                if customer_doc.exists:
                                    subscription = customer_doc.to_dict()
                                    if subscription.get("status") == "active":
                                        # We found a match! Now permanently associate this with the user ID
                                        firestore_client.collection("subscriptions").document(user_id).set(subscription)
                                        return SubscriptionStatusResponse(
                                            has_subscription=True,
                                            status=subscription.get("status", ""),
                                            plan=subscription.get("plan", "Premium"),
                                        )
                    except Exception as e:
                        print(f"Error trying to match user by email in Firestore: {str(e)}")
            except Exception as e:
                print(f"Error checking Firestore for subscription: {str(e)}")
                # Fallback to JSON storage

        # If nothing found or subscription not active, return no subscription
        return SubscriptionStatusResponse(has_subscription=False)

    except Exception as e:
        print(f"Error checking subscription: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Endpoint to get public Stripe keys
class StripePublicKeysResponse(BaseModel):
    publishable_key: str
    pricing_table_id: str


@router.get("/public-keys")
async def get_stripe_public_keys() -> StripePublicKeysResponse:
    """Get public Stripe keys for the frontend"""
    try:
        # Get the keys from environment
        publishable_key = os.environ.get("STRIPE_PUBLISHABLE_KEY", "")
        pricing_table_id = os.environ.get("STRIPE_PRICING_TABLE_ID", "")

        return StripePublicKeysResponse(publishable_key=publishable_key, pricing_table_id=pricing_table_id)
    except Exception as e:
        print(f"Error getting Stripe public keys: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


## COMMENT OUT THE FOLLOWING BY REMOVING TO TEST WRITING TO FIRESTORE.


class TestFirestoreResponse(BaseModel):
    success: bool
    message: str
    timestamp: str


@router.get("/test-firestore")
async def test_firestore() -> TestFirestoreResponse:
    """Test writing to Firestore"""
    success = False
    message = ""
    timestamp = str(int(time.time()))

    try:
        if firestore_client:
            # Create a test collection and document
            test_ref = firestore_client.collection("test").document("test-write")

            # Data to write
            data = {
                "message": "Test write operation",
                "timestamp": timestamp,
                "test": True,
            }

            # Write the data
            test_ref.set(data)

            # Try to read it back to verify
            doc = test_ref.get()
            if doc.exists:
                success = True
                message = f"Successfully wrote to Firestore: {doc.to_dict()}"
                print(message)
            else:
                message = "Document was written but could not be read back"
                print(message)
        else:
            message = "Firestore client is not initialized"
            print(message)
    except Exception as e:
        message = f"Error writing to Firestore: {str(e)}"
        print(message)

    return TestFirestoreResponse(success=success, message=message, timestamp=timestamp)
