# Databutton API Setup

## Problem
Das Dashboard bleibt weiß, weil die API-Calls nicht richtig konfiguriert sind.

## Lösung

### 1. Erstelle eine `.env.local` Datei im `frontend/` Ordner

```bash
cd frontend
touch .env.local
```

### 2. Füge diese Zeile ein:

```bash
VITE_DATABUTTON_API_PREFIX=https://api.databutton.com/_projects/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/dbtn/devx/app/routes
```

### 3. Starte den Dev-Server neu

```bash
# Stoppe den aktuellen Server (Ctrl+C)
# Dann neu starten:
yarn dev
```

### 4. Öffne das Dashboard

Gehe zu: `http://localhost:5173/dashboard`

## Was wurde geändert?

✅ `vite.config.ts` - Unterstützt jetzt `VITE_DATABUTTON_API_PREFIX`  
✅ `brain/index.ts` - Nutzt den Databutton API Prefix für alle Requests  
✅ `constants.ts` - Exportiert `DATABUTTON_API_PREFIX`

## Debugging

Falls es immer noch nicht funktioniert:

1. **Browser Console öffnen** (F12 → Console Tab)
2. **Schau nach diesen Logs:**
   - `[Brain] Using Databutton API Prefix: ...`
   - `[Brain] Request URL: ...`
3. **Network Tab öffnen** (F12 → Network Tab)
4. **Filter auf "XHR" oder "Fetch"**
5. **Schau ob Requests zu `/routes/dashboard/personal/overview` gehen**
6. **Prüfe den Status Code:**
   - ✅ 200 = OK
   - ❌ 404 = Endpoint nicht gefunden
   - ❌ 401 = Nicht autorisiert (Login fehlt)
   - ❌ 500 = Server-Fehler

## Fehlerbehebung

### "Failed to load dashboard data"
- Prüfe ob `VITE_DATABUTTON_API_PREFIX` richtig gesetzt ist
- Prüfe ob du eingeloggt bist (Firebase Auth)
- Prüfe Browser Console für genaue Fehlermeldung

### "Network Error" oder CORS-Fehler
- Prüfe ob die Databutton API URL korrekt ist
- Prüfe ob du eingeloggt bist (Authorization Header wird benötigt)

### Dashboard lädt, aber bleibt weiß
- Prüfe Browser Console für JavaScript-Fehler
- Prüfe ob `dashboardData` in React DevTools gesetzt ist
