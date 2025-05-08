import prisma from '@/lib/prisma/client';

export default async function handler(req, res) {
  try {
    const perforador = req.body.perf;
    const ultimasHoras = await prisma.wellData.findFirst({
      where: {
        perforadorStr: perforador,
      },
      orderBy: {
        fecha: 'desc',
      },
    });

    const hsBombaCambios = await prisma.$queryRaw`
    WITH ultimosRegistros AS (
      SELECT TOP 5 hsBomba1, hsBomba2, hsBomba3
      FROM wellData
      ORDER BY fecha DESC
    )
    SELECT
      CASE WHEN COUNT(DISTINCT hsBomba1) > 1 THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END AS tieneCambioHsBomba1,
      CASE WHEN COUNT(DISTINCT hsBomba2) > 1 THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END AS tieneCambioHsBomba2,
      CASE WHEN COUNT(DISTINCT hsBomba3) > 1 THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END AS tieneCambioHsBomba3
    FROM ultimosRegistros;
  `;

    return res.status(200).json({ ...ultimasHoras, ...hsBombaCambios?.[0] });
  } catch (error) {
    return res.status(500).json(error);
  }
}
