import prisma from '@/lib/prisma/client';

export default async function handler(req, res) {
  const idPerforadorPieza = req.body.idPerforadorPieza;
  const hsInst = req.body.hsInst;
  const uso = req.body.uso;
  const baja = req.body.baja;
  const motivo = req.body.motivo;
  const bomba = req.body.bomba;
  const cuerpo = req.body.cuerpo;
  const modulo = req.body.modulo;

  try {
    const updatePiezasPerforador = await prisma.perforadorPieza.update({
      where: {
        idPerforadorPieza: idPerforadorPieza,
      },
      data: {
        hsInst: hsInst,
        enUso: uso,
        baja: baja,
        motivo: motivo,
        bomba: bomba,
        cuerpo: cuerpo,
        modulo: modulo,
      },
    });

    res.status(200).json({ exito: true });
  } catch (error) {
    res.status(200).json({ exito: false });
  }
}
