from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

router = APIRouter(prefix="/api")

# Mock data mimicking the structure in insightsData.ts
mock_insights_data = [
    {
        "id": "1",
        "title": "Die Zukunft der nachhaltigen Geldanlage in Deutschland",
        "category": "Nachhaltigkeit",
        "summary": "Eine Analyse der aktuellen ESG-Trends...",
        "image": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "isPremium": True,
        "hasAudio": True,
        "tags": ["ESG", "Green Finance", "Portfolio"],
    },
    {
        "id": "2",
        "title": "Immobilienmarkt Köln: Chancen und Risiken 2025",
        "category": "Immobilien",
        "summary": "Experten bewerten die Lage im Luxussegment...",
        "image": "https://images.unsplash.com/photo-1582407947304-fd86f028f716",
        "isPremium": True,
        "hasAudio": False,
        "tags": ["Luxusimmobilien", "Köln", "Investment"],
    },
    {
        "id": "3",
        "title": "Private Equity: Exklusiver Zugang zu Wachstumsunternehmen",
        "category": "Anlagestrategie",
        "summary": "Wie Sie als Privatanleger von den Renditechancen profitieren...",
        "image": "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "isPremium": False,
        "hasAudio": True,
        "tags": ["Private Equity", "Wachstum", "Rendite"],
    },
    {
        "id": "53",
        "title": "ESG-Integration in Familienunternehmen: Mehr als ein Trend",
        "category": "Nachhaltigkeit",
        "summary": "Wie deutsche Familienunternehmen Nachhaltigkeitskriterien integrieren...",
        "image": "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "isPremium": True,
        "hasAudio": False,
        "tags": ["ESG", "Mittelstand", "Familienunternehmen"],
    },
    {
        "id": "4",
        "title": "Künstliche Intelligenz im Portfoliomanagement",
        "category": "Technologie",
        "summary": "Wie KI die Anlagestrategien revolutioniert.",
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475",
        "isPremium": False,
        "hasAudio": True,
        "tags": ["KI", "Fintech", "Portfolio"],
    },
    {
        "id": "5",
        "title": "Market Outlook zur Jahresmitte 2025: Wachstumsgelegenheiten in Europa und Asien im Fokus",
        "category": "Märkte & Investments",
        "summary": "Die USA verlieren an Dominanz, während Europa und Asien durch offene Handelsbeziehungen und wachstumsfördernde Politik zu neuen Vorreitern werden.",
        "image": "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "isPremium": False,
        "hasAudio": True,
        "tags": ["Wirtschaftsausblick", "Europa", "Asien", "Inflation", "Wachstum"],
        "author": "Fabian Reuther",
        "date": "2025-06-18",
        "source": "Rheinberg Privatbank"
    },
    {
        "id": "6",
        "title": "Der Aufstieg von alternativen Proteinen",
        "category": "Food & Beverage",
        "summary": "Investitionsmöglichkeiten im Markt für Fleischalternativen.",
        "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        "isPremium": False,
        "hasAudio": True,
        "tags": ["Foodtech", "Nachhaltigkeit", "Investment"],
    }
]

# Pydantic Models
class Insight(BaseModel):
    id: str
    title: str
    category: str
    summary: str
    image: str
    is_premium: bool = Field(..., alias="isPremium")
    has_audio: bool = Field(..., alias="hasAudio")
    tags: Optional[List[str]] = None

class Interaction(BaseModel):
    content_id: str = Field(..., alias="contentId")
    interaction_type: str = Field(..., alias="interactionType")
    timestamp: str
    additional_data: Optional[Dict[str, Any]] = Field(None, alias="additionalData")


@router.get("/insights", response_model=List[Insight])
async def get_insights(
    userId: str, region: str, sector: str, timeframe: str
):
    """Simulates fetching general insights, filtered by user criteria."""
    # Return non-premium, non-special content
    general_insights = [
        item for item in mock_insights_data 
        if not item["isPremium"] and item["category"] not in ["Nachhaltigkeit", "Anlagestrategie", "Märkte & Investments"]
    ]
    return general_insights

@router.get("/theme-specials", response_model=List[Insight])
async def get_theme_specials(userId: str):
    """Simulates fetching theme specials based on user preferences."""
    # Filtering for specific categories that are not premium
    specials = [
        item for item in mock_insights_data 
        if not item["isPremium"] and item["category"] in ["Nachhaltigkeit", "Anlagestrategie", "Märkte & Investments"]
    ]
    return specials

@router.get("/premium-content", response_model=List[Insight])
async def get_premium_content(userId: str):
    """Simulates fetching premium content."""
    premium = [item for item in mock_insights_data if item["isPremium"]]
    return premium

@router.post("/track-interaction")
async def track_interaction(interaction: Interaction):
    """Simulates tracking a user interaction."""
    print(f"Tracking interaction: {interaction.model_dump_json(by_alias=True)}")
    return {"status": "ok", "tracked_interaction": interaction}
