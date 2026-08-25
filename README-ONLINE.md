# Tennis-Trainer-Terminabfrage – Online-Version

Diese Version ist für echten Onlinebetrieb gedacht.

## Architektur

- Node.js + Express
- Supabase PostgreSQL als dauerhafte Datenbank
- Render als kostenloses Hosting
- Adminbereich unter `/admin`
- Teilnehmerseite unter `/`

## 1. Supabase einrichten

1. Bei Supabase ein Konto erstellen.
2. Ein neues Projekt anlegen.
3. Im SQL Editor den Inhalt von `supabase.sql` aus diesem Projekt einfügen und ausführen.
4. Unter Project Settings / API die Projekt-URL und den `service_role` Key kopieren.

WICHTIG: Den `service_role` Key niemals in HTML, JavaScript für den Browser, GitHub oder WhatsApp veröffentlichen.

## 2. GitHub

Dieses Projekt in ein neues GitHub-Repository hochladen.

Dateien:
- server.js
- package.json
- render.yaml
- supabase.sql
- public/

## 3. Render

1. Bei Render anmelden.
2. New -> Web Service.
3. Das GitHub-Repository verbinden.
4. Runtime: Node.
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Plan: Free.

Environment Variables eintragen:

SUPABASE_URL = deine Supabase-Projekt-URL
SUPABASE_SERVICE_ROLE_KEY = dein service_role Key
ADMIN_PASSWORD = ein langes eigenes Passwort

Danach deployen.

Render stellt eine öffentliche `onrender.com` Adresse bereit.

## 4. Wichtig zum kostenlosen Betrieb

Render-Free-Webservices werden nach 15 Minuten ohne eingehende Zugriffe heruntergefahren und beim nächsten Zugriff wieder gestartet. Der erste Aufruf kann deshalb ungefähr eine Minute dauern.

Die kostenlose Render-Postgres-Datenbank ist für dieses Projekt NICHT zu empfehlen, weil sie nach 30 Tagen abläuft. Deshalb verwendet diese Version Supabase Free als Datenbank.

Auch Supabase Free kann Projekte nach längerer Inaktivität pausieren. Für eine Vereinsabfrage mit gelegentlicher Nutzung sollte das berücksichtigt werden.

## 5. Nutzung

Teilnehmer:
`https://DEIN-RENDER-NAME.onrender.com/`

Admin:
`https://DEIN-RENDER-NAME.onrender.com/admin`

## 6. Empfehlenswert vor dem ersten echten Einsatz

- eigenes starkes Admin-Passwort setzen
- einmal selbst eine Testantwort abgeben
- Testantwort wieder löschen
- CSV-Export testen
- URL an einige Testpersonen schicken
- erst danach an die gesamte Tennisgruppe senden

## 7. Datenmodell

Eine Person kann mehrere passende Termine auswählen. Zusätzlich kann sie "Kein Bedarf" auswählen. Der Admin sieht pro Termin die Anzahl der interessierten Personen und kann die Rohdaten als CSV exportieren.
