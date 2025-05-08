import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
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
    const uid = request.headers.get('uid');
    const result = await prisma.$transaction(async (prisma) => {
      const locacion = await prisma.locaciones.update({
        where: {
          id: parseInt(id),
        },
        data: {
          nombre,
          nombre_clave,
          descripcion,
          coordenadas,
          fecha_inicio: new Date(fecha_inicio),
          fecha_fin: new Date(fecha_fin),
          ubicacion_id: parseInt(ubicacion_id),
          actualizado_el: new Date(),
        },
      });

      const log = await prisma.log_locaciones.create({
        data: {
          locacion_id: parseInt(id),
          usuario_id: parseInt(uid),
          alta: false,
          baja: false,
          modificacion: true,
        },
      });

      return { locacion, log };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const uid = request.headers.get('uid');
    const locacion = await prisma.locaciones.findUnique({
      where: { id: parseInt(id) },
      include: {
        perforador_locaciones: {
          include: {
            planes_pozo: true,
          },
        },
      },
    });

    if (
      locacion?.perforador_locaciones?.some((pl) => pl.planes_pozo.length > 0)
    ) {
      return NextResponse.json(
        {
          message:
            'NO ES POSIBLE BORRAR ESTA LOCACION, YA QUE TIENE PLAN DE POZO ASIGNADO.',
        },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (prisma) => {
      const updatedLocacion = await prisma.locaciones.update({
        where: { id: parseInt(id) },
        data: {
          eliminado: true,
          actualizado_el: new Date(),
        },
      });

      const log = await prisma.log_locaciones.create({
        data: {
          locacion_id: parseInt(id),
          usuario_id: parseInt(uid),
          alta: false,
          baja: true,
          modificacion: false,
        },
      });

      return { updatedLocacion, log };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
