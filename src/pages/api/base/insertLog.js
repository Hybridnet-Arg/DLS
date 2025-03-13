import prisma from '@/lib/prisma/client';

export default async function handler(req, res) {
  const idPerforadorPieza = req.body.idPerforadorPieza;
  const hs = req.body.hs;
  const movimiento = req.body.movimiento;
  const motivo = req.body.motivo;
  const bomba = req.body.bomba;
  const cuerpo = req.body.cuerpo;
  const modulo = req.body.modulo;
  const usuario = req.body.usuario;
  const perforador = req.body.perforador;

  try {
    const log = await prisma.log.create({
      data: {
        perforador: perforador,
        movimiento: movimiento,
        detalle: motivo,
        bomba: bomba,
        cuerpo: cuerpo,
        modulo: modulo,
        hs: hs,
        usuario: usuario,
        perforadorPieza: { connect: { idPerforadorPieza: idPerforadorPieza } },
      },
    });

    res.status(200).json({ exito: true });
  } catch (error) {
    console.log(error);
    res.status(200).json({ exito: false });
  }
}
