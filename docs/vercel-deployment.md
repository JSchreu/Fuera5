# Vercel Deployment Handleiding voor Wijnclub Fuera Del Camino

Deze handleiding helpt u stap voor stap bij het deployen van de wijnproef-applicatie naar Vercel.

## Vereisten
- Een GitHub, GitLab of Bitbucket account
- Een Vercel account (gratis aan te maken)

## Stap 1: Maak een Git repository

### Met GitHub:
1. Ga naar [GitHub.com](https://github.com) en log in
2. Klik op de groene knop "New" om een nieuwe repository te maken
3. Geef uw repository een naam (bijvoorbeeld "wijnclub-fuera-del-camino")
4. Kies "Private" als u de code privé wilt houden
5. Klik op "Create repository"

### Met GitLab:
1. Ga naar [GitLab.com](https://gitlab.com) en log in
2. Klik op "New project"
3. Kies "Create blank project"
4. Geef uw project een naam en kies de privacy-instellingen
5. Klik op "Create project"

## Stap 2: Push de code naar uw Git repository

1. Open een terminal op uw computer
2. Kloon de repository naar uw lokale machine:
   ```
   git clone https://github.com/uw-gebruikersnaam/wijnclub-fuera-del-camino.git
   ```
3. Kopieer alle bestanden van de wijnclub-app naar deze map
4. Voeg de bestanden toe aan Git, commit en push:
   ```
   cd wijnclub-fuera-del-camino
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

## Stap 3: Maak een Vercel account

1. Ga naar [vercel.com](https://vercel.com)
2. Klik op "Sign Up" en kies voor aanmelden met GitHub, GitLab of Bitbucket
3. Voltooi het registratieproces

## Stap 4: Importeer het project in Vercel

1. Log in op uw Vercel dashboard
2. Klik op "Add New..." en selecteer "Project"
3. Kies "Import Third-Party Git Repository"
4. Voer de URL van uw Git repository in (bijvoorbeeld: https://github.com/uw-gebruikersnaam/wijnclub-fuera-del-camino)
5. Klik op "Continue"

## Stap 5: Configureer het project

1. Vercel detecteert automatisch dat het een Next.js project is
2. Laat de standaardinstellingen staan:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
3. Onder "Environment Variables" kunt u de database-configuratie toevoegen:
   - Naam: DATABASE_URL
   - Waarde: Voor productie kunt u hier een PostgreSQL database URL invullen (Vercel biedt PostgreSQL aan via hun integraties)
4. Klik op "Deploy"

## Stap 6: Wacht op de deployment

1. Vercel zal nu uw project bouwen en deployen
2. Dit duurt meestal enkele minuten
3. U kunt de voortgang volgen in het deployment log

## Stap 7: Bekijk uw gedeployede applicatie

1. Zodra de deployment is voltooid, krijgt u een URL (bijvoorbeeld: wijnclub-fuera-del-camino.vercel.app)
2. Klik op de URL om uw live applicatie te bekijken
3. Test of alle functionaliteiten correct werken

## Stap 8: Configureer een aangepast domein (optioneel)

1. In het Vercel dashboard, ga naar uw project
2. Klik op "Settings" en dan "Domains"
3. Voeg uw aangepaste domein toe (bijvoorbeeld: wijnproef.fueradelcamino.nl)
4. Volg de instructies om uw DNS-instellingen te configureren

## Stap 9: Database migratie voor productie

1. Voor een productieomgeving raden we aan om over te stappen van SQLite naar PostgreSQL
2. Vercel biedt PostgreSQL-integratie aan via hun dashboard:
   - Ga naar uw project in het Vercel dashboard
   - Klik op "Storage"
   - Kies "Connect Database"
   - Selecteer "Vercel Postgres"
   - Volg de instructies om een nieuwe database aan te maken
3. Na het instellen van de PostgreSQL database, update de DATABASE_URL omgevingsvariabele in uw project settings
4. Voer de database migratie uit:
   - Ga naar uw lokale project
   - Update de DATABASE_URL in uw .env bestand
   - Voer `npx prisma migrate deploy` uit
   - Of gebruik de Vercel CLI: `vercel env pull && npx prisma migrate deploy`

## Stap 10: Automatische updates

Elke keer dat u wijzigingen pusht naar uw Git repository, zal Vercel automatisch een nieuwe versie van uw applicatie deployen.

## Problemen oplossen

### Deployment faalt
1. Controleer de build logs in het Vercel dashboard
2. Zorg ervoor dat alle dependencies correct zijn geïnstalleerd
3. Controleer of de omgevingsvariabelen correct zijn ingesteld

### Database connectie problemen
1. Controleer of de DATABASE_URL correct is
2. Zorg ervoor dat de database toegankelijk is vanuit Vercel
3. Controleer of de database migraties correct zijn uitgevoerd

### Styling problemen
1. Controleer of de Tailwind CSS configuratie correct is
2. Zorg ervoor dat de PostCSS configuratie correct is
3. Controleer of de CSS bestanden correct worden geladen

Voor meer hulp kunt u de [Vercel documentatie](https://vercel.com/docs) raadplegen of contact opnemen met Vercel support.
