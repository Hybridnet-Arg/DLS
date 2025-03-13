import { calcularPorcentaje } from '@/utils/formatters/percentage.formatter';

export const obtenerLargoDelCable = ({ metrosCable, metrosDespliegue }) => {
  if (!metrosCable && !metrosDespliegue) return 0;
  const largoCable = metrosCable - metrosDespliegue;
  return largoCable;
};

export function obtenerTotalCortesEnMetros(cortes = []) {
  if (cortes?.length === 0) return 0;
  const totalCortes = cortes
    ?.map((corte) => parseFloat(corte?.metros_corte))
    .reduce((acc, corte) => acc + corte, 0);

  return totalCortes;
}

export function obtenerColorBobina({ largoCable, cortesCable = [] }) {
  const minCut = obtenerTotalCortesEnMetros(cortesCable);

  if (!minCut && !largoCable) return '#808080';

  function obtenerColorPorProgreso(progress) {
    if (progress <= 33.33) return '#52B358';
    if (progress <= 66.66) return '#F4DD48';
    return '#D03F49';
  }

  const progress = calcularPorcentaje(minCut, largoCable, null);

  const colorByProgress = obtenerColorPorProgreso(progress ?? 0);
  return colorByProgress;
}
