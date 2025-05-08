import { Prisma } from '@prisma/client';
import prisma from '../client';

export const getTubularInventoryByDestination = async ({
  perforador_id = null,
  tubulares_destino_ids = null,
}) => {
  let baseQuery = Prisma.sql`
    SELECT 
      tm.tubulares_destino_id,
      SUM(DISTINCT tm.cantidad) AS total_cantidad,
      COALESCE(SUM(md.cantidad), 0) AS total_cantidad_destino,
      COALESCE(SUM(tmp.cantidad), 0) AS total_cantidad_prestamo,
      SUM(DISTINCT tm.cantidad) - COALESCE(SUM(md.cantidad), 0) + COALESCE(SUM(tmp.cantidad), 0) AS total
    FROM tubulares_movimientos tm
    JOIN tubulares t on tm.tubular_id = t.id
    LEFT JOIN tubulares_movimientos_conexiones tmc ON tmc.tubulares_movimiento_origen_id = tm.id
    LEFT JOIN tubulares_movimientos md ON md.id = tmc.tubulares_movimiento_destino_id
    LEFT JOIN tubulares_movimientos_prestamos tmp ON tmp.tubulares_movimiento_destino_id = tm.id
    WHERE t.activo = 1
  `;
  if (perforador_id) {
    baseQuery = Prisma.sql`${baseQuery} AND tm.perforador_id = ${perforador_id}`;
  }
  if (tubulares_destino_ids) {
    baseQuery = Prisma.sql`${baseQuery} AND tm.tubulares_destino_id IN (${Prisma.join(tubulares_destino_ids)})`;
  }

  const fullQuery = Prisma.sql`${baseQuery} GROUP BY tm.tubulares_destino_id`;

  const tubulares_movimientos = await prisma.$queryRaw(fullQuery);
  return tubulares_movimientos;
};
