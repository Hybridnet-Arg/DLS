import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const whereQuery = {};

    const nombre = searchParams.get('nombre');
    if (nombre) whereQuery.nombre = { contains: nombre };

    const estadosPozo = await prisma.estados_pozo.findMany({
      where: whereQuery,
    });

    return NextResponse.json({ estadosPozo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener los pozos' },
      { status: 500 }
    );
  }
}
