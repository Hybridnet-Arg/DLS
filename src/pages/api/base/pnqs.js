import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const dt = req.body.dist;

    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT [idPnq]
         ,[cantidad]
         ,[estado]
         ,[fecha]
        ,i1.descr as op1
        ,i2.descr as op2
        ,i3.descr as op3
        ,i4.descr as op4
        ,pieza.tipo as pieza
        ,d.diametro as diametro
        ,distributionType
     FROM pnq p
     JOIN item i1 ON i1.inv_item=p.inv_item1
     JOIN pieza ON i1.idPieza = pieza.idPieza
     LEFT JOIN diametro d ON i1.idDiametro=d.idDiametro
     LEFT JOIN item i2 ON i2.inv_item=p.inv_item2
     LEFT JOIN item i3 ON i3.inv_item=p.inv_item3
     LEFT JOIN item i4 ON i4.inv_item=p.inv_item4
     where p.distributionType=${dt}
     order by fecha desc`
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(200).json([{ error: error }]);
  }
}
