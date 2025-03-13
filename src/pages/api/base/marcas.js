import prisma from '@/lib/prisma/client';

export default async function handler(req, res) {
  try {
    const marcas = await prisma.marca.findMany({});
    res.status(200).json(marcas);
  } catch (error) {
    res.status(200).json([]);
  }
}
