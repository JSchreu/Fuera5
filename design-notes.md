# Design Notities voor Wijnclub "Fuera Del Camino" Proeftool

## WSET Proefformulier Analyse
Het WSET proefformulier bestaat uit de volgende hoofdsecties:
1. **UITERLIJK** - Helderheid, intensiteit, kleur, andere kenmerken
2. **GEUR** - Conditie, intensiteit, aromakenmerken, ontwikkeling
3. **SMAAK** - Zoetheid, zuurgehalte, taninegehalte, alcoholgehalte, body/mondgevoel, mousse, smaakintensiteit, smaakkenmerken, afdronk
4. **CONCLUSIES** - Beoordeling van de kwaliteit, mate waarin wijn op dronk is/bewaarpotentieel

## Wildewijnen.nl Design Inspiratie
- Modern, schoon design met duidelijke typografie
- Kleurenpalet: blauw, rood, lichtgroen, wit
- Karakteristieke illustratie als onderdeel van de branding
- Gebruiksvriendelijke navigatie
- Responsief ontwerp dat goed werkt op verschillende schermformaten
- Duidelijke productkaarten voor wijnen
- Consistente stijl in knoppen en interactie-elementen

## Database Schema Ontwerp

### Tabellen

#### 1. Gebruikers
- id (primary key)
- naam
- email
- wachtwoord (gehashed)
- created_at
- updated_at

#### 2. Wijnen
- id (primary key)
- naam
- wijnmaker
- druif
- vintage (jaar)
- prijs
- alcoholpercentage
- land
- regio
- created_at
- updated_at

#### 3. Proefnotities
- id (primary key)
- wijn_id (foreign key naar Wijnen)
- gebruiker_id (foreign key naar Gebruikers)
- proefdatum
- medeproevers
- uiterlijk_helderheid
- uiterlijk_intensiteit
- uiterlijk_kleur
- uiterlijk_andere_kenmerken
- geur_conditie
- geur_intensiteit
- geur_ontwikkeling
- smaak_zoetheid
- smaak_zuurgehalte
- smaak_taninegehalte
- smaak_alcoholgehalte
- smaak_body
- smaak_mousse
- smaak_intensiteit
- smaak_afdronk
- kwaliteitsniveau
- drinkbaarheid
- aantekeningen
- created_at
- updated_at

#### 4. Aroma's
- id (primary key)
- categorie (primair, secundair, tertiair)
- naam
- beschrijving

#### 5. ProefnotitiesToAroma's (junction table)
- proefnotitie_id (foreign key naar Proefnotities)
- aroma_id (foreign key naar Aroma's)
- type (geur of smaak)
- anders_namelijk (voor custom aroma's)

### Relaties
- Een Gebruiker kan meerdere Proefnotities hebben
- Een Wijn kan in meerdere Proefnotities voorkomen
- Een Proefnotitie kan meerdere Aroma's hebben (via junction table)
- Een Aroma kan in meerdere Proefnotities voorkomen (via junction table)

### Zoekmogelijkheden
Met dit schema kunnen gebruikers zoeken op:
- Naam proever
- Naam wijn
- Wijnmaker
- Druif
- Vintage
- Land/regio
- Prijs range
- Alcoholpercentage range
- Specifieke aroma's
- Kwaliteitsniveau
- Drinkbaarheid
