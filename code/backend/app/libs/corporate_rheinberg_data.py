"""
Dummy data for Corporate Dashboard (Rheinberg Privatbank)
Provides banking-specific KPIs, actions, and insights.
"""

from datetime import datetime, timedelta


def get_corporate_rheinberg_kpis():
    """Return corporate-specific KPIs for Rheinberg Privatbank."""
    return {
        "assets_under_advisory": {
            "value": 12_400_000_000,  # 12.4 Mrd. EUR
            "change_percentage": 3.1,
            "trend": "up",
            "previous_value": 12_025_000_000,
            "currency": "EUR",
        },
        "premium_clients": {
            "value": 318,
            "change_percentage": 3.9,
            "trend": "up",
            "previous_value": 306,
            "currency": None,
        },
        "conversion_rate": {
            "value": 31.6,
            "change_percentage": 4.0,
            "trend": "up",
            "previous_value": 30.4,
            "currency": None,
        },
        "client_satisfaction": {
            "value": 68,  # NPS Score
            "change_percentage": 7.9,
            "trend": "up",
            "previous_value": 63,
            "currency": None,
        },
        "esg_quote": {
            "value": 46.0,
            "change_percentage": 15.0,
            "trend": "up",
            "previous_value": 40.0,
            "currency": None,
        },
        "period": "Letzte 30 Tage",
        "last_updated": datetime.now().isoformat(),
    }


def get_corporate_rheinberg_actions():
    """Return corporate action items for Rheinberg Privatbank."""
    now = datetime.now()
    
    actions = [
        {
            "id": "corp-action-1",
            "title": "KYC-Update Schmidt Family Office",
            "description": "Jährliche Aktualisierung der Kundendaten und Risikoprofil-Review",
            "priority": "high",
            "deadline": now.isoformat(),
            "category": "compliance",
            "client_name": "Schmidt Family Office",
            "status": "pending",
        },
        {
            "id": "corp-action-2",
            "title": "Nachfolge-Workshop Dr. Weber",
            "description": "Strukturierte Vermögensübergabe und steueroptimierte Nachfolgeplanung",
            "priority": "high",
            "deadline": (now + timedelta(days=2)).isoformat(),
            "category": "advisory",
            "client_name": "Dr. Weber",
            "status": "in_progress",
        },
        {
            "id": "corp-action-3",
            "title": "MiFID II Suitability Review",
            "description": "Quartalsweise Überprüfung der Anlageeignung für Premium-Kunden",
            "priority": "medium",
            "deadline": (now + timedelta(days=5)).isoformat(),
            "category": "compliance",
            "client_name": None,
            "status": "pending",
        },
        {
            "id": "corp-action-4",
            "title": "ESG-Reporting Q3 finalisieren",
            "description": "Nachhaltigkeitsbericht für institutionelle Mandate abschließen",
            "priority": "high",
            "deadline": (now + timedelta(days=7)).isoformat(),
            "category": "esg_sustainability",
            "client_name": None,
            "status": "in_progress",
        },
        {
            "id": "corp-action-5",
            "title": "Portfolio-Neuausrichtung NextGen",
            "description": "Strategische Asset Allocation für NextGen-Programm anpassen",
            "priority": "medium",
            "deadline": (now + timedelta(days=9)).isoformat(),
            "category": "portfolio_management",
            "client_name": "NextGen Program",
            "status": "pending",
        },
    ]
    
    return {
        "actions": actions,
        "total_count": len(actions),
        "pending_count": sum(1 for a in actions if a["status"] == "pending"),
        "high_priority_count": sum(1 for a in actions if a["priority"] == "high"),
    }


def get_corporate_rheinberg_ai_insight():
    """Return AI-generated insights for Rheinberg Privatbank corporate dashboard."""
    return {
        "summary": "Ihre Premium-Segmente verzeichnen 14% Wachstum, gleichzeitig steigt der ESG-Anteil auf 46%. Die Client Satisfaction erreicht mit einem NPS von 68 Spitzenwerte. Empfehlungen: Fokus auf Nachfolgeplanung intensivieren und Marktupdate für NextGen-Klientinnen und -Klienten bereitstellen.",
        "insights": [
            {
                "type": "opportunity",
                "title": "Nachfolgeplanung-Potenzial identifiziert",
                "description": "5 Premium-Mandate ohne finalisierten Übergabeplan mit durchschnittlichem Vermögen von 9,1 Mio. EUR. Proaktive Beratungsgespräche können Mandatstreue erhöhen.",
                "confidence": 0.87,
                "action_label": "Beratungsgespräche planen",
            },
            {
                "type": "trend",
                "title": "ESG-Interest steigt signifikant",
                "description": "38% mehr ESG-Anfragen in den letzten 90 Tagen. Nachhaltige Investments werden zum Standard bei Neugeschäft im Premium-Segment.",
                "confidence": 0.92,
                "action_label": "ESG-Portfolio erstellen",
            },
            {
                "type": "risk",
                "title": "Conversion Rate rückläufig in Region Süd",
                "description": "Die Lead-to-Mandat Conversion ist in der Region Süd um 3 Prozentpunkte gesunken. Mögliche Ursachen: längere Reaktionszeiten oder veränderte Marktbedingungen.",
                "confidence": 0.78,
                "action_label": "Sales-Prozess überprüfen",
            },
            {
                "type": "recommendation",
                "title": "NextGen-Programm ausbauen",
                "description": "95% Bindungsrate bei NextGen-Teilnehmern. Skalierung des Programms könnte langfristige Mandatssicherung stärken.",
                "confidence": 0.85,
                "action_label": "Programm erweitern",
            },
        ],
        "recommended_actions": [
            "Workshop Nachfolgeplanung für identifizierte Premium-Mandate organisieren",
            "ESG-Screening für Bestandsportfolios durchführen und Optimierungspotenziale aufzeigen",
            "Prozess-Automation für Lead-Follow-ups implementieren",
            "Regionsspezifische Sales-Performance-Analyse durchführen",
            "NextGen-Programm auf weitere Standorte ausrollen",
        ],
        "generated_at": datetime.now().isoformat(),
        "model": "GPT-4o Corporate Advisory Analytics",
    }
