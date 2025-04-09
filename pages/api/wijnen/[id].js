// pages/api/wijnen/[id].js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;
  const wijnId = parseInt(id);

  if (isNaN(wijnId)) {
    return res.status(400).json({ success: false, error: 'Ongeldig ID formaat' });
  }

  if (req.method === 'GET') {
    try {
      const wijn = await prisma.wijn.findUnique({
        where: { id: wijnId },
        include: {
          proefnotities: {
            include: {
              gebruiker: true,
              aroma: {
                include: {
                  aroma: true
                }
              }
            }
          }
        }
      });

      if (!wijn) {
        return res.status(404).json({ success: false, error: 'Wijn niet gevonden' });
      }

      res.status(200).json({ success: true, wijn });
    } catch (error) {
      console.error('Error fetching wijn:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
