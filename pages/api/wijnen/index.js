// pages/api/wijnen/index.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const wijnen = await prisma.wijn.findMany({
        include: {
          proefnotities: {
            include: {
              gebruiker: true
            }
          }
        },
        orderBy: {
          naam: 'asc'
        }
      });

      res.status(200).json({ success: true, wijnen });
    } catch (error) {
      console.error('Error fetching wijnen:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
