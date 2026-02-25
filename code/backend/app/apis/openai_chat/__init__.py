from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import openai
import os
from typing import List

# Rheinberg Privatbank Artikel-Kontext für MVP
RHEINBERG_ARTIKEL_KONTEXT = """
ARTIKEL-KONTEXT: Rheinberg Privatbank Market Outlook zur Jahresmitte 2025 - Wachstumsgelegenheiten in Europa und Asien im Fokus

KERNAUSSAGEN:
- US-Wirtschaft zeigt Stärke, aber hohe Bewertungen und politische Unsicherheiten durch Trumps Zollpolitik
- Europa profitiert von niedrigeren Bewertungen und strukturellen Reformen
- Asien, besonders China, bietet attraktive Einstiegschancen
- Fed wird voraussichtlich 2x50 Basispunkte senken bis Ende Jahr
- Unternehmen verschieben Investitionen aufgrund der US-Zoll-Unsicherheit

AKTUELLE MARKTDYNAMIK:
- US-Dollar stark, belastet internationale Investitionen
- Zinssenkungen der Fed erwartet, könnte Dollar schwächen
- Neue Handelsallianzen entstehen außerhalb der USA
- Technologie- und KI-Investments weiterhin attraktiv
- Nachhaltige Investments gewinnen an Bedeutung

PORTFOLIO-IMPLIKATIONEN:
- Diversifikation über Regionen hinweg wichtiger denn je
- Europa und Asien als Ergänzung zu US-Positionen
- Währungsabsicherung bei internationalen Investments
- Fokus auf strukturelle Wachstumstrends vs. zyklische Investments
"""

# Demo-Nutzerprofil für MVP
MVP_NUTZERPROFIL = """
DEMO-NUTZERPROFIL: Petra Müller-Weber, 52 Jahre, Köln
- Geschäftsführerin einer mittelständischen Technologiefirma
- Investierbares Vermögen: ca. 2,5 Mio. EUR
- Aktuelles Portfolio: 60% Deutschland/Europa, 30% USA, 10% Emerging Markets
- Investiert bereits in: Deutsche Aktien, US Tech-Titel, Immobilien Köln
- Interesse an: Nachhaltigkeit, Kunst als Investment, KI/Technologie
- Risikobereitschaft: Moderat-progressiv
- Anlagehorizont: 10-15 Jahre bis Ruhestand
- Ziele: Vermögenserhalt, Wachstum, Nachfolgeplanung für Unternehmen
"""

# Aura-Persönlichkeit mit MVP-Kontext
AURA_SYSTEM_PROMPT = f"""
Du bist Aura, der FinanzKompass-Assistent von noomedia, verkörperst die Kölner Vermögensphilosophie und bist Experte für Vermögensverwaltung, Nachfolgeplanung und intelligente Anlagestrategie.

AKTUELLER KONTEXT FÜR MVP-DEMO:
{RHEINBERG_ARTIKEL_KONTEXT}

{MVP_NUTZERPROFIL}

IDENTITÄT & TONALITÄT:
- Du repräsentierst hochwertige Finanzexpertise mit regionalem Bezug zu Köln
- Deine Kommunikation ist präzise, klar strukturiert und auf höchstem Niveau
- Du bist professionell, aber zugänglich und sprichst Nutzer konsequent mit "Sie" an
- Verwende gelegentlich "Frau Müller-Weber" für eine persönliche Note
- Stelle am Ende deiner Antworten eine höfliche Frage, um das Gespräch fortzuführen

SPEZIELLE ANWEISUNGEN FÜR MVP:
- Beziehe dich bei Fragen konkret auf den Rheinberg Privatbank Market Outlook
- Berücksichtige das Demo-Profil von Frau Müller-Weber
- Gib spezifische, aber keine individuellen Anlageempfehlungen
- Verweise auf die aktuellen Marktdynamiken aus dem Artikel
- Erkläre, wie sich die beschriebenen Trends auf das bestehende Portfolio auswirken könnten

HAUPTAUFGABEN:
1. Kontextbasierte Analyse: Beantworte Fragen basierend auf dem Market Outlook
2. Portfolio-Bezug: Stelle Verbindung zum Demo-Profil her
3. Navigation: Führe zu relevanten noomedia-Inhalten
4. Lead-Qualifizierung: Erkenne Beratungsbedarf
5. Datensammlung: Erfasse Nutzerinteressen

THEMENEXPERTISE (mit aktuellem Fokus):
- Regionale Diversifikation (Europa/Asien vs. USA)
- Währungsrisiken und -absicherung
- Zinszyklen und Fed-Politik
- Geopolitische Risiken (Handelskriege, Zölle)
- Technologie & KI-Investments
- Nachhaltige Investments
- Kunst und alternative Anlagen

ANTWORTFORMATIERUNG:
- Strukturiere Antworten klar mit Zwischenüberschriften
- Hebe wichtige Begriffe mit **Fettdruck** hervor
- Verwende die Kölner Vermögensphilosophie
- Beziehe konkrete Zahlen und Fakten aus dem Artikel ein

SICHERHEITSRICHTLINIEN:
- Keine konkreten Anlageempfehlungen für individuelle Fälle
- Vermeide Rendite-Garantien
- Betone bei komplexen Themen die Wichtigkeit individueller Beratung
- Erkenne Grenzen der digitalen Beratung
"""

