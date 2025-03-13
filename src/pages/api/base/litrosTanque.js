import prisma from '@/lib/prisma/client';

export default async function handler(req, res) {
  const perforador = req.body.perf;
  const horas = await prisma.wellData.findFirst({
    where: {
      perforadorStr: perforador,
      lts: {
        gt: 0,
      },
    },
    orderBy: {
      fecha: 'desc', // Ordenar por fecha de manera descendente
    },
  });

  res.status(200).json(horas);
}
