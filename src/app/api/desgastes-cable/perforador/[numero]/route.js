import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';
import { COMPONENTES } from '@/constants/componentes.constant';
import { ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA } from '@/constants/elementos.contant';

export async function GET(_req, { params }) {
  try {
    const { numero } = params;
    const numeroPerforador = Number(numero);

    const elementoDeposito = await prisma.elementos_deposito.findFirst({
      where: {
        elemento_componente: {
          elemento_id: ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA.BOBINA,
          componente_perforador: {
            perforador: { numero: numeroPerforador },
            componente_id: COMPONENTES.CICLOS_CABLE_TONELADA_MILLA,
          },
        },
        en_uso: true,
        baja: false,
      },
      select: {
        id: true,
        elemento_componente: {
          include: {
            componente_perforador: true,
          },
        },
        desgastes_cable: {
          orderBy: { creado_el: 'desc' },
          take: 1,
        },
      },
    });

    if (!elementoDeposito) {
      return NextResponse.json({ desgaste_cable: 0 }, { status: 200 });
    }
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
            WHERE p.numero = ${numeroPerforador}
              AND dc.componente_perforador_id = ${elementoDeposito?.elemento_componente.componente_perforador_id} 
              AND dc.elemento_componente_id = ${elementoDeposito?.elemento_componente.id}
              AND dc.elemento_deposito_id = ${elementoDeposito?.id}
              AND (
                NOT EXISTS (
                    SELECT 1 
                    FROM cortes_cable cc 
                    WHERE cc.elemento_deposito_id = ${elementoDeposito?.id}
                )
                OR dc.creado_el > (
                    SELECT TOP 1 cc.fecha_corte 
                    FROM cortes_cable cc 
                    WHERE cc.elemento_deposito_id = ${elementoDeposito?.id} 
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
                ROW_NUMBER() OVER (PARTITION BY intervalo_id ORDER BY creado_el) AS row_num,
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
    return NextResponse.json(
      {
        ...elementoDeposito,
        total_desgaste_cable: totalDesgaste?.[0]?.desgaste_total || 0,
      },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorHandler(error);
  }
}
