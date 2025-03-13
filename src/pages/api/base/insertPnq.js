import prisma from '@/lib/prisma/client';

export default async function handler(req, res) {
  const un = req.body.unidadNegocio;
  const dt = req.body.distributionType;
  const inv1 = req.body.inv_item1;
  const inv2 = req.body.inv_item2;
  const inv3 = req.body.inv_item3;
  const inv4 = req.body.inv_item4;
  const cant = req.body.cantidad;

  try {
    const log = await prisma.pnq.create({
      data: {
        unidadNegocio: un,
        distributionType: dt,
        inv_item1: inv1,
        inv_item2: inv2,
        inv_item3: inv3,
        inv_item4: inv4,
        cantidad: cant,
        estado: 'pendiente',
      },
    });

    res.status(200).json({ exito: true });
  } catch (error) {
    console.log(error);
    res.status(200).json({ exito: false });
  }
}
