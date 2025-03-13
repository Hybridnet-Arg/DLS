import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const nombre = searchParams.get('nombre');
    const ubicacionId = searchParams.get('ubicacion_id');
    const nombreClave = searchParams.get('nombre_clave');
    const noneLocacionesPerforadorCronograma = searchParams.get(
      'none_locaciones_perforador_cronograma'
    );

    const whereQuery = { eliminado: false };
    if (nombre) whereQuery.nombre = { contains: nombre };
    if (nombreClave) whereQuery.nombre_clave = { contains: nombreClave };
    if (ubicacionId) whereQuery.ubicacion_id = parseInt(ubicacionId);
    if (noneLocacionesPerforadorCronograma) {
      whereQuery.locaciones_perforador_cronograma = {
        none: {
          deshabilitado: false,
        },
      };
    }

    const locaciones = await prisma.locaciones.findMany({
      where: whereQuery,
      orderBy: {
        actualizado_el: 'desc',
      },
    });

    return NextResponse.json(locaciones, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function POST(request) {
  const uid = request.headers.get('uid');
  try {
    const data = await request.json();
    const {
      nombre,
      nombre_clave,
      descripcion,
      coordenadas,
      ubicacion_id,
      fecha_inicio,
      fecha_fin,
    } = data;

    const result = await prisma.$transaction(async (prisma) => {
      const locacion = await prisma.locaciones.create({
        data: {
          nombre,
          nombre_clave,
          descripcion,
          coordenadas,
          fecha_inicio: new Date(fecha_inicio),
          fecha_fin: new Date(fecha_fin),
          ubicacion_id: parseInt(ubicacion_id),
        },
      });

      const log = await prisma.log_locaciones.create({
        data: {
          locacion_id: locacion?.id,
          usuario_id: parseInt(uid),
          alta: true,
        },
      });

      return { locacion, log };
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
