import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const query = Prisma.sql`
      SELECT l.*
      FROM locaciones l
      LEFT JOIN perforador_locaciones pl
      ON l.id = pl.locacion_id
      WHERE pl.locacion_id IS NULL 
      AND l.eliminado = 0
      ORDER BY l.actualizado_el DESC;
    `;

    const resultQuery = await prisma.$queryRaw(query);
    const response = NextResponse.json(
      {
        locaciones: resultQuery,
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message:
          'Error al obtener las locaciones disponibles para asignar a un perforador.',
      },
      { status: 500 }
    );
  }
}
