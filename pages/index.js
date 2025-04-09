// pages/api/proefnotities/index.js
import prisma from '../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { 
        wijnId, gebruikerId, proefdatum, medeproevers,
        uiterlijkHelderheid, uiterlijkIntensiteit, uiterlijkKleur, uiterlijkAndereKenmerken,
        geurConditie, geurIntensiteit, geurOntwikkeling,
        smaakZoetheid, smaakZuurgehalte, smaakTaninegehalte, smaakAlcoholgehalte,
        smaakBody, smaakMousse, smaakIntensiteit, smaakAfdronk,
        kwaliteitsniveau, drinkbaarheid, aantekeningen,
        geurAromas, smaakAromas
      } = req.body;

      console.log('Ontvangen proefnotitie data:', req.body); // Debug logging

      // Maak de proefnotitie aan
      const proefnotitie = await prisma.proefnotitie.create({
        data: {
          wijnId,
          gebruikerId,
          proefdatum: new Date(proefdatum),
          medeproevers,
          
          // Uiterlijk
          uiterlijkHelderheid,
          uiterlijkIntensiteit,
          uiterlijkKleur,
          uiterlijkAndereKenmerken,
          
          // Geur
          geurConditie,
          geurIntensiteit,
          geurOntwikkeling,
          
          // Smaak
          smaakZoetheid,
          smaakZuurgehalte,
          smaakTaninegehalte,
          smaakAlcoholgehalte,
          smaakBody,
          smaakMousse,
          smaakIntensiteit,
          smaakAfdronk,
          
          // Conclusie
          kwaliteitsniveau,
          drinkbaarheid,
          aantekeningen,
        },
      });

      // Voeg aroma's toe voor geur
      if (geurAromas && geurAromas.length > 0) {
        for (const aromaNaam of geurAromas) {
          // Zoek of maak het aroma
          let aroma = await prisma.aroma.findFirst({
            where: { naam: aromaNaam }
          });
          
          if (!aroma) {
            aroma = await prisma.aroma.create({
              data: {
                categorie: 'primair', // Default categorie
                naam: aromaNaam,
                beschrijving: `Aroma: ${aromaNaam}`
              }
            });
          }
          
          // Koppel het aroma aan de proefnotitie
          await prisma.proefnotitieAroma.create({
            data: {
              proefnotitieId: proefnotitie.id,
              aromaId: aroma.id,
              type: 'geur'
            }
          });
        }
      }

      // Voeg aroma's toe voor smaak
      if (smaakAromas && smaakAromas.length > 0) {
        for (const aromaNaam of smaakAromas) {
          // Zoek of maak het aroma
          let aroma = await prisma.aroma.findFirst({
            where: { naam: aromaNaam }
          });
          
          if (!aroma) {
            aroma = await prisma.aroma.create({
              data: {
                categorie: 'primair', // Default categorie
                naam: aromaNaam,
                beschrijving: `Aroma: ${aromaNaam}`
              }
            });
          }
          
          // Koppel het aroma aan de proefnotitie
          await prisma.proefnotitieAroma.create({
            data: {
              proefnotitieId: proefnotitie.id,
              aromaId: aroma.id,
              type: 'smaak'
            }
          });
        }
      }

      console.log('Proefnotitie succesvol opgeslagen met ID:', proefnotitie.id); // Debug logging

      return res.status(201).json(proefnotitie);
    } catch (error) {
      console.error('Fout bij het aanmaken van proefnotitie:', error);
      return res.status(500).json({ message: 'Er is een fout opgetreden bij het aanmaken van de proefnotitie', error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const proefnotities = await prisma.proefnotitie.findMany({
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
      
      return res.status(200).json(proefnotities);
    } catch (error) {
      console.error('Fout bij het ophalen van proefnotities:', error);
      return res.status(500).json({ message: 'Er is een fout opgetreden bij het ophalen van proefnotities', error: error.message });
    }
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}
