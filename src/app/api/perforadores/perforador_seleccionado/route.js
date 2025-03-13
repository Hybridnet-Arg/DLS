import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';

export async function GET(req) {
  const uid = req.headers.get('uid');

  if (!uid) {
    return NextResponse.json(
      { message: 'Error: UID es requerido' },
      { status: 400 }
    );
  }

  const parsedUid = parseInt(uid, 10);
  if (isNaN(parsedUid)) {
    return NextResponse.json(
      { message: 'Error: UID no es un número válido' },
      { status: 400 }
    );
  }

  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { id: parsedUid },
      include: {
        perforadores: true,
      },
    });

    if (!usuario || !usuario.perforadores) {
      return NextResponse.json(
        { message: 'Error al obtener perforador seleccionado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { perforador: usuario.perforadores },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function POST(req) {
  const uid = req.headers.get('uid');

  try {
    if (!uid) {
      throw new ApiError(
        400,
        'Error al actualizar perforador seleccionado. UID es requerido'
      );
    }
    const parsedUid = parseInt(uid, 10);
    if (isNaN(parsedUid)) {
      throw new ApiError(
        400,
        'Error al actualizar perforador seleccionado. UID no es un número válido'
      );
    }
    const { perforadorNumero, perforadorNombre } = await req.json();
    const perforador = await prisma.perforadores.findFirst({
      where: { numero: parseInt(perforadorNumero), nombre: perforadorNombre },
      select: { id: true },
    });

    if (!perforador) {
      throw new ApiError(400, 'El perforador especificado no existe');
    }

    const usuario = await prisma.usuarios.update({
      data: {
        perforador_seleccionado: perforador.id,
      },
      where: {
        id: parseInt(uid),
      },
    });

    return NextResponse.json(
      {
        usuario,
        message: 'Perforador seleccionado actualizado correctamente.',
      },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorHandler(error);
  }
}
