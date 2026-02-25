import { useEffect } from "react";
import { useCurrentUser } from "app";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Declare the custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": any;
    }
  }
}

interface StripePricingTableProps {
  pricingTableId: string;
  publishableKey: string;
}

export function StripePricingTable({ pricingTableId, publishableKey }: StripePricingTableProps) {
  const { user, loading } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Load the Stripe Pricing Table script
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.head.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      try {
        document.head.removeChild(script);
      } catch (e) {
        // Script might already be removed
      }
    };
  }, []);

  // If still loading auth state, show a loading message
  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 text-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  // If user is not authenticated, show a login prompt
  if (!user) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 text-center space-y-4">
        <Button
          onClick={() => navigate("/Login")}
          className="mt-4"
        >
          See plans
        </Button>
      </div>
    );
  }

  // If user is authenticated, show the pricing table
  return (
    <div className="w-full max-w-6xl mx-auto">
      <stripe-pricing-table
        pricing-table-id={pricingTableId}
        publishable-key={publishableKey}
        client-reference-id={user.uid}
      ></stripe-pricing-table>
    </div>
  );
}
