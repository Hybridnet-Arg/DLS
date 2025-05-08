import { Prisma } from '@prisma/client';
import { obtenerWellData } from '@/services/schb/wellData.service';
import { obtenerAvancesDePozoPorPerforador } from '@/services/avancesDePozo.service';
import { obtenerDesgasteCablePorPerforador } from '@/services/desgastesCable.service';
import { obtenerElementoDepositoPorPerforador } from '@/services/elementosDeposito.service';
import { COMPONENTES } from './componentes.constant';

export const LOCACIONES_PLANTA = {
  TOP_DRIVE: 'td',
  AVANCES_DE_POZO: 'adp',
  SISTEMA_TUBULARES: 'stpt',
  SISTEMA_HORAS_BOMBAS: 'schb',
  CICLOS_CABLE_TONELADA_MILLA: 'cctm',
  TANQUES_GASOIL: 'er',
};

export const LOCACIONES_PLANTA_ACTIVOS = {
  [LOCACIONES_PLANTA.TOP_DRIVE]: {
    label: 'Top Drive',
    getLastUpdate: async ({ idPerforador, nombre }) => {
      const data = await obtenerElementoDepositoPorPerforador(idPerforador, {
        nombre_perforador: nombre,
        componente_id: COMPONENTES.TOP_DRIVE,
      });
      return data?.actualizado_el;
    },
  },
  [LOCACIONES_PLANTA.AVANCES_DE_POZO]: {
    label: 'Avances de Pozo',
    getLastUpdate: async ({ idPerforador, nombre }) => {
      const avanceDePozo = await obtenerAvancesDePozoPorPerforador(
        idPerforador,
        {
          nombre_perforador: nombre,
        }
      );
      return avanceDePozo?.creado_el;
    },
  },
  [LOCACIONES_PLANTA.SISTEMA_TUBULARES]: {
    label: 'Sist. de trazabilidad p/ tubulares',
    getLastUpdate: async () => {},
  },
  [LOCACIONES_PLANTA.SISTEMA_HORAS_BOMBAS]: {
    label: 'Sist. de horas de bombas',
    getLastUpdate: async ({ idPerforador }) => {
      const data = await obtenerWellData({
        limit: 1,
        sort_field: 'fecha',
        sort_type: Prisma.SortOrder.desc,
        perforador: idPerforador,
      });
      return data?.[0]?.fecha;
    },
  },
  [LOCACIONES_PLANTA.CICLOS_CABLE_TONELADA_MILLA]: {
    label: 'Ciclos cable tonelada milla',
    getLastUpdate: async ({ idPerforador, nombre }) => {
      const lastUpdate = await obtenerDesgasteCablePorPerforador(idPerforador, {
        last_desgaste_cable: true,
        nombre_perforador: nombre,
      });
      return lastUpdate?.actualizado_el;
    },
  },
  [LOCACIONES_PLANTA.TANQUES_GASOIL]: {
    label: 'Tanques de gasoil',
    getLastUpdate: async ({ idPerforador }) => {
      const data = await obtenerWellData({
        limit: 1,
        sort_field: 'fecha',
        sort_type: Prisma.SortOrder.desc,
        perforador: idPerforador,
      });
      return data?.[0]?.fecha;
    },
  },
};
