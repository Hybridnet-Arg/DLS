import prisma from '@/lib/prisma/client';

export default async function handler(req, res) {
  const perforador = req.body.perf;
  try {
    const logs = await prisma.log.findMany({
      where: {
        perforador: perforador,
      },
      include: {
        perforadorPieza: {
          include: {
            pieza: true,
            diametro: true,
            marca: true,
            modelo: true,
          },
        },
      },
    });

    res.status(200).json(logs);
  } catch (error) {
    res.status(200).json([]);
  }
}
