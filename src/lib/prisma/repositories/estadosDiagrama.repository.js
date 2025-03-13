import prisma from '../client';

export const createEstadosDiagrama = async (
  perforadorId,
  plazPozoId,
  { transaction = null }
) => {
  let prismaInstance = prisma;
  if (transaction) prismaInstance = transaction;

  const estadoDiagrama = await prismaInstance.estados_diagrama.create({
    data: {
      perforador_id: perforadorId,
      plan_pozo_id: plazPozoId,
    },
  });

  return estadoDiagrama;
};

export const createDetallesEstadosDiagramaByPozo = async (
  pozo,
  estadoDiagramaId,
  { transaction = null }
) => {
  let prismaInstance = prisma;
  if (transaction) prismaInstance = transaction;

  const data = pozo?.etapas_pozo?.map((etapa) => ({
    pozo_id: pozo?.id,
    etapa_pozo_id: etapa?.id,
    estado_diagrama_id: estadoDiagramaId,
  }));

  const detallesEstadoDiagrama =
    await prismaInstance.detalles_estado_diagrama.createMany({ data });
  return detallesEstadoDiagrama;
};

export const updateDetalleEstadosDiagrama = async (
  id,
  estado_diagrama_id,
  data,
  { transaction = null }
) => {
  let prismaInstance = prisma;
  if (transaction) prismaInstance = transaction;

  const detalleEstadoDiagrama =
    await prismaInstance.detalles_estado_diagrama.update({
      where: { id, estado_diagrama_id },
      data,
    });
  return detalleEstadoDiagrama;
};
