import prisma from '@/lib/prisma/client';

export default async function handler(req, res) {
  try {
    const perf = req.body.perf;
    const piezas = await prisma.piezaPerforador.findMany({
      where: {
        perforador: perf,
      },
      include: {
        pieza: true,
      },
    });
    res.status(200).json(piezas);
  } catch (error) {
    res.status(200).json([]);
  }
}
