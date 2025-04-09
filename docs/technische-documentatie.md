# Technische Documentatie - Wijnclub Fuera Del Camino Proeftool

## Architectuur

De applicatie is gebouwd als een full-stack Next.js applicatie met de volgende componenten:

1. **Frontend**: React componenten met Tailwind CSS voor styling
2. **Backend**: Next.js API routes
3. **Database**: SQLite database (via Prisma ORM)

## Projectstructuur

```
wijnclub-app/
├── components/         # React componenten
│   ├── AromaSelector.js
│   ├── Footer.js
│   └── Navbar.js
├── lib/                # Hulpfuncties
│   └── prisma.js       # Prisma client configuratie
├── pages/              # Next.js pagina's en API routes
│   ├── api/            # API endpoints
│   │   ├── proefnotities/
│   │   │   ├── [id].js
│   │   │   └── index.js
│   │   ├── wijnen/
│   │   │   ├── [id].js
│   │   │   └── index.js
│   │   └── zoeken.js
│   ├── _app.js
│   ├── index.js
│   ├── proeven.js
│   └── wijnen.js
├── prisma/             # Prisma configuratie
│   └── schema.prisma   # Database schema
├── public/             # Statische bestanden
├── styles/             # CSS bestanden
│   └── globals.css
├── docs/               # Documentatie
│   └── gebruikershandleiding.md
├── next.config.js      # Next.js configuratie
├── package.json        # Project dependencies
├── README.md           # Project informatie
└── vercel.json         # Vercel deployment configuratie
```

## Database Schema

Het database schema is gedefinieerd in `prisma/schema.prisma` en bevat de volgende modellen:

1. **Gebruiker**: Gebruikers van de applicatie
2. **Wijn**: Informatie over wijnen
3. **Proefnotitie**: WSET-proefnotities
4. **Aroma**: Aroma's die kunnen worden geselecteerd
5. **ProefnotitieAroma**: Junction tabel voor de many-to-many relatie tussen proefnotities en aroma's

## API Endpoints

### Proefnotities

- `GET /api/proefnotities`: Alle proefnotities ophalen
- `POST /api/proefnotities`: Nieuwe proefnotitie aanmaken
- `GET /api/proefnotities/[id]`: Specifieke proefnotitie ophalen
- `PUT /api/proefnotities/[id]`: Proefnotitie bijwerken
- `DELETE /api/proefnotities/[id]`: Proefnotitie verwijderen

### Wijnen

- `GET /api/wijnen`: Alle wijnen ophalen
- `GET /api/wijnen/[id]`: Specifieke wijn ophalen

### Zoeken

- `GET /api/zoeken`: Zoeken in proefnotities op basis van verschillende criteria

## Frontend Componenten

### AromaSelector

Een herbruikbare component voor het selecteren van aroma's uit een hiërarchische lijst. Ondersteunt:
- Selecteren uit voorgedefinieerde aroma's
- Toevoegen van eigen aroma's
- Verwijderen van geselecteerde aroma's

### Navbar & Footer

Navigatie en footer componenten die op alle pagina's worden gebruikt.

## Pagina's

### Home (index.js)

De startpagina met een introductie van de applicatie en links naar de belangrijkste functies.

### Proeven (proeven.js)

Een formulier voor het invoeren van nieuwe wijnproefnotities volgens de WSET-methode.

### Wijnen (wijnen.js)

Een zoekinterface voor het vinden van wijnen in de database op basis van verschillende criteria.

## Styling

De applicatie gebruikt Tailwind CSS met een aangepast kleurenpalet geïnspireerd op wijn:
- wijn-rood: #e63946
- wijn-blauw: #457b9d
- wijn-lichtgroen: #a8dadc
- wijn-donkergroen: #1d3557
- wijn-beige: #f1faee

## Deployment

De applicatie is geconfigureerd voor deployment op Vercel via "Import a Third-Party Git Repository". De configuratie is gedefinieerd in `vercel.json`.

## Toekomstige Uitbreidingen

Mogelijke toekomstige uitbreidingen voor de applicatie:
1. Authenticatie met wachtwoordbeveiliging
2. Afbeeldingen uploaden van wijnetiketten
3. Statistieken en visualisaties van proefnotities
4. Exporteren van proefnotities naar PDF
5. Integratie met externe wijn-databases

## Onderhoud

Voor onderhoud van de applicatie:
1. Zorg ervoor dat alle dependencies up-to-date zijn
2. Voer regelmatig database backups uit
3. Monitor de API endpoints op fouten
4. Test nieuwe functionaliteit grondig voordat deze in productie wordt genomen
