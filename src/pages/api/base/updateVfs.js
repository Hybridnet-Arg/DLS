import prisma from '@/lib/prisma/client';

export default async function handler(req, res) {
  const vf1 = req.body.vf1;
  const vf2 = req.body.vf2;

  try {
    const updateVfs = await prisma.vfBomba.update({
      where: {
        idVfBomba: 1,
      },
      data: {
        vf1: vf1,
        vf2: vf2,
      },
    });

    res.status(200).json({ exito: true });
  } catch (error) {
    console.log(error);
    res.status(200).json({ exito: false });
  }
}
