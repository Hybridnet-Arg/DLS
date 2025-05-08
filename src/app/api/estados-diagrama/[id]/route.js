import prisma from '@/lib/prisma/client';
import { updateDetalleEstadosDiagrama } from '@/lib/prisma/repositories/estadosDiagrama.repository';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { detalles_estado_diagrama = [] } = await req.json();

    const estadoDiagrama = await prisma.estados_diagrama.findFirst({
      where: { id: Number(id) },
    });
    if (!estadoDiagrama) throw new Error('Estado diagrama no encontrado');

    const detallesEstadoDiagrama = await prisma.$transaction(
      async (prismaTx) => {
        const updatedAt = new Date();
        const promises = detalles_estado_diagrama.map(
          ({ id: detalleEstadoDiagramaId, ...data }) =>
            updateDetalleEstadosDiagrama(
              detalleEstadoDiagramaId,
              Number(id),
              { ...data, actualizado_el: updatedAt },
              { transaction: prismaTx }
            )
        );

        await prismaTx.estados_diagrama.update({
          where: { id: Number(id) },
          data: {
            actualizado_el: updatedAt,
          },
        });
        const detallesActualizados = await Promise.all(promises);
        return detallesActualizados;
      },
      {
        maxWait: 5000,
        timeout: 22000,
      }
    );

    return NextResponse.json(
      {
        estadoDiagrama: { ...estadoDiagrama, detallesEstadoDiagrama },
        message: 'Estado diagrama actualizado con éxito',
      },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorHandler(error, {
      fallbackMessage: 'Error al actualizar el estado diagrama',
    });
  }
}
