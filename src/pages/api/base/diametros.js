import prisma from '@/lib/prisma/client';

export default async function handler(req, res) {
  try {
    const diametros = await prisma.diametro.findMany({});
    res.status(200).json(diametros);
  } catch (error) {
    res.status(200).json([]);
  }
}
