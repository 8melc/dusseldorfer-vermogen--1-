# Deployment-Anleitung für Vercel

## 1. Firebase Authentication konfigurieren

Du brauchst die Firebase Config in der Environment-Variable `DATABUTTON_EXTENSIONS`.

### Wo findest du deine Firebase Config?

1. Gehe zu [Firebase Console](https://console.firebase.google.com/)
2. Wähle dein Projekt aus
3. Klicke auf das ⚙️ Settings Icon → "Project settings"
4. Scrolle runter zu "Your apps" → Wähle deine Web-App
5. Kopiere die `firebaseConfig` Werte

### Environment-Variable für Vercel setzen:

In Vercel Dashboard → Project Settings → Environment Variables:

**Variable Name:** `DATABUTTON_EXTENSIONS`

**Variable Value:** (ersetze die Werte mit deinen echten Firebase Config Werten):

```json
[{
  "name": "firebase-auth",
  "version": "1.0.0",
  "config": {
    "firebaseConfig": {
      "apiKey": "DEIN_API_KEY",
      "authDomain": "dein-projekt.firebaseapp.com",
      "projectId": "dein-projekt-id",
      "storageBucket": "dein-projekt.appspot.com",
      "messagingSenderId": "123456789",
      "appId": "1:123456789:web:abc123"
    },
    "signInOptions": {
      "google": true,
      "emailAndPassword": true,
      "github": false,
      "facebook": false,
      "twitter": false,
      "magicLink": false
    },
    "siteName": "Kölner Vermögen",
    "signInSuccessUrl": "/"
  }
}]
```

**WICHTIG:** Das muss als eine einzige Zeile sein (keine Linebreaks)!

## 2. Backend URL konfigurieren

Wenn dein Backend deployed ist, setze diese Variable:

**Variable Name:** `VITE_API_URL`  
**Variable Value:** `https://deine-backend-url.com`

**Variable Name:** `VITE_WS_API_URL`  
**Variable Value:** `wss://deine-backend-url.com` (wss:// für WebSocket)

## 3. Eigene Domain bei Vercel einrichten

### Schritt 1: Domain in Vercel hinzufügen

1. Gehe zu deinem Vercel Projekt
2. Klicke auf "Settings" → "Domains"
3. Klicke auf "Add Domain"
4. Gib deine Domain ein (z.B. `duesseldorfer-vermoegen.de`)

### Schritt 2: DNS-Einträge konfigurieren

Vercel zeigt dir dann die DNS-Einträge, die du bei deinem Domain-Provider setzen musst:

**Typ:** `A` oder `CNAME`  
**Name:** `@` oder `www` (je nachdem was du willst)  
**Value:** Der Wert den Vercel dir zeigt

**Beispiel:**
- Für `@` (Root-Domain): `76.76.21.21`
- Für `www`: `cname.vercel-dns.com`

### Schritt 3: Bei deinem Domain-Provider

1. Logge dich bei deinem Domain-Provider ein (z.B. Namecheap, GoDaddy, etc.)
2. Gehe zu DNS-Management
3. Füge die Einträge hinzu, die Vercel dir zeigt
4. Warte 5-60 Minuten bis die DNS-Einträge propagiert sind

### Schritt 4: SSL-Zertifikat

Vercel erstellt automatisch ein SSL-Zertifikat (HTTPS) für deine Domain. Das passiert automatisch nach der DNS-Konfiguration.

## 4. Firebase Authorized Domains

**WICHTIG:** Du musst deine Domain in Firebase erlauben!

1. Gehe zu Firebase Console → Authentication → Settings
2. Scrolle runter zu "Authorized domains"
3. Klicke auf "Add domain"
4. Füge deine Domain hinzu (z.B. `duesseldorfer-vermoegen.de`)

## 5. Lokale Entwicklung (.env.local)

Für lokale Entwicklung erstelle eine Datei `frontend/.env.local`:

```bash
# Firebase Config (optional, wird aus DATABUTTON_EXTENSIONS gelesen)
DATABUTTON_EXTENSIONS='[{"name":"firebase-auth","version":"1.0.0","config":{"firebaseConfig":{"apiKey":"DEIN_API_KEY","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."},"signInOptions":{"google":true,"emailAndPassword":true,"github":false,"facebook":false,"twitter":false,"magicLink":false},"siteName":"Kölner Vermögen","signInSuccessUrl":"/"}}}]'

# API URLs (für lokales Backend)
VITE_API_URL=http://localhost:8000
VITE_WS_API_URL=ws://localhost:8000
```

## Troubleshooting

### Firebase Auth funktioniert nicht:
- ✅ Prüfe ob `DATABUTTON_EXTENSIONS` korrekt gesetzt ist (eine Zeile, valides JSON)
- ✅ Prüfe ob deine Domain in Firebase Authorized Domains ist
- ✅ Prüfe Browser Console auf Fehler

### Domain funktioniert nicht:
- ✅ Warte bis DNS propagiert ist (kann bis zu 24h dauern, meistens aber 5-60 Min)
- ✅ Prüfe DNS-Einträge mit: `nslookup deine-domain.de`
- ✅ Prüfe in Vercel ob Domain verifiziert ist

### Backend-Verbindung funktioniert nicht:
- ✅ Prüfe ob `VITE_API_URL` korrekt gesetzt ist
- ✅ Prüfe ob Backend CORS für deine Vercel-Domain erlaubt
- ✅ Prüfe Browser Console auf CORS-Fehler
