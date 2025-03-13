import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const perf = req.body.perf;
    //const perf ='160';
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT nroPieza, p.tipo,d.diametro,stock,[dbo].[disponibilidad] (pp.idPieza,pd.idDiametro,pp.perforador ) as disp
         FROM piezaPerforador pp
         JOIN pieza p on pp.idPieza=p.idPieza
         LEFT JOIN piezaDiametro pd ON pp.idPieza=pd.idPieza
         LEFT JOIN diametro d ON pd.idDiametro=d.idDiametro
         where pp.perforador=${perf}
         order by nroPieza`
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(200).json([{ error: error }]);
  }
}
