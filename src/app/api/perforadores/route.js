import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const nombre = searchParams.get('nombre');
    const nombre_clave = searchParams.get('nombre_clave');
    const id = searchParams.get('id');
    const estado = searchParams.get('estado');
    const deshabilitado = searchParams.get('deshabilitado');
    const ubicacion_id = searchParams.get('ubicacion');

    const whereQuery = { deshabilitado: false };

    if (id) whereQuery.id = Number(id);
    if (nombre) whereQuery.nombre = { contains: nombre };
    if (estado) whereQuery.estado = { contains: estado };
    if (deshabilitado !== null)
      whereQuery.deshabilitado = deshabilitado === 'true';
    if (ubicacion_id) whereQuery.ubicacion_id = Number(ubicacion_id);
    if (nombre_clave) whereQuery.nombre_clave = { contains: nombre_clave };

    const perforadores = await prisma.perforadores.findMany({
      where: whereQuery,
      include: {
        ubicacion: true,
      },
    });

    return NextResponse.json({ perforadores }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener los pozos' },
      { status: 500 }
    );
  }
}
