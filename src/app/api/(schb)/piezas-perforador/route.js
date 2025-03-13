import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants';
import apiErrorHandler from '@/utils/handlers/apiError.handler';
import { paginationFormatter } from '@/utils/formatters/pagination.formatter';
import { Prisma } from '@prisma/client';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  try {
    const page = parseInt(searchParams.get('page') ?? DEFAULT_PAGE);
    const limit = parseInt(searchParams.get('limit') ?? DEFAULT_PAGE_SIZE);
    const offset = (page - 1) * limit;

    const perforador = searchParams.get('perforador');
    const disponibilidad = searchParams.get('disponibilidad');

    const whereClause = {};
    if (perforador) whereClause.perforador = parseInt(perforador);

    if (disponibilidad) {
      const result = await prisma.$queryRaw(
        Prisma.sql`
              SELECT 
               nroPieza,
               p.tipo,
               d.diametro,
               stock,
               [dbo].[disponibilidad] (
                pp.idPieza,
                pd.idDiametro,
                pp.perforador
                ) as disp
               FROM piezaPerforador pp
               JOIN pieza p on pp.idPieza = p.idPieza
               LEFT JOIN piezaDiametro pd ON pp.idPieza = pd.idPieza
               LEFT JOIN diametro d ON pd.idDiametro = d.idDiametro
               WHERE pp.perforador = ${perforador}
               ORDER BY nroPieza
               OFFSET ${offset} ROWS
               FETCH NEXT ${limit} ROWS ONLY`
      );

      const count = await prisma.$queryRaw(
        Prisma.sql`
          SELECT 
            COUNT(*) as total
          FROM piezaPerforador pp
          JOIN pieza p on pp.idPieza = p.idPieza
          LEFT JOIN piezaDiametro pd ON pp.idPieza = pd.idPieza
          LEFT JOIN diametro d ON pd.idDiametro = d.idDiametro
          WHERE pp.perforador = ${perforador}`
      );

      const piezasPerforador = paginationFormatter({
        data: result,
        page,
        pageSize: limit,
        totalRecords: count?.[0]?.total ?? 0,
      });

      return NextResponse.json(piezasPerforador, { status: 200 });
    }

    const totalRecords = await prisma.piezaPerforador.count({
      where: whereClause,
    });
    const piezasPerforadorRecords = await prisma.piezaPerforador.findMany({
      skip: offset,
      take: limit,
      where: whereClause,
      include: {
        pieza: {
          include: {
            piezaDiametro: {
              include: {
                diametro: true,
              },
            },
          },
        },
      },
    });

    const piezasPerforador = paginationFormatter({
      data: piezasPerforadorRecords,
      page,
      pageSize: limit,
      totalRecords,
    });

    return NextResponse.json(piezasPerforador, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
