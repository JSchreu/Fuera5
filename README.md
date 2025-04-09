# Wijnclub Fuera Del Camino - Proeftool

Een webapplicatie voor wijnclub Fuera Del Camino om wijnproefnotities bij te houden volgens de WSET-proefmethode.

## Functionaliteiten

- Invoeren van wijnproefnotities volgens de WSET-methode
- Dropdown menu's voor het selecteren van aroma's
- Opslaan van proefnotities in een database
- Zoeken in de database op verschillende criteria
- Meerdere gebruikers kunnen elkaars proefnotities bekijken

## Technologieën

- Next.js voor frontend en API routes
- Prisma ORM voor database interactie
- SQLite database (kan eenvoudig worden vervangen door PostgreSQL in productie)
- Tailwind CSS voor styling

## Installatie

```bash
# Installeer dependencies
npm install

# Genereer Prisma client
npx prisma generate

# Maak de database aan en voer migraties uit
npx prisma migrate dev --name init

# Start de ontwikkelserver
npm run dev
```

## Deployment op Vercel

Deze applicatie is geconfigureerd voor eenvoudige deployment op Vercel via "Import a Third-Party Git Repository":

1. Push deze repository naar GitHub, GitLab of Bitbucket
2. Ga naar [Vercel](https://vercel.com) en log in
3. Klik op "Add New..." en selecteer "Project"
4. Kies "Import Third-Party Git Repository" en voer de URL van je repository in
5. Volg de instructies om de deployment te voltooien

## Database

De applicatie gebruikt standaard SQLite voor lokale ontwikkeling. Voor productie op Vercel wordt aangeraden om over te schakelen naar PostgreSQL via Vercel's geïntegreerde database-oplossing of een externe provider.

## Structuur

- `/pages`: Next.js pagina's en API routes
- `/components`: React componenten
- `/prisma`: Database schema en migraties
- `/styles`: CSS en Tailwind configuratie
- `/lib`: Hulpfuncties en gedeelde code

## Licentie

Ontwikkeld voor wijnclub Fuera Del Camino.
