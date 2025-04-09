// pages/api/proefnotities/index.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Destructure the form data
      const {
        // Algemene informatie
        naamProever, medeproevers, proefdatum, naamWijn, naamWijnmaker,
        druif, vintage, prijs, alcoholpercentage, land, regio,
        
        // Uiterlijk
        uiterlijkHelderheid, uiterlijkIntensiteit, uiterlijkKleur, uiterlijkAndereKenmerken,
        
        // Geur
        geurConditie, geurIntensiteit, geurOntwikkeling, geurAroma,
        
        // Smaak
        smaakZoetheid, smaakZuurgehalte, smaakTaninegehalte, smaakAlcoholgehalte,
        smaakBody, smaakMousse, smaakIntensiteit, smaakAroma, smaakAfdronk,
        
        // Conclusie
        kwaliteitsniveau, drinkbaarheid, aantekeningen
      } = req.body;

      // Eerst controleren of de wijn al bestaat, anders aanmaken
      let wijn = await prisma.wijn.findFirst({
        where: {
          naam: naamWijn,
          wijnmaker: naamWijnmaker,
          vintage: parseInt(vintage)
        }
      });

      if (!wijn) {
        wijn = await prisma.wijn.create({
          data: {
            naam: naamWijn,
            wijnmaker: naamWijnmaker,
            druif: druif,
            vintage: parseInt(vintage),
            prijs: parseFloat(prijs),
            alcoholpercentage: parseFloat(alcoholpercentage),
            land: land,
            regio: regio
          }
        });
      }

      // Controleren of de gebruiker al bestaat, anders aanmaken
      // In een echte applicatie zou je hier authenticatie gebruiken
      let gebruiker = await prisma.gebruiker.findFirst({
        where: {
          naam: naamProever
        }
      });

      if (!gebruiker) {
        gebruiker = await prisma.gebruiker.create({
          data: {
            naam: naamProever,
            email: `${naamProever.toLowerCase().replace(/\s+/g, '.')}@fueradelcamino.nl`,
            wachtwoord: 'tijdelijk_wachtwoord' // In een echte app zou je dit hashen
          }
        });
      }

      // Proefnotitie aanmaken
      const proefnotitie = await prisma.proefnotitie.create({
        data: {
          wijnId: wijn.id,
          gebruikerId: gebruiker.id,
          proefdatum: new Date(proefdatum),
          medeproevers: medeproevers,
          
          // Uiterlijk
          uiterlijkHelderheid: uiterlijkHelderheid,
          uiterlijkIntensiteit: uiterlijkIntensiteit,
          uiterlijkKleur: uiterlijkKleur,
          uiterlijkAndereKenmerken: uiterlijkAndereKenmerken,
          
          // Geur
          geurConditie: geurConditie,
          geurIntensiteit: geurIntensiteit,
          geurOntwikkeling: geurOntwikkeling,
          
          // Smaak
          smaakZoetheid: smaakZoetheid,
          smaakZuurgehalte: smaakZuurgehalte,
          smaakTaninegehalte: smaakTaninegehalte,
          smaakAlcoholgehalte: smaakAlcoholgehalte,
          smaakBody: smaakBody,
          smaakMousse: smaakMousse,
          smaakIntensiteit: smaakIntensiteit,
          smaakAfdronk: smaakAfdronk,
          
          // Conclusie
          kwaliteitsniveau: kwaliteitsniveau,
          drinkbaarheid: drinkbaarheid,
          aantekeningen: aantekeningen
        }
      });

      // Aroma's toevoegen voor geur
      if (geurAroma && geurAroma.length > 0) {
        for (const aromaName of geurAroma) {
          // Controleren of aroma al bestaat, anders aanmaken
          let aroma = await prisma.aroma.findFirst({
            where: {
              naam: aromaName
            }
          });

          if (!aroma) {
            // Bepaal categorie (in een echte app zou je dit beter doen)
            let categorie = 'primair';
            aroma = await prisma.aroma.create({
              data: {
                categorie: categorie,
                naam: aromaName
              }
            });
          }

          // Koppel aroma aan proefnotitie
          await prisma.proefnotitieAroma.create({
            data: {
              proefnotitieId: proefnotitie.id,
              aromaId: aroma.id,
              type: 'geur'
            }
          });
        }
      }

      // Aroma's toevoegen voor smaak
      if (smaakAroma && smaakAroma.length > 0) {
        for (const aromaName of smaakAroma) {
          // Controleren of aroma al bestaat, anders aanmaken
          let aroma = await prisma.aroma.findFirst({
            where: {
              naam: aromaName
            }
          });

          if (!aroma) {
            // Bepaal categorie (in een echte app zou je dit beter doen)
            let categorie = 'primair';
            aroma = await prisma.aroma.create({
              data: {
                categorie: categorie,
                naam: aromaName
              }
            });
          }

          // Koppel aroma aan proefnotitie
          await prisma.proefnotitieAroma.create({
            data: {
              proefnotitieId: proefnotitie.id,
              aromaId: aroma.id,
              type: 'smaak'
            }
          });
        }
      }

      res.status(201).json({ success: true, proefnotitie });
    } catch (error) {
      console.error('Error creating proefnotitie:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const proefnotities = await prisma.proefnotitie.findMany({
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
      console.error('Error fetching proefnotities:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
