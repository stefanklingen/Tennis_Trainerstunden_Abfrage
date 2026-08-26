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
