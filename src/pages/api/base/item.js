import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const pieza = req.body.idPieza;
    const diametro = req.body.idDiametro;

    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT [inv_item]
            FROM item
             where idPieza=${pieza}
            and (idDiametro=${diametro} or idDiametro is null)`
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(200).json([{ error: error }]);
  }
}
