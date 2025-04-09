// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Maak testgebruikers
  const gebruiker1 = await prisma.gebruiker.upsert({
    where: { email: 'jan.wijnproever@fueradelcamino.nl' },
    update: {},
    create: {
      naam: 'Jan Wijnproever',
      email: 'jan.wijnproever@fueradelcamino.nl',
      wachtwoord: 'wachtwoord123'
    }
  });

  const gebruiker2 = await prisma.gebruiker.upsert({
    where: { email: 'maria.druif@fueradelcamino.nl' },
    update: {},
    create: {
      naam: 'Maria Druif',
      email: 'maria.druif@fueradelcamino.nl',
      wachtwoord: 'wachtwoord123'
    }
  });

  console.log('Gebruikers aangemaakt:', gebruiker1.naam, gebruiker2.naam);

  // Maak testwijnen
  const wijn1 = await prisma.wijn.create({
    data: {
      naam: 'Château Margaux',
      wijnmaker: 'Château Margaux',
      druif: 'Cabernet Sauvignon, Merlot',
      vintage: 2018,
      prijs: 450.00,
      alcoholpercentage: 13.5,
      land: 'Frankrijk',
      regio: 'Bordeaux'
    }
  });

  const wijn2 = await prisma.wijn.create({
    data: {
      naam: 'Cloudy Bay Sauvignon Blanc',
      wijnmaker: 'Cloudy Bay',
      druif: 'Sauvignon Blanc',
      vintage: 2022,
      prijs: 29.95,
      alcoholpercentage: 12.5,
      land: 'Nieuw-Zeeland',
      regio: 'Marlborough'
    }
  });

  const wijn3 = await prisma.wijn.create({
    data: {
      naam: 'Tignanello',
      wijnmaker: 'Antinori',
      druif: 'Sangiovese, Cabernet Sauvignon',
      vintage: 2019,
      prijs: 125.00,
      alcoholpercentage: 14.0,
      land: 'Italië',
      regio: 'Toscane'
    }
  });

  console.log('Wijnen aangemaakt:', wijn1.naam, wijn2.naam, wijn3.naam);

  // Maak aroma's
  const aroma1 = await prisma.aroma.create({
    data: {
      categorie: 'primair',
      naam: 'Zwarte bessen',
      beschrijving: 'Fruitig aroma van zwarte bessen'
    }
  });

  const aroma2 = await prisma.aroma.create({
    data: {
      categorie: 'primair',
      naam: 'Grapefruit',
      beschrijving: 'Citrusaroma van grapefruit'
    }
  });

  const aroma3 = await prisma.aroma.create({
    data: {
      categorie: 'secundair',
      naam: 'Vanille',
      beschrijving: 'Vanille aroma van houtrijping'
    }
  });

  const aroma4 = await prisma.aroma.create({
    data: {
      categorie: 'tertiair',
      naam: 'Leer',
      beschrijving: 'Leeraroma door flesrijping'
    }
  });

  console.log('Aroma\'s aangemaakt:', aroma1.naam, aroma2.naam, aroma3.naam, aroma4.naam);

  // Maak proefnotities
  const proefnotitie1 = await prisma.proefnotitie.create({
    data: {
      wijnId: wijn1.id,
      gebruikerId: gebruiker1.id,
      proefdatum: new Date('2025-03-15'),
      medeproevers: 'Maria Druif, Pieter Rood',
      
      // Uiterlijk
      uiterlijkHelderheid: 'helder',
      uiterlijkIntensiteit: 'diep',
      uiterlijkKleur: 'rood_robijnrood',
      uiterlijkAndereKenmerken: 'Dikke, langzame tranen',
      
      // Geur
      geurConditie: 'zuiver',
      geurIntensiteit: 'sterk',
      geurOntwikkeling: 'in_ontwikkeling',
      
      // Smaak
      smaakZoetheid: 'droog',
      smaakZuurgehalte: 'gemiddeld',
      smaakTaninegehalte: 'hoog',
      smaakAlcoholgehalte: 'hoog',
      smaakBody: 'vol',
      smaakMousse: null,
      smaakIntensiteit: 'sterk',
      smaakAfdronk: 'lang',
      
      // Conclusie
      kwaliteitsniveau: 'voortreffelijk',
      drinkbaarheid: 'kan_nog_rijpen',
      aantekeningen: 'Een uitzonderlijke wijn met geweldige balans en complexiteit. Zal nog zeker 10-15 jaar kunnen rijpen.'
    }
  });

  // Koppel aroma's aan proefnotitie1
  await prisma.proefnotitieAroma.create({
    data: {
      proefnotitieId: proefnotitie1.id,
      aromaId: aroma1.id,
      type: 'geur'
    }
  });

  await prisma.proefnotitieAroma.create({
    data: {
      proefnotitieId: proefnotitie1.id,
      aromaId: aroma3.id,
      type: 'geur'
    }
  });

  await prisma.proefnotitieAroma.create({
    data: {
      proefnotitieId: proefnotitie1.id,
      aromaId: aroma1.id,
      type: 'smaak'
    }
  });

  await prisma.proefnotitieAroma.create({
    data: {
      proefnotitieId: proefnotitie1.id,
      aromaId: aroma4.id,
      type: 'smaak'
    }
  });

  const proefnotitie2 = await prisma.proefnotitie.create({
    data: {
      wijnId: wijn2.id,
      gebruikerId: gebruiker2.id,
      proefdatum: new Date('2025-04-01'),
      medeproevers: 'Jan Wijnproever',
      
      // Uiterlijk
      uiterlijkHelderheid: 'helder',
      uiterlijkIntensiteit: 'licht',
      uiterlijkKleur: 'wit_groengeel',
      uiterlijkAndereKenmerken: 'Lichte belletjes',
      
      // Geur
      geurConditie: 'zuiver',
      geurIntensiteit: 'gemiddeld+',
      geurOntwikkeling: 'jong',
      
      // Smaak
      smaakZoetheid: 'droog',
      smaakZuurgehalte: 'hoog',
      smaakTaninegehalte: null,
      smaakAlcoholgehalte: 'gemiddeld',
      smaakBody: 'gemiddeld',
      smaakMousse: null,
      smaakIntensiteit: 'gemiddeld+',
      smaakAfdronk: 'gemiddeld+',
      
      // Conclusie
      kwaliteitsniveau: 'goed',
      drinkbaarheid: 'nu_drinken',
      aantekeningen: 'Typische Sauvignon Blanc uit Nieuw-Zeeland met uitgesproken aroma\'s van grapefruit en passievrucht. Nu op dronk.'
    }
  });

  // Koppel aroma's aan proefnotitie2
  await prisma.proefnotitieAroma.create({
    data: {
      proefnotitieId: proefnotitie2.id,
      aromaId: aroma2.id,
      type: 'geur'
    }
  });

  await prisma.proefnotitieAroma.create({
    data: {
      proefnotitieId: proefnotitie2.id,
      aromaId: aroma2.id,
      type: 'smaak'
    }
  });

  console.log('Proefnotities aangemaakt voor:', wijn1.naam, wijn2.naam);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
