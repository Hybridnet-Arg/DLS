import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma/client';

export const getDesgasteCable = async (queries = {}) => {
  const query = Prisma.sql`
           WITH Datos AS (
              SELECT 
                  dc.id,
                  dc.bit_weight,
                  dc.block_height,
                  dc.creado_el,
                  LAG(dc.block_height) OVER (ORDER BY dc.creado_el) AS prev_block_height
              FROM desgastes_cable dc
              INNER JOIN perforadores p 
                  ON p.id = dc.perforador_id 
              WHERE p.numero = ${queries?.numero_perforador}
                AND dc.componente_perforador_id = ${queries?.componente_perforador_id} 
                AND dc.elemento_componente_id = ${queries?.elemento_componente_id}
                AND dc.elemento_deposito_id = ${queries?.elemento_deposito_id}
                AND (
                  NOT EXISTS (
                      SELECT 1 
                      FROM cortes_cable cc 
                      WHERE cc.elemento_deposito_id = ${queries?.elemento_deposito_id}
                  )
                  OR dc.creado_el > (
                      SELECT TOP 1 cc.fecha_corte 
                      FROM cortes_cable cc 
                      WHERE cc.elemento_deposito_id = ${queries?.elemento_deposito_id} 
                      ORDER BY cc.fecha_corte DESC
                  )
                )
          ),
          Cambios AS (
              SELECT 
                  id,
                  bit_weight,
                  block_height,
                  creado_el,
                  prev_block_height,
                  CASE 
                      WHEN prev_block_height IS NULL THEN 0
                      WHEN block_height > prev_block_height THEN 1
                      WHEN block_height < prev_block_height THEN -1
                      ELSE 0
                  END AS direccion,
                  LAG(CASE 
                          WHEN prev_block_height IS NULL THEN 0
                          WHEN block_height > prev_block_height THEN 1
                          WHEN block_height < prev_block_height THEN -1
                          ELSE 0
                      END) OVER (ORDER BY creado_el) AS prev_direccion
              FROM Datos
          ),
          Intervalos AS (
              SELECT 
                  id,
                  block_height,
                  creado_el,
                  bit_weight,
                  CASE 
                      WHEN direccion <> LAG(direccion) OVER (ORDER BY creado_el) THEN 1
                      ELSE 0
                  END AS intervalo_change
              FROM Cambios
          ),
          IntervaloId AS (
              SELECT *,
                  SUM(intervalo_change) OVER (ORDER BY creado_el ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS intervalo_id
              FROM Intervalos
          ),
          Resultados AS (
              SELECT 
                  intervalo_id,
                  AVG(bit_weight) AS max_bit_weight,
                  MIN(block_height) AS min_block_height,
                  MAX(block_height) AS max_block_height,
                  MAX(block_height) - MIN(block_height) AS distancia
              FROM IntervaloId
              GROUP BY intervalo_id
          ),
          RankedMedianas AS (
              SELECT 
                  intervalo_id,
                  bit_weight,
                  ROW_NUMBER() OVER (PARTITION BY intervalo_id ORDER BY bit_weight) AS row_num,
                  COUNT(*) OVER (PARTITION BY intervalo_id) AS total_count
              FROM IntervaloId
          ),
          MedianaCalculada AS (
              SELECT 
                  intervalo_id,
                  CASE 
                      WHEN total_count % 2 = 1 THEN 
                          MAX(CASE WHEN row_num = (total_count + 1) / 2 THEN bit_weight END) 
                      ELSE 
                          AVG(CASE WHEN row_num IN (total_count / 2, (total_count / 2) + 1) THEN bit_weight END) 
                  END AS mediana_bit_weight
              FROM RankedMedianas
              GROUP BY intervalo_id, total_count
          )
          select SUM(desgaste) as desgaste_total from (
            SELECT 
                ABS((m.mediana_bit_weight * 0.453592) * (r.distancia * 0.000189394)) AS desgaste
            FROM Resultados r
            JOIN MedianaCalculada m ON r.intervalo_id = m.intervalo_id)
          AS subconsulta;
        `;

  const totalDesgaste = await prisma.$queryRaw(query);
  return totalDesgaste?.[0]?.desgaste_total || 0;
};
