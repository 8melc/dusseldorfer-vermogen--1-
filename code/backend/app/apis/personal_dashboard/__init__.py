"""Personal Dashboard API for authenticated advisors."""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.auth import AuthorizedUser
from app.libs.personal_dashboard_data import PERSONAL_DASHBOARD_DUMMY, PersonalDashboardSettingsModel

router = APIRouter(prefix="/api/dashboard/personal", tags=["dashboard-personal"])


# User info
class UserInfo(BaseModel):
    fullName: str
    role: str
    segments: list[str]
    nextMeeting: Optional[str] = None

# Weekly focus and recommendations
class PersonalRecommendation(BaseModel):
    title: str
    description: str
    actionLabel: str

# Goals
class Goal(BaseModel):
    label: str
    target: str
    progress: float

# Client highlights
class ClientHighlight(BaseModel):
    name: str
    status: str
    lastContact: str
    nextStep: str

# Favorites
class Favorite(BaseModel):
    title: str
    type: str
    link: str

# Schedule
class ScheduleItem(BaseModel):
    title: str
    datetime: str
    type: Optional[str] = None

# Development
class DevelopmentItem(BaseModel):
    title: str
    provider: Optional[str] = None
    status: str

# Complete response
class PersonalDashboardResponse(BaseModel):
    user: UserInfo
    weeklyFocus: list[str]
    personalRecommendations: list[PersonalRecommendation]
    lastUpdated: str
    goals: list[Goal]
    clientHighlights: list[ClientHighlight]
    favorites: list[Favorite]
    schedule: list[ScheduleItem]
    development: list[DevelopmentItem]


@router.get("/overview", response_model=PersonalDashboardResponse)
async def get_personal_dashboard_overview(user: AuthorizedUser) -> PersonalDashboardResponse:
    """Get complete personal dashboard overview for the authenticated advisor."""
    
    # Extract user name from Firebase auth token
    user_name = user.name if hasattr(user, 'name') and user.name else user.email.split('@')[0] if user.email else "Nutzer"
    
    # Create user info with real authenticated user data
    user_info = UserInfo(
        fullName=user_name,
        role=PERSONAL_DASHBOARD_DUMMY["user"]["role"],
        segments=PERSONAL_DASHBOARD_DUMMY["user"]["segments"],
        nextMeeting=PERSONAL_DASHBOARD_DUMMY["user"]["nextMeeting"]
    )
    
    return PersonalDashboardResponse(
        user=user_info,
        weeklyFocus=PERSONAL_DASHBOARD_DUMMY["weeklyFocus"],
        personalRecommendations=[PersonalRecommendation(**rec) for rec in PERSONAL_DASHBOARD_DUMMY["personalRecommendations"]],
        lastUpdated=PERSONAL_DASHBOARD_DUMMY["lastUpdated"],
        goals=[Goal(**goal) for goal in PERSONAL_DASHBOARD_DUMMY["goals"]],
        clientHighlights=[ClientHighlight(**client) for client in PERSONAL_DASHBOARD_DUMMY["clientHighlights"]],
        favorites=[Favorite(**fav) for fav in PERSONAL_DASHBOARD_DUMMY["favorites"]],
        schedule=[ScheduleItem(**item) for item in PERSONAL_DASHBOARD_DUMMY["schedule"]],
        development=[DevelopmentItem(**item) for item in PERSONAL_DASHBOARD_DUMMY["development"]]
    )


@router.post("/settings")
async def save_personal_dashboard_settings(
    user: AuthorizedUser,
    payload: PersonalDashboardSettingsModel
) -> dict:
    """
    Save personal dashboard settings for the authenticated user.
    
    Currently returns a dummy response. Future implementation will save to Firestore
    using user.sub as the document ID.
    
    Protected endpoint - requires authentication.
    """
    # Future: Save to Firestore collection 'user_settings' with document ID = user.sub
    # db.collection('user_settings').document(user.sub).set(payload.dict())
    
    return {
        "status": "ok",
        "message": "Einstellungen erfolgreich gespeichert",
        "settings": payload.dict()
    }
