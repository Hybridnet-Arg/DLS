import prisma from '@/lib/prisma/client';

export default async function handler(req, res) {
  const datos = req.body;

  try {
    const createMany = await prisma.perforadorPieza.createMany({
      data: datos,
    });

    res.status(200).json({ exito: true });
  } catch (error) {
    console.log(error);
    res.status(200).json({ exito: false });
  }
}
