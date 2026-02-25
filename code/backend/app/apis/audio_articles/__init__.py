from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

# --- Pydantic Data Models ---

class AudioSnippet(BaseModel):
    """Represents a single audio snippet linked to an article."""
    id: int
    title: str
    url: str
    duration_seconds: int

class Article(BaseModel):
    """Represents a financial article with optional audio snippets."""
    id: int
    title: str
    author: str
    publication_date: str
    summary: str
    cover_image_url: str
    snippets: List[AudioSnippet] = []

# --- API Router ---

# The router is created without a prefix, so endpoints will be at /audio_articles/...
# The user has also specified that this should be public, so no auth for now.
router = APIRouter()

# --- Sample Data ---

# Using a simple in-memory list for sample data as requested.
# This avoids database setup for the initial MVP.
SAMPLE_ARTICLES: List[Article] = [
    Article(
        id=1,
        title="Die Zukunft der Geldanlage: KI-gestützte Portfolios",
        author="Dr. Eva Schmidt",
        publication_date="2024-08-15",
        summary="Künstliche Intelligenz revolutioniert das Portfoliomanagement. Erfahren Sie, wie Algorithmen dabei helfen, Risiken zu minimieren und Renditen zu optimieren.",
        cover_image_url="https://images.unsplash.com/photo-1620712943543-282862a42db6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        snippets=[
            AudioSnippet(id=101, title="Einleitung: KI im Finanzwesen", url="/audio/101.mp3", duration_seconds=185),
            AudioSnippet(id=102, title="Chancen und Risiken", url="/audio/102.mp3", duration_seconds=240),
        ],
    ),
    Article(
        id=2,
        title="Nachhaltige Investitionen: Mit gutem Gewissen Vermögen aufbauen",
        author="Markus Weber",
        publication_date="2024-07-22",
        summary="ESG-Kriterien sind mehr als nur ein Trend. Entdecken Sie, wie Sie durch nachhaltige Anlagen nicht nur finanzielle, sondern auch gesellschaftliche Werte schaffen.",
        cover_image_url="https://images.unsplash.com/photo-1590035933979-f559d1a33c11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        snippets=[],
    ),
    Article(
        id=3,
        title="Der Immobilienmarkt 2024: Kaufen, halten oder verkaufen?",
        author="Julia Kaufmann",
        publication_date="2024-08-01",
        summary="Analyse der aktuellen Zinsentwicklung und Preisdynamik. Eine fundierte Entscheidungshilfe für Eigentümer und potenzielle Käufer.",
        cover_image_url="https://images.unsplash.com/photo-1560518883-ce09059ee416?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        snippets=[
            AudioSnippet(id=301, title="Analyse der Marktlage", url="/audio/301.mp3", duration_seconds=310),
        ],
    ),
]

# --- API Endpoints ---

@router.get("/articles", response_model=List[Article])
def get_articles():
    """
    Retrieves a list of sample financial articles.
    This endpoint is public and does not require authentication.
    """
    return SAMPLE_ARTICLES
