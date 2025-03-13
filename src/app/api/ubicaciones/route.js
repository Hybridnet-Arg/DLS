import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const nombre = searchParams.get('nombre');

    const whereQuery = {};
    if (nombre) whereQuery.nombre = { contains: nombre };

    const ubicaciones = await prisma.ubicaciones.findMany({
      where: whereQuery,
      orderBy: {
        nombre: 'asc',
      },
    });

    return NextResponse.json({ ubicaciones }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener las ubicaciones' },
      { status: 500 }
    );
  }
}
