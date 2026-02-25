import csv
import io
import random
import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

BANK_LOGOS = {
    "Rheinberg Privatbank": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%231D2A44%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23D9C48B%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2726%27%3ERheinberg%3C/text%3E%3C/svg%3E",
    "Triversa Private Clients": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%231B3A2B%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23ECF4E8%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2724%27%3ETriversa%3C/text%3E%3C/svg%3E",
    "Lindenhof Finanzhaus": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%232F3E4F%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23F4E3B2%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2724%27%3ELindenhof%3C/text%3E%3C/svg%3E",
    "Aurora Handelsbank": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%232F2545%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23F7E9C7%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2724%27%3EAurora%3C/text%3E%3C/svg%3E",
    "Novaris Capital": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%230F3B57%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%239FD4FF%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2724%27%3ENovaris%3C/text%3E%3C/svg%3E",
    "Helvetia Struktur AG": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%23293D2A%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23D8F2D1%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2723%27%3EHelvetia%3C/text%3E%3C/svg%3E",
    "Nordquell Vermögen": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%231B2E3F%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%237FD2FF%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2722%27%3ENordquell%3C/text%3E%3C/svg%3E",
    "Meridian Global Advisory": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%232C2F4D%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23E6D9FF%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2722%27%3EMeridian%3C/text%3E%3C/svg%3E",
    "Altmuehl & Partner": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%233B2A1F%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23F5D7A8%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2722%27%3EAltmuehl%3C/text%3E%3C/svg%3E",
    "Eichenstein Conseil": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%232F2A24%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23EEDDBF%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2722%27%3EEichenstein%3C/text%3E%3C/svg%3E",
    "Velorum Aachen": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27200%27%20height%3D%2760%27%3E%3Crect%20width%3D%27200%27%20height%3D%2760%27%20rx%3D%278%27%20fill%3D%27%233A1F3D%27/%3E%3Ctext%20x%3D%27100%27%20y%3D%2736%27%20text-anchor%3D%27middle%27%20fill%3D%27%23F9C7FF%27%20font-family%3D%27Georgia%2C%20serif%27%20font-size%3D%2722%27%3EVelorum%3C/text%3E%3C/svg%3E"
}

