import prisma from '@/lib/prisma/client';

export default async function handler(req, res) {
  const perf = req.body.perf;
  const baja = req.body.baja;
  const uso = req.body.uso;

  const piezasPerforador = await prisma.perforadorPieza.findMany({
    where: {
      perforador: perf,
      baja: baja,
      enUso: uso,
    },

    include: {
      pieza: true,
      diametro: true,
      marca: true,
      modelo: true,
    },
  });
  res.status(200).json(piezasPerforador);
}
