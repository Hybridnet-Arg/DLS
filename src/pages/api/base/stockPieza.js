import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const perf = req.body.perforador;
    const pieza = req.body.idPieza;
    const diametro = req.body.idDiametro;
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT stock, reposicion, [dbo].[disponibilidad] (pp.idPieza,${diametro},pp.perforador) as disp
         FROM piezaPerforador pp
         where perforador=${perf}
         and idPieza=${pieza}`
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(200).json([{ error: error }]);
  }
}
