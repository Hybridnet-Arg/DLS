import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma/client';

export const getTanqueEstadoCable = async (queries = {}) => {
  const query = Prisma.sql`SELECT w1.perforador, w1.lts, format(w1.fecha,'dd/MM/yyyy HH:mm') as fecha  
             FROM wellData w1
             WHERE w1.perforador = ${queries?.perforador}
               AND w1.fecha = (
                   SELECT max(fecha)
                   FROM wellData w2
                   WHERE w2.lts != 0
                     AND w2.perforador = w1.perforador
               )
             ORDER BY w1.perforador`;

  const result = await prisma.$queryRaw(query);
  return result;
};

export const getTanquesNiveles = async (queries = {}) => {
  const query = Prisma.sql`
    WITH UltimaLectura AS (
      SELECT
        perforador,
        MAX(fecha) AS ultima_fecha
      FROM wellData
      WHERE lts !=0 OR ymm IS NOT NULL
      GROUP BY perforador
    )
    SELECT 
      t.id AS tanque_id,
      t.perforador_id,
      p.nombre_clave AS perforador_nombre_clave,
      p.nombre AS perforador_nombre,
      p.numero AS perforador_numero,
      t.capacidad,
      t.nivel_critico,
      t.nivel_alerta,
      t.habilitado,
      t.en_uso,
      w.lts,
      w.ymm,
      FORMAT(w.fecha, 'dd/MM/yyyy HH:mm') AS fecha
    FROM tanques t
    INNER JOIN perforadores p ON t.perforador_id = p.id
    LEFT JOIN UltimaLectura u ON u.perforador = p.nombre_clave
    LEFT JOIN wellData w ON w.perforador = p.nombre_clave AND w.fecha = u.ultima_fecha
    WHERE t.en_uso = 1 AND p.deshabilitado = 0
    ${queries?.perforador ? Prisma.sql`AND p.nombre_clave = ${queries.perforador}` : Prisma.empty}
    ORDER BY t.habilitado DESC, w.fecha DESC;
  `;

  const result = await prisma.$queryRaw(query);

  return result;
};

export const actualizarLitrosDesdeCubitaje = async (arrayTanques) => {
  const resultado = await Promise.all(
    arrayTanques.map(async (tanque) => {
      const { tanque_id, ymm } = tanque;
      if (ymm === null) return tanque;
      const ymmEntero = Math.floor(ymm);
      const cubitaje = await prisma.tanques_cubitajes.findUnique({
        where: { tanque_id },
        select: { cubitaje_id: true },
      });

      if (!cubitaje) {
        console.warn(`No se encontró cubitaje para tanque_id ${tanque_id}`);
        return tanque;
      }

      // Buscar el cubitaje_item con parte entera del ymm igual
      const item = await prisma.$queryRaw`
        SELECT TOP 1 litros
        FROM cubitaje_items
        WHERE cubitaje_id = ${cubitaje.cubitaje_id}
          AND FLOOR(ymm) = ${ymmEntero}
      `;

      if (item.length > 0) {
        return {
          ...tanque,
          lts: Math.round(item[0].litros).toString(),
          ymmCm: Math.floor(ymmEntero / 10),
        };
      } else {
        console.warn(
          `No se encontró cubitaje_item con ymm ${ymmEntero} para tanque_id ${tanque_id}`
        );
        return tanque;
      }
    })
  );

  return resultado;
};
