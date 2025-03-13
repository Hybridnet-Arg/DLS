import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const whereQuery = {};

    const activo = searchParams.get('activo');
    const locacionId = searchParams.get('locacion_id');
    const perforadorId = searchParams.get('perforador_id');

    if (activo) whereQuery.activo = JSON.parse(activo);
    if (perforadorId) whereQuery.perforador_id = Number(perforadorId);
    if (locacionId) whereQuery.locacion_id = Number(locacionId);

    const perforadorLocaciones = await prisma.perforador_locaciones.findMany({
      where: whereQuery,
      include: {
        perforador: true,
        locacion: true,
        planes_pozo: {
          orderBy: { creado_el: 'desc' },
        },
      },
    });

    return NextResponse.json({ perforadorLocaciones }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener los pozos' },
      { status: 500 }
    );
  }
}
