# Lokale Environment Variables Setup

Nach der Vercel-Migration müssen Environment Variables lokal für die Entwicklung konfiguriert werden.

## Backend Environment Variables

Erstelle eine Datei `backend/.env` mit folgenden Variablen:

```bash
# Firebase Service Account (WICHTIG für Firestore)
# Gehe zu Firebase Console → Project Settings → Service Accounts
# Erstelle einen neuen Service Account Key (JSON)
# Kopiere den kompletten JSON-Inhalt hier rein (als String)
FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"dein-projekt-id","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'

# Firebase Auth Config (für JWT Validation)
# Aus VERCEL_ENV_VARS.txt kopieren
DATABUTTON_EXTENSIONS='[{"name":"firebase-auth","version":"1.0.0","config":{"firebaseConfig":{"apiKey":"AIzaSyBdcD9jSwV2VPYJB5SVXdA8CLrll7ZWST4","authDomain":"noomedia1-124f4.firebaseapp.com","projectId":"noomedia1-124f4","storageBucket":"noomedia1-124f4.firebasestorage.app","messagingSenderId":"1011978566199","appId":"1:1011978566199:web:9cb8cd71cd566cfa731db2"},"signInOptions":{"google":true,"emailAndPassword":true,"github":false,"facebook":false,"twitter":false,"magicLink":false},"siteName":"Kölner Vermögen","signInSuccessUrl":"/"}}]'

# OpenAI API Key (für Chat-Funktionalität)
OPENAI_API_KEY=sk-dein-openai-key-hier
```

## Frontend Environment Variables

Erstelle eine Datei `frontend/.env.local` mit folgenden Variablen:

```bash
# App Configuration
VITE_APP_ID=koelner-vermoegen
VITE_APP_TITLE="Kölner Vermögen"
VITE_APP_BASE_PATH=/

# API Configuration (für lokale Entwicklung)
VITE_API_URL=http://localhost:8000
VITE_WS_API_URL=ws://localhost:8000
VITE_API_HOST=
VITE_API_PATH=
VITE_API_PREFIX_PATH=

# Firebase Config (optional - wird auch aus DATABUTTON_EXTENSIONS gelesen)
# DATABUTTON_EXTENSIONS='[{"name":"firebase-auth","version":"1.0.0","config":{"firebaseConfig":{"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."},"signInOptions":{"google":true,"emailAndPassword":true},"siteName":"Kölner Vermögen","signInSuccessUrl":"/"}}]'
```

## Wichtige Hinweise

1. **Backend lädt `.env` automatisch**: Das Backend verwendet `dotenv.load_dotenv()` in `main.py`, daher werden Variablen aus `backend/.env` automatisch geladen.

2. **Frontend lädt `.env.local` automatisch**: Vite lädt automatisch `.env.local` Dateien.

3. **Sicherheit**: 
   - `.env` und `.env.local` sind in `.gitignore` und werden nicht ins Git committed
   - Niemals Secrets ins Git committen!

4. **Für Vercel Deployment**: 
   - Diese Variablen müssen auch in Vercel Dashboard → Settings → Environment Variables gesetzt werden
   - Siehe `VERCEL_ENV_VARS.txt` für die genauen Werte

## Schnellstart

1. **Backend `.env` erstellen:**
   ```bash
   cd backend
   cp ../env.example .env
   # Dann .env bearbeiten und echte Werte eintragen
   ```

2. **Frontend `.env.local` erstellen:**
   ```bash
   cd frontend
   # Erstelle .env.local manuell mit den Werten oben
   ```

3. **Backend starten:**
   ```bash
   cd backend
   python -m uvicorn main:app --reload
   ```

4. **Frontend starten:**
   ```bash
   cd frontend
   yarn dev
   ```

## Troubleshooting

- **Backend findet keine Environment Variables**: Prüfe ob `backend/.env` existiert und korrekt formatiert ist
- **Frontend kann Backend nicht erreichen**: Prüfe ob `VITE_API_URL=http://localhost:8000` gesetzt ist
- **Firebase Auth funktioniert nicht**: Prüfe ob `DATABUTTON_EXTENSIONS` korrekt gesetzt ist (eine Zeile, valides JSON)
