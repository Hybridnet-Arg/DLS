import { NextResponse } from 'next/server';
import apiErrorHandler from '@/utils/handlers/apiError.handler';
import {
  getTanquesNiveles,
  actualizarLitrosDesdeCubitaje,
} from '@/lib/prisma/repositories/tanques.repository';
import { serializedData } from '@/lib/prisma/utils';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  try {
    const perforador = searchParams.get('perforador');
    const tanques = await getTanquesNiveles({
      perforador: parseInt(perforador),
    });
    const tanquesConCubitaje = await actualizarLitrosDesdeCubitaje(tanques);
    return NextResponse.json(serializedData(tanquesConCubitaje), {
      status: 200,
    });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const uid = req.headers.get('uid');

    const { id, habilitado, fecha } = body;

    if (typeof id !== 'number' || typeof habilitado !== 'boolean' || !fecha) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    const dataToUpdate = {
      habilitado,
      usuario_id: parseInt(uid),
      actualizado_el: new Date(),
    };

    if (habilitado) {
      dataToUpdate.fecha_activacion = fecha;
      dataToUpdate.fecha_desactivacion = null;
    } else {
      dataToUpdate.fecha_desactivacion = fecha;
      dataToUpdate.fecha_activacion = null;
    }

    const updated = await prisma.tanques.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const uid = req.headers.get('uid');

    const { idTanqueViejo, nuevaCapacidad } = body;

    if (!idTanqueViejo || !nuevaCapacidad) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    const resultado = await prisma.$transaction(async (tx) => {
      const tanqueViejo = await tx.tanques.findUnique({
        where: { id: idTanqueViejo },
      });

      if (!tanqueViejo) {
        throw new Error('Tanque no encontrado');
      }

      //Crear nuevo tanque con datos del viejo, pero con nueva capacidad
      const nuevoTanque = await tx.tanques.create({
        data: {
          perforador_id: tanqueViejo.perforador_id,
          capacidad: nuevaCapacidad,
          nivel_critico: tanqueViejo.nivel_critico,
          nivel_alerta: tanqueViejo.nivel_alerta,
          habilitado: true,
          en_uso: true,
          usuario_id: parseInt(uid),
          fecha_activacion: new Date(),
        },
      });

      //crear tanques cubitajes para poder acceder a los cubitajes items
      await tx.tanques_cubitajes.create({
        data: {
          tanque_id: nuevoTanque.id,
          cubitaje_id: 1,
        },
      });

      // Marcar el viejo tanque como no en uso
      await tx.tanques.update({
        where: { id: idTanqueViejo },
        data: {
          en_uso: false,
          habilitado: false,
          fecha_desactivacion: new Date(),
        },
      });

      return nuevoTanque;
    });

    return NextResponse.json(resultado, { status: 201 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
