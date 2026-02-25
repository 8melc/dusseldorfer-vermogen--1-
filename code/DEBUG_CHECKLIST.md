# Debug Checklist für Dashboard

## Schritt 1: Browser Console öffnen

1. Öffne `http://localhost:5173/dashboard`
2. Drücke **F12** (oder Rechtsklick → "Untersuchen")
3. Gehe zum Tab **Console**

## Schritt 2: Erste rote Fehlermeldung finden

Suche nach der **ersten roten Fehlermeldung** und kopiere:
- Die komplette Fehlermeldung (Text)
- Die ersten 2-3 Zeilen des Stacktraces

**Beispiele für was du sehen könntest:**
```
❌ Failed to fetch
❌ TypeError: Cannot read property 'json' of undefined
❌ 401 Unauthorized
❌ CORS policy: No 'Access-Control-Allow-Origin' header
```

## Schritt 3: Network Tab prüfen

1. Gehe zum Tab **Network**
2. Filter auf **XHR** oder **Fetch**
3. Lade die Seite neu (F5)
4. Suche nach einem Request zu `/dashboard/personal/overview` oder `/routes/api/dashboard/personal/overview`
5. Klicke auf den Request
6. Prüfe:
   - **Status Code** (200 = OK, 401 = Auth fehlt, 404 = nicht gefunden, 500 = Server-Fehler)
   - **Request URL** (sollte zu Databutton API gehen)
   - **Request Headers** (sollte `Authorization: Bearer ...` enthalten)

## Schritt 4: Console Logs prüfen

Du solltest diese Logs sehen:
```
[Brain] Using Databutton API Prefix: https://api.databutton.com/...
[Brain] Original URL: /routes/api/dashboard/personal/overview
[Brain] Final URL: https://api.databutton.com/.../routes/api/dashboard/personal/overview
```

## Was du mir schicken solltest:

1. **Die erste rote Fehlermeldung** aus der Console (als Text)
2. **Status Code** vom Network Tab (z.B. "401 Unauthorized")
3. **Request URL** vom Network Tab (die komplette URL)

Dann kann ich dir genau sagen, was zu fixen ist!
