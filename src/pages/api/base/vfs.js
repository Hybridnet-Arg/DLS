import prisma from '@/lib/prisma/client';

export default async function handler(req, res) {
  try {
    const vfBomba = await prisma.vfBomba.findMany({});
    res.status(200).json(vfBomba);
  } catch (error) {
    res.status(200).json([]);
  }
}
