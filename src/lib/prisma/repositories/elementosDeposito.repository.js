import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma/client';
import { serializedData } from '@/lib/prisma/utils';

export const getDepositElements = async (queries = {}) => {
  const depositElements = await prisma.elementos_deposito.findMany(queries);
  return serializedData(depositElements);
};

export const groupDepositElementsCiclosCable = async (queries = {}) => {
  const query = Prisma.sql`
    SELECT
      COUNT(ed.marca_id) AS stock,
      ed.marca_id,
      ed.diametro_id,
      (
        SELECT 
          m.*
        FROM marcas AS m
        WHERE m.id = ed.marca_id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
      ) AS marca,
      (
        SELECT 
          d.*
        FROM diametros AS d
        WHERE d.id = ed.diametro_id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
      ) AS diametro
    FROM elementos_deposito AS ed
    LEFT JOIN elementos_componente AS j1 ON j1.id = ed.elemento_componente_id
    LEFT JOIN componentes_perforador AS j2 ON j2.id = j1.componente_perforador_id
    LEFT JOIN perforadores AS j3 ON j3.id = j2.perforador_id
    WHERE (
      ed.baja = ${queries?.where?.baja} AND
      ed.en_uso = ${queries?.where?.en_uso} AND
      (j1.elemento_id = ${queries?.where?.elemento_componente?.elemento_id} AND
      ((j3.numero = ${queries?.where?.elemento_componente?.componente_perforador?.perforador?.numero} AND
      (j3.id IS NOT NULL)) AND
      j2.componente_id = ${queries?.where?.elemento_componente?.componente_perforador?.componente_id} AND
      (j2.id IS NOT NULL)) AND
      (j1.id IS NOT NULL))
    )
    GROUP BY ed.marca_id, ed.diametro_id
  `;

  const depositElements = await prisma.$queryRaw(query);
  return depositElements?.map((depositElement) => ({
    ...depositElement,
    marca: JSON.parse(depositElement?.marca),
    diametro: JSON.parse(depositElement?.diametro),
  }));
};
