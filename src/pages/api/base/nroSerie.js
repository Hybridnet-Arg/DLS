import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const perf = req.body.perf;
    const idPieza = req.body.idPieza;
    const result = await prisma.$queryRaw(
      Prisma.sql` select isnull(max(cast(serie as int)),0)+1 as nro from  perforadorPieza
         where perforador=${perf}
         and idPieza=${idPieza}`
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(200).json([{ error: error }]);
  }
}
