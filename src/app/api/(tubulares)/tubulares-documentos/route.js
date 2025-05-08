import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { uploadFile } from '@/utils/uploadFile.util';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';
import { ESTADOS_MOVIMIENTOS_TUBULARES, UPLOAD_DIRECTORIES } from '@/constants';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get('archivo');
    const fecha = formData.get('fecha');
    const fecha_expiracion = formData.get('fecha_expiracion');
    const numero = formData.get('numero');
    const tipo_documento = formData.get('tipo_documento');
    const tubulares_movimiento_id = formData.get('tubulares_movimiento_id');

    if (!file) throw new ApiError(400, 'Falta el archivo');

    const data = await prisma.$transaction(
      async (prismaTx) => {
        const urlFile = await uploadFile(
          file,
          UPLOAD_DIRECTORIES.PRIVATE.TUBULARES
        );
        if (!urlFile) throw new ApiError(400, 'Falta el archivo');

        const tubularesDocPayload = {
          tubulares_movimiento_id: parseInt(tubulares_movimiento_id),
          ruta: urlFile,
          numero,
          tipo: tipo_documento,
          fecha: new Date(fecha),
        };

        if (fecha_expiracion) {
          tubularesDocPayload.fecha_expiracion = new Date(fecha_expiracion);
        }

        const tubulares_documento = await prismaTx.tubulares_documentos.create({
          data: tubularesDocPayload,
        });

        await prismaTx.tubulares_movimientos.update({
          where: { id: parseInt(tubulares_movimiento_id) },
          data: {
            estado: ESTADOS_MOVIMIENTOS_TUBULARES.DOCUMENTACION_COMPLETADA,
          },
        });

        return tubulares_documento;
      },
      {
        maxWait: 5000,
        timeout: 22000,
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
