// pages/api/proefnotities/[id].js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;
  const proefnotitieId = parseInt(id);

  if (isNaN(proefnotitieId)) {
    return res.status(400).json({ success: false, error: 'Ongeldig ID formaat' });
  }

  if (req.method === 'GET') {
    try {
      const proefnotitie = await prisma.proefnotitie.findUnique({
        where: { id: proefnotitieId },
        include: {
          wijn: true,
          gebruiker: true,
          aroma: {
            include: {
              aroma: true
            }
          }
        }
      });

      if (!proefnotitie) {
        return res.status(404).json({ success: false, error: 'Proefnotitie niet gevonden' });
      }

      res.status(200).json({ success: true, proefnotitie });
    } catch (error) {
      console.error('Error fetching proefnotitie:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      // Hier zou je de update logica implementeren, vergelijkbaar met de POST methode
      // maar dan met een update in plaats van create
      res.status(200).json({ success: true, message: 'Update functionaliteit nog te implementeren' });
    } catch (error) {
      console.error('Error updating proefnotitie:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Eerst de gekoppelde aroma's verwijderen
      await prisma.proefnotitieAroma.deleteMany({
        where: { proefnotitieId }
      });

      // Dan de proefnotitie zelf verwijderen
      const deletedProefnotitie = await prisma.proefnotitie.delete({
        where: { id: proefnotitieId }
      });

      res.status(200).json({ success: true, deletedProefnotitie });
    } catch (error) {
      console.error('Error deleting proefnotitie:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
