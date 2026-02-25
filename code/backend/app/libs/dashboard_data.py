"""Dashboard Dummy Data Module

Provides dummy data for dashboard MVP.
Later can be replaced with real data sources (Firestore, APIs, etc.)
"""

from datetime import datetime, timedelta
from typing import List, Dict, Any


def get_dummy_kpis() -> Dict[str, Any]:
    """Returns dummy KPI metrics for dashboard.
    
    Returns:
        Dictionary with KPI data including values, trends, and changes.
    """
    return {
        "assets_under_advisory": {
            "value": 245000000,  # 245M EUR
            "currency": "EUR",
            "change_percentage": 12.5,
            "trend": "up",
            "previous_value": 217777778
        },
        "active_clients": {
            "value": 127,
            "change_percentage": 8.5,
            "trend": "up",
            "previous_value": 117
        },
        "conversion_rate": {
            "value": 34.2,  # percentage
            "change_percentage": -2.1,
            "trend": "down",
            "previous_value": 34.9
        },
        "ytd_growth": {
            "value": 18.7,  # percentage
            "change_percentage": 3.2,
            "trend": "up",
            "previous_value": 18.1
        },
        "period": "Letzte 30 Tage",
        "last_updated": datetime.now().isoformat()
    }


def get_dummy_actions() -> List[Dict[str, Any]]:
    """Returns dummy action items for Action Center.
    
    Returns:
        List of action items with priority, deadline, and status.
    """
    now = datetime.now()
    
    return [
        {
            "id": "ACT-001",
            "title": "Follow-up: Portfolio-Review Dr. Weber",
            "description": "Quartalsweise Portfolio-Überprüfung geplant für Q4 2024",
            "priority": "high",
            "deadline": (now + timedelta(days=3)).isoformat(),
            "category": "client_meeting",
            "client_name": "Dr. Michael Weber",
            "status": "pending"
        },
        {
            "id": "ACT-002",
            "title": "Compliance: Risikobewertung aktualisieren",
            "description": "Jährliche Risikobewertungs-Dokumentation erforderlich",
            "priority": "medium",
            "deadline": (now + timedelta(days=7)).isoformat(),
            "category": "compliance",
            "status": "in_progress"
        },
        {
            "id": "ACT-003",
            "title": "Angebot: Nachhaltige Investmentstrategie",
            "description": "ESG-Portfolio-Vorschlag für Familie Schmidt vorbereiten",
            "priority": "high",
            "deadline": (now + timedelta(days=5)).isoformat(),
            "category": "proposal",
            "client_name": "Family Office Schmidt",
            "status": "pending"
        },
        {
            "id": "ACT-004",
            "title": "Dokumenten-Upload: Steueroptimierungsbericht",
            "description": "Q3-Steueroptimierungsanalyse ins Kundenportal hochladen",
            "priority": "low",
            "deadline": (now + timedelta(days=10)).isoformat(),
            "category": "documentation",
            "status": "pending"
        },
        {
            "id": "ACT-005",
            "title": "Neuer Lead: Rheinberg-Services vorstellen",
            "description": "Erstgespräch mit potenziellem UHNW-Kunden",
            "priority": "high",
            "deadline": (now + timedelta(days=2)).isoformat(),
            "category": "lead",
            "client_name": "Vertraulich - UHNW-Interessent",
            "status": "pending"
        }
    ]


def get_dummy_ai_insight() -> Dict[str, Any]:
    """Returns dummy AI-generated insights and recommendations.
    
    Returns:
        Dictionary with AI insights, recommendations, and suggested actions.
    """
    return {
        "summary": "Ihre Client-Pipeline zeigt starkes Wachstum im Premium-Segment. Wir empfehlen, sich auf Nachfolgeplanung und ESG-Strategien zu fokussieren, um das Potenzial optimal auszuschöpfen.",
        "insights": [
            {
                "type": "opportunity",
                "title": "Nachfolgeplanung-Potenzial",
                "description": "3 Ihrer Top-Kunden (> 65 Jahre) haben noch keine dokumentierte Nachfolgestrategie. Durchschnittliches Vermögen: 8.5M EUR. Hier liegt erhebliches Beratungspotenzial für Sie.",
                "confidence": 0.87,
                "action_label": "Gespräche planen"
            },
            {
                "type": "trend",
                "title": "ESG-Interesse steigt",
                "description": "42% Ihrer Kunden haben in den letzten 3 Monaten nach nachhaltigen Anlagestrategien gefragt. Dies bietet Ihnen die Chance, sich als ESG-Experte zu positionieren.",
                "confidence": 0.92,
                "action_label": "ESG-Portfolio erstellen"
            },
            {
                "type": "risk",
                "title": "Conversion-Rate rückläufig",
                "description": "Ihre Conversion-Rate ist um 2.1% gesunken. Hauptgrund: längere Response-Zeiten bei Erstanfragen. Wir empfehlen, Ihren Follow-up-Prozess zu optimieren.",
                "confidence": 0.78,
                "action_label": "Prozess optimieren"
            }
        ],
        "recommended_actions": [
            "Organisieren Sie einen Workshop zum Thema 'Nachfolgeplanung im Familienunternehmen'",
            "Führen Sie ein ESG-Screening für Ihre bestehenden Portfolios durch",
            "Automatisieren Sie Ihren Follow-up-Prozess für neue Leads"
        ],
        "generated_at": datetime.now().isoformat(),
        "model": "GPT-4o Advisor Assistant"
    }
