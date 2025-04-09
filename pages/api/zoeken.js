// pages/api/zoeken.js
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { 
      zoekterm, wijnmaker, druif, land, regio, 
      vintage, prijsMin, prijsMax, proever, 
      kwaliteitsniveau, aroma 
    } = req.query;

    console.log('Zoekparameters:', req.query); // Debug logging

    // Bouw de query op
    let whereClause = {};
    
    if (zoekterm) {
      whereClause.OR = [
        { wijn: { naam: { contains: zoekterm, mode: 'insensitive' } } },
        { wijn: { wijnmaker: { contains: zoekterm, mode: 'insensitive' } } },
        { wijn: { druif: { contains: zoekterm, mode: 'insensitive' } } },
        { wijn: { land: { contains: zoekterm, mode: 'insensitive' } } },
        { wijn: { regio: { contains: zoekterm, mode: 'insensitive' } } },
        { aantekeningen: { contains: zoekterm, mode: 'insensitive' } }
      ];
    }

    // Voeg specifieke filters toe
    if (wijnmaker) {
      whereClause.wijn = { ...whereClause.wijn, wijnmaker: { contains: wijnmaker, mode: 'insensitive' } };
    }
    
    if (druif) {
      whereClause.wijn = { ...whereClause.wijn, druif: { contains: druif, mode: 'insensitive' } };
    }
    
    if (land) {
      whereClause.wijn = { ...whereClause.wijn, land: { contains: land, mode: 'insensitive' } };
    }
    
    if (regio) {
      whereClause.wijn = { ...whereClause.wijn, regio: { contains: regio, mode: 'insensitive' } };
    }
    
    if (vintage) {
      whereClause.wijn = { ...whereClause.wijn, vintage: parseInt(vintage) };
    }
    
    if (prijsMin || prijsMax) {
      whereClause.wijn = { ...whereClause.wijn };
      if (prijsMin) {
        whereClause.wijn.prijs = { ...whereClause.wijn.prijs, gte: parseFloat(prijsMin) };
      }
      if (prijsMax) {
        whereClause.wijn.prijs = { ...whereClause.wijn.prijs, lte: parseFloat(prijsMax) };
      }
    }
    
    if (proever) {
      whereClause.gebruiker = { naam: { contains: proever, mode: 'insensitive' } };
    }
    
    if (kwaliteitsniveau) {
      whereClause.kwaliteitsniveau = kwaliteitsniveau;
    }
    
    if (aroma) {
      whereClause.ProefnotitieAroma = {
        some: {
          aroma: {
            naam: { contains: aroma, mode: 'insensitive' }
          }
        }
      };
    }

    console.log('Where clause:', JSON.stringify(whereClause, null, 2)); // Debug logging

    // Voer de zoekopdracht uit
    const proefnotities = await prisma.proefnotitie.findMany({
      where: whereClause,
      include: {
        wijn: true,
        gebruiker: true,
        ProefnotitieAroma: {
          include: {
            aroma: true
          }
        }
      },
      orderBy: {
        proefdatum: 'desc'
      }
    });

    console.log(`Aantal resultaten: ${proefnotities.length}`); // Debug logging

    return res.status(200).json(proefnotities);
  } catch (error) {
    console.error('Zoekfout:', error);
    return res.status(500).json({ message: 'Er is een fout opgetreden bij het zoeken', error: error.message });
  }
}
