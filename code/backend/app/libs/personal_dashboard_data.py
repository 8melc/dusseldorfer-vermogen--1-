
"""Dummy data for personal dashboard."""

from pydantic import BaseModel
from typing import Literal

class PersonalDashboardSettingsModel(BaseModel):
    """Model for personal dashboard user settings."""
    investment_focus: Literal["traditional", "esg", "alternatives", "mixed"]
    content_frequency: Literal["daily", "weekly", "monthly"]
    preferred_formats: list[Literal["reports", "briefings", "events", "audio"]]
    notifications_enabled: bool
    ai_tone: Literal["conservative", "balanced", "progressive"]

PERSONAL_DASHBOARD_DUMMY = {
    "user": {
        "fullName": "Dr. Anna Schmidt",
        "role": "Senior Wealth Advisor",
        "segments": ["Private Banking", "UHNWI"],
        "nextMeeting": "2025-11-18T14:30:00"
    },
    "weeklyFocus": [
        "Jahresgespräche mit Top-5-Mandaten vorbereiten",
        "ESG-Portfolio-Review für Familie Müller abschließen",
        "Neue Immobilienfonds-Strategie mit Team abstimmen"
    ],
    "personalRecommendations": [
        {
            "title": "Folgeberatung empfohlen",
            "description": "Familie Berger hat vor 6 Wochen Immobilienkauf getätigt – idealer Zeitpunkt für Anschlussfinanzierung",
            "actionLabel": "Termin vorschlagen"
        },
        {
            "title": "Neue Research-Insights verfügbar",
            "description": "3 neue Reports zu Alternative Investments passen zu Ihren Top-Mandaten",
            "actionLabel": "Reports ansehen"
        },
        {
            "title": "Netzwerk erweitern",
            "description": "2 potenzielle Mandanten in Ihrer Region haben Interesse an Private Banking signalisiert",
            "actionLabel": "Kontakte ansehen"
        }
    ],
    "lastUpdated": "2025-11-16T09:45:00",
    "goals": [
        {"label": "Neukundenakquise", "target": "15 neue Mandate", "progress": 0.53},
        {"label": "AuM-Wachstum", "target": "€25M", "progress": 0.68},
        {"label": "ESG-Quote", "target": "40% Portfolio", "progress": 0.35}
    ],
    "clientHighlights": [
        {
            "name": "Familie Müller",
            "status": "Intensive Betreuung",
            "lastContact": "2025-11-16",
            "nextStep": "ESG-Portfolio Review Q1"
        },
        {
            "name": "Dr. Weber",
            "status": "Follow-up erforderlich",
            "lastContact": "2025-11-15",
            "nextStep": "Jahresgespräch vereinbaren"
        },
        {
            "name": "Unternehmen Schneider GmbH",
            "status": "Akquise-Phase",
            "lastContact": "2025-11-17",
            "nextStep": "Erstgespräch Nachfolgeplanung"
        }
    ],
    "favorites": [
        {"title": "Alternative Investments Q4 2024", "type": "Report", "link": "#"},
        {"title": "ESG-Kriterien Immobilienfonds", "type": "Dokument", "link": "#"},
        {"title": "Nachfolgeplanung: Best Practices", "type": "Präsentation", "link": "#"}
    ],
    "schedule": [
        {"title": "Jahresgespräch Familie Müller", "datetime": "2025-11-18T14:30:00", "type": "Kundentermin"},
        {"title": "Team-Meeting Private Banking", "datetime": "2025-11-19T10:00:00", "type": "Intern"},
        {"title": "Webinar: Neue Steuerreform", "datetime": "2025-11-20T15:00:00", "type": "Weiterbildung"}
    ],
    "development": [
        {"title": "Certified ESG Advisor", "provider": "CFA Institute", "status": "geplant"},
        {"title": "Advanced Estate Planning", "provider": "IWI", "status": "offen"},
        {"title": "Digital Wealth Management", "provider": "Frankfurt School", "status": "abgeschlossen"}
    ]
}
