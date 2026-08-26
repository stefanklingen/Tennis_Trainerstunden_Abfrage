# Tennis-Trainer Mehrvereine

Mehrere getrennte Vereinsabfragen, Wochentage statt Datum, separater Vereins-Admin und zentraler Admin.

## Render Environment Variables
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
CENTRAL_ADMIN_PASSWORD

## URLs
/ = Vereinsauswahl
/club/SLUG = Vereinsabfrage
/admin/SLUG = Vereinsadmin
/central-admin = zentraler Admin
/health = Diagnose

## Einrichtung
1. Supabase-Projekt erstellen.
2. supabase.sql vollständig im SQL Editor ausführen.
3. Alle Dateien dieses Projekts direkt ins GitHub-Repository laden; public/ muss direkt neben server.js liegen.
4. Render Web Service verbinden; Root Directory leer, Build npm install, Start npm start.
5. Environment Variables setzen.
6. /central-admin öffnen und mit CENTRAL_ADMIN_PASSWORD anmelden.
7. Dort Vereine anlegen und je Verein ein Admin-Passwort setzen.

Vereins-Passwörter werden mit Node.js scrypt gehasht und nicht im Klartext gespeichert.

## Version 2
Die Startseite enthält je Verein zusätzlich einen „Zur Administration“-Button.


## V3: Passwortschutz der Teilnehmer-Abfrage

Jeder Verein hat jetzt zwei getrennte Passwörter:
1. **Admin-Passwort** für die Vereinsadministration.
2. **Abfrage-Passwort** für die Teilnehmerabfrage.

Beide werden im zentralen Admin gesetzt und können dort später geändert werden.

Die Startseite enthält außerdem die Kontaktadresse **jugendwart@tc-laer.de**.

Bei einer bereits vorhandenen V2-Supabase-Datenbank:
```sql
ALTER TABLE public.clubs ADD COLUMN IF NOT EXISTS survey_password_hash text;
```
Danach für jeden bestehenden Verein im Zentraladmin ein Abfrage-Passwort setzen.