ADVISORS_DATA = [
    {
        "id": "markus-voss",
        "name": "Dr. Markus Voss",
        "title": "Leiter Unternehmerfamilien & Stiftungen",
        "bank": "Rheinberg Privatbank",
        "location": "Köln",
        "avatarUrl": "https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGdlc2NoJUMzJUE0ZnRzZiVDMyVCQ2hyZXJ8ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&w=400&h=400&q=80",
        "bankLogoUrl": BANK_LOGOS["Rheinberg Privatbank"],
        "premium": False,
        "tags": ["Rheinberg Privatbank", "Wertebasiert", "Premium"],
        "focusAreas": [
            "Unternehmerische Nachfolge",
            "Werteorientierte Vermögensstrukturierung",
            "Impact-Banking Strategien"
        ],
        "excerpt": "Rheinberg Privatbank schafft mit Dr. Markus Voss verbindende Lösungen für Unternehmerfamilien – mit regionaler Verankerung, Impact-Fokus und messbarer Governance.",
        "languages": ["Deutsch", "Englisch"],
        "gender": "male",
        "seniority": "executive",
        "certifications": ["Dr. rer. pol.", "Certified European Financial Analyst (CEFA)"],
        "clientTargets": ["Unternehmerfamilien", "Stiftungen", "NextGen"],
        "videoUrl": None
    },
    {
        "id": "rb-002",
        "name": "Julia Brandt",
        "title": "Senior-Beraterin, Köln",
        "bank": "Rheinberg Privatbank",
        "location": "Köln",
        "avatarUrl": "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80",
        "bankLogoUrl": BANK_LOGOS["Rheinberg Privatbank"],
        "premium": False,
        "tags": ["Nachhaltigkeit"],
        "focusAreas": [
            "Philanthropie",
            "Stiftungsmanagement",
            "Impact Investing"
        ],
        "languages": ["Deutsch", "Englisch"],
        "gender": "female",
        "seniority": "senior",
        "certifications": ["Stiftungsberater (DSA)"],
        "clientTargets": ["Stiftungen", "Privatpersonen"]
    },
    {
        "id": "tp-001",
        "name": "Thomas Richter",
        "title": "Wealth Advisor",
        "bank": "Triversa Private Clients",
        "location": "Köln",
        "avatarUrl": "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2VzY2glQzMlQTRmdHNmJUMzJUJDaHJlcnxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&w=400&h=400&q=80",
        "bankLogoUrl": BANK_LOGOS["Triversa Private Clients"],
        "premium": False,
        "tags": ["Cross-Border"],
        "focusAreas": ["Multi-Asset-Strategien", "Portfoliomanagement"],
        "languages": ["Deutsch", "Englisch"],
        "gender": "male",
        "seniority": "professional",
        "certifications": ["Chartered Financial Analyst (CFA)"],
        "clientTargets": ["Internationales Vermögen", "Expats"]
    },
    {
        "id": "lf-001",
        "name": "Sandra Becker",
        "title": "Anlageberaterin",
        "bank": "Lindenhof Finanzhaus",
        "location": "Köln",
        "avatarUrl": "https://images.unsplash.com/photo-1758518727592-706e80ebc354?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNvcnBvcmF0ZSUyMHBvcnRyYWl0JTIwYiVDMyVCQ3JvfGVufDB8fDB8fHwy&auto=format&fit=crop&w=400&h=400&q=80",
        "bankLogoUrl": BANK_LOGOS["Lindenhof Finanzhaus"],
        "premium": False,
        "tags": ["Immobilien"],
        "focusAreas": ["Portfoliomanagement", "Immobilieninvestments"],
        "languages": ["Deutsch"],
        "gender": "female",
        "seniority": "professional",
        "certifications": ["Diplom-Betriebswirtin (FH)"],
        "clientTargets": ["Privatkunden", "Vermögensaufbau"]
    },
    {
        "id": "ah-001",
        "name": "Elena Vogt",
        "title": "Director Wealth Advisory",
        "bank": "Aurora Handelsbank",
        "location": "Köln",
        "avatarUrl": "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80",
        "bankLogoUrl": BANK_LOGOS["Aurora Handelsbank"],
        "premium": False,
        "tags": ["NextGen"],
        "focusAreas": ["NextGen Advisory", "Multi-Asset-Strategien"],
        "languages": ["Deutsch", "Englisch", "Französisch"],
        "gender": "female",
        "seniority": "senior",
        "certifications": ["Chartered Wealth Manager"],
        "clientTargets": ["NextGen", "Unternehmerfamilien"]
    },
    {
        "id": "ah-002",
        "name": "Nikolai Berger",
        "title": "Senior Relationship Manager",
        "bank": "Aurora Handelsbank",
        "location": "Köln",
        "avatarUrl": "https://images.unsplash.com/photo-1713946598186-8e28275719b9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80",
        "bankLogoUrl": BANK_LOGOS["Aurora Handelsbank"],
        "premium": False,
        "tags": ["ESG", "Philanthropie"],
        "focusAreas": ["Family Office Services", "Impact Investing"],
        "languages": ["Deutsch", "Englisch", "Russisch"],
        "gender": "male",
        "seniority": "senior",
        "certifications": ["Certified Impact Advisor"],
        "clientTargets": ["Stiftungen", "Family Offices"]
    },
    {
        "id": "nc-001",
        "name": "Amelie Krauss",
        "title": "Head of Research Europe",
        "bank": "Novaris Capital",
        "location": "München",
        "avatarUrl": "https://images.unsplash.com/photo-1590650213165-c1fef80648c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80",
        "bankLogoUrl": BANK_LOGOS["Novaris Capital"],
        "premium": False,
        "tags": ["Research"],
        "focusAreas": ["Makroökonomie", "Multi-Asset-Strategien"],
        "languages": ["Deutsch", "Englisch"],
        "gender": "female",
        "seniority": "executive",
        "certifications": ["CIIA"],
        "clientTargets": ["Institutionelle Anleger", "Family Offices"]
    },
    {
        "id": "nc-002",
        "name": "Friedrich Sommerfeld",
        "title": "Senior Investment Strategist",
        "bank": "Novaris Capital",
        "location": "Frankfurt",
        "avatarUrl": "https://images.unsplash.com/photo-1549473448-5d7196c91f48?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGdlc2NoJUMzJUE0ZnRzZiVDMyVCQ2hyZXJ8ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&w=400&h=400&q=80",
        "bankLogoUrl": BANK_LOGOS["Novaris Capital"],
        "premium": False,
        "tags": ["Digitale Assets"],
        "focusAreas": ["Portfoliomanagement", "Alternative Anlagen"],
        "languages": ["Deutsch", "Englisch"],
        "gender": "male",
        "seniority": "senior",
        "certifications": ["CAIA"],
        "clientTargets": ["Tech-Unternehmer", "NextGen"]
    },
    {
        "id": "hs-001",
        "name": "Maya Reuter",
        "title": "Head of Sustainable Finance",
        "bank": "Helvetia Struktur AG",
        "location": "Zürich",
        "avatarUrl": "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80",
        "bankLogoUrl": BANK_LOGOS["Helvetia Struktur AG"],
        "premium": False,
        "tags": ["ESG"],
        "focusAreas": ["Sustainable Finance", "Impact Investing"],
        "languages": ["Deutsch", "Englisch", "Italienisch"],
        "gender": "female",
        "seniority": "executive",
        "certifications": ["CESGA"],
        "clientTargets": ["Stiftungen", "Ultra High Net Worth"]
    },
    {
        "id": "hs-002",
        "name": "Jonas Keller",
        "title": "Senior Portfolio Architect",
        "bank": "Helvetia Struktur AG",
        "location": "Basel",
        "avatarUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdlc2NoJUMzJUE0ZnRzZiVDMyVCQ2hyZXJ8ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&w=400&h=400&q=80",
        "bankLogoUrl": BANK_LOGOS["Helvetia Struktur AG"],
        "premium": False,
        "tags": ["Family Office"],
        "focusAreas": ["Family Office Services", "Vermögensstrukturierung"],
        "languages": ["Deutsch", "Englisch"],
        "gender": "male",
        "seniority": "senior",
        "certifications": ["TEP"],
        "clientTargets": ["Family Offices", "Unternehmerfamilien"]
    },
    {
        "id": "nv-001",
        "name": "Dr. Lea Hartwig",
        "title": "Partnerin Vermögensstrategie",
        "bank": "Nordquell Vermögen",
        "location": "Hamburg",
        "avatarUrl": "https://plus.unsplash.com/premium_photo-1661589856899-6dd0871f9db6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80",
        "bankLogoUrl": BANK_LOGOS["Nordquell Vermögen"],
        "premium": False,
        "tags": ["International"],
        "focusAreas": ["Internationale Vermögen", "Währungsmanagement"],
        "languages": ["Deutsch", "Englisch", "Spanisch"],
        "gender": "female",
        "seniority": "executive",
        "certifications": ["Chartered Market Technician (CMT)"],
        "clientTargets": ["Expats", "Global Entrepreneurs"]
    },
    {
        "id": "mg-001",
        "name": "Victor Albrecht",
        "title": "Managing Director Europe",
        "bank": "Meridian Global Advisory",
        "location": "Luxemburg",
        "avatarUrl": "https://images.unsplash.com/photo-1656399910089-b7ead999bf23?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGdlc2ljaHQlMjBiJUMzJUJDcm98ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&w=400&h=400&q=60",
        "bankLogoUrl": BANK_LOGOS["Meridian Global Advisory"],
        "premium": False,
        "tags": ["Global"],
        "focusAreas": ["Cross-Border Wealth Planning", "Philanthropie"],
        "languages": ["Deutsch", "Englisch", "Französisch"],
        "gender": "male",
        "seniority": "executive",
        "certifications": ["STEP"],
        "clientTargets": ["International Clients", "Stiftungen"]
    },
    {
        "id": "ap-001",
        "name": "Sophia Altmayer",
        "title": "Partnerin Private Office",
        "bank": "Altmuehl & Partner",
        "location": "Köln",
        "avatarUrl": "https://images.unsplash.com/photo-1748666948369-d8eb966959c8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29ycG9yYXRlJTIwcG9ydHJhaXQlMjBiJUMzJUJDcm98ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&w=400&h=400&q=80",
        "bankLogoUrl": BANK_LOGOS["Altmuehl & Partner"],
        "premium": False,
        "tags": ["Tradition"],
        "focusAreas": ["Generationenplanung", "Family Governance"],
        "languages": ["Deutsch", "Englisch"],
        "gender": "female",
        "seniority": "senior",
        "certifications": ["Certified Family Officer"],
        "clientTargets": ["Traditionsfamilien", "Family Offices"]
    },
    {
        "id": "ec-001",
        "name": "Henri Dupont",
        "title": "Head of Private Clients",
        "bank": "Eichenstein Conseil",
        "location": "Paris",
        "avatarUrl": "https://images.unsplash.com/photo-1738566061505-556830f8b8f5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80",
        "bankLogoUrl": BANK_LOGOS["Eichenstein Conseil"],
        "premium": False,
        "tags": ["Europa"],
        "focusAreas": ["Vermögensstrukturierung", "Tax Advisory"],
        "languages": ["Französisch", "Deutsch", "Englisch"],
        "gender": "male",
        "seniority": "executive",
        "certifications": ["CPA Europe"],
        "clientTargets": ["Cross-Border Families", "Unternehmer"]
    },
    {
        "id": "va-001",
        "name": "Henrik Falkenhayn",
        "title": "Managing Partner",
        "bank": "Velorum Aachen",
        "location": "Aachen",
        "avatarUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdlc2NoJUMzJUE0ZnRzZiVDMyVCQ2hyZXJ8ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&w=400&h=400&q=80",
        "bankLogoUrl": BANK_LOGOS["Velorum Aachen"],
        "premium": False,
        "tags": ["Innovation"],
        "focusAreas": ["Venture Banking", "Corporate Finance"],
        "languages": ["Deutsch", "Englisch"],
        "gender": "male",
        "seniority": "partner",
        "certifications": ["CFA"],
        "clientTargets": ["Scale-ups", "Innovationsführer"]
    }
]

class Advisor(BaseModel):
    id: str
    name: str
    title: str
    bank: str
    location: str
    avatarUrl: str
    bankLogoUrl: str
    premium: bool
    tags: List[str] = []
    focusAreas: List[str]
    languages: Optional[List[str]] = None
    gender: Optional[str] = None
    seniority: Optional[str] = None
    certifications: Optional[List[str]] = None
    clientTargets: Optional[List[str]] = None

@router.get("/advisors", response_model=List[Advisor])
def get_advisors():
    """
    Gibt eine Liste der Finanzexperten zurück.
    """
    return ADVISORS_DATA
