import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const result = await prisma.$queryRaw(
      Prisma.sql`select w1.perforador, w1.lts,format(w1.fecha,'dd/MM/yyyy HH:mm') as fecha  from wellData w1
                     where w1.fecha= (SELECT max(fecha)
                                       FROM wellData w2
                                       where w2.lts!=0
                                       and w2.perforador=w1.perforador)
                     and w1.perforador!=4165
                     order by w1.perforador`
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(200).json([{ error: error }]);
  }
}
