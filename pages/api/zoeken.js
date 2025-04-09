// pages/api/zoeken.js
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { 
        zoekterm, 
        proever, 
        wijnmaker, 
        druif, 
        land, 
        regio, 
        vintage,
        prijsMin,
        prijsMax,
        kwaliteitsniveau
      } = req.query;

      // Bouw de where clause op basis van de zoekparameters
      let where = {};
      
      // Zoeken in wijnen
      let wijnWhere = {};
      
      if (zoekterm) {
        wijnWhere.OR = [
          { naam: { contains: zoekterm } },
          { wijnmaker: { contains: zoekterm } },
          { druif: { contains: zoekterm } },
          { land: { contains: zoekterm } },
          { regio: { contains: zoekterm } }
        ];
      }
      
      if (wijnmaker) wijnWhere.wijnmaker = { contains: wijnmaker };
      if (druif) wijnWhere.druif = { contains: druif };
      if (land) wijnWhere.land = { contains: land };
      if (regio) wijnWhere.regio = { contains: regio };
      if (vintage) wijnWhere.vintage = parseInt(vintage);
      
      if (prijsMin || prijsMax) {
        wijnWhere.prijs = {};
        if (prijsMin) wijnWhere.prijs.gte = parseFloat(prijsMin);
        if (prijsMax) wijnWhere.prijs.lte = parseFloat(prijsMax);
      }
      
      // Zoeken in proefnotities
      let proefnotitieWhere = {};
      
      if (proever) {
        proefnotitieWhere.gebruiker = {
          naam: { contains: proever }
        };
      }
      
      if (kwaliteitsniveau) {
        proefnotitieWhere.kwaliteitsniveau = kwaliteitsniveau;
      }
      
      // Zoeken naar aroma's
      if (req.query.aroma) {
        proefnotitieWhere.aroma = {
          some: {
            aroma: {
              naam: { contains: req.query.aroma }
            }
          }
        };
      }
      
      // Combineer de zoekcriteria
      if (Object.keys(wijnWhere).length > 0) {
        where.wijn = wijnWhere;
      }
      
      if (Object.keys(proefnotitieWhere).length > 0) {
        where = { ...where, ...proefnotitieWhere };
      }

      // Voer de zoekopdracht uit
      const proefnotities = await prisma.proefnotitie.findMany({
        where,
        include: {
          wijn: true,
          gebruiker: true,
          aroma: {
            include: {
              aroma: true
            }
          }
        },
        orderBy: {
          proefdatum: 'desc'
        }
      });

      res.status(200).json({ success: true, proefnotities });
    } catch (error) {
      console.error('Error searching:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