router = APIRouter(tags=["stream"])

# --- Pydantic Models ---
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    prompt: str
    history: List[ChatMessage] = []

# --- OpenAI Client Initialization ---
from typing import Optional
client: Optional[openai.OpenAI] = None
try:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("CRITICAL: OPENAI_API_KEY secret not found. OpenAI functionality will be disabled.")
    else:
        client = openai.OpenAI(api_key=api_key)
except Exception as e:
    print(f"CRITICAL: Failed to initialize OpenAI client during startup: {e}")

async def generate_openai_responses(prompt: str, history: List[ChatMessage]):
    """Generator function to yield OpenAI response chunks with MVP context."""
    if not client:
        print("ERROR in generate_openai_responses: OpenAI client not available.")
        yield "Error: AI service is currently unavailable. Please try again later."
        return

    # System-Prompt mit MVP-Kontext
    messages_for_api = [{"role": "system", "content": AURA_SYSTEM_PROMPT}]
    
    # History anhängen
    messages_for_api.extend([msg.model_dump() for msg in history])
    
    # Aktuelle Benutzeranfrage hinzufügen
    messages_for_api.append({"role": "user", "content": prompt})

    print(f"DEBUG: Messages sent to OpenAI API with MVP context: {messages_for_api}")

    try:
        stream = client.chat.completions.create(
            model="gpt-4o",  # Vollversion für bessere Kontextverarbeitung
            messages=messages_for_api,
            stream=True,
            temperature=0.7,  # Leicht erhöht für natürlichere Antworten
            max_tokens=1000,  # Ausreichend für detaillierte Antworten
        )

        for chunk in stream:
            if chunk.choices and chunk.choices[0].delta and chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content
    except openai.APIConnectionError as e:
        print(f"ERROR: OpenAI API Connection Error: {e}")
        yield "Error: Could not connect to the AI service."
    except openai.RateLimitError as e:
        print(f"ERROR: OpenAI Rate Limit Error: {e}")
        yield "Error: The AI service is experiencing high demand. Please try again shortly."
    except openai.AuthenticationError as e:
        print(f"ERROR: OpenAI Authentication Error: {e}. Check API Key.")
        yield "Error: There is an issue with the AI service configuration."
    except openai.APIStatusError as e:
        print(f"ERROR: OpenAI API Status Error (Status {e.status_code}): {e}")
        yield f"Error: The AI service reported an issue (Code: {e.status_code})."
    except Exception as e:
        print(f"ERROR: An unexpected error occurred while streaming from OpenAI: {e}")
        yield "Error: An unexpected error occurred with the AI service."

@router.post("/openai-chat")
async def handle_openai_chat(request: ChatRequest):
    """
    MVP-Version: Receives a prompt, processes it with Rheinberg Privatbank context 
    and demo user profile, streams the response.
    """
    if not client:
        print("ERROR: /openai-chat endpoint called but OpenAI client not initialized.")
        raise HTTPException(status_code=503, detail="OpenAI client not initialized. AI service unavailable.")

    if not request.prompt:
        raise HTTPException(status_code=400, detail="Prompt cannot be empty.")

    return StreamingResponse(generate_openai_responses(request.prompt, request.history), media_type="text/plain")

# Zusätzliche Hilfsfunktion für MVP-Demo
def get_demo_context_summary():
    """Gibt eine Zusammenfassung des Demo-Kontexts zurück."""
    return {
        "artikel": "Rheinberg Privatbank Market Outlook Jahresmitte 2025",
        "nutzer": "Petra Müller-Weber, Geschäftsführerin aus Köln",
        "portfolio": "2,5 Mio EUR, 60% DE/EU, 30% USA, 10% EM",
        "fokus": "Europa/Asien-Chancen, Zoll-Risiken, Fed-Politik"
    }
