'use client';
import { Plus } from 'lucide-react';
import DTMTipoA from './icons/DTMTipoA';
import DTMTipoB from './icons/DTMTipoB';
import GuiaTipoA from './icons/GuiaTipoA';
import GuiaTipoB from './icons/GuiaTipoB';
import WalkingTipoA from './icons/WalkingTipoA';
import WalkingTipoB from './icons/WalkingTipoB';
import AislacionTipoA from './icons/AislacionTipoA';
import AislacionTipoB from './icons/AislacionTipoB';
import IntermediaTipoA from './icons/IntermediaTipoA';
import IntermediaTipoB from './icons/IntermediaTipoB';
import TareaForecastVacia from './TareaForecastVacia';
import { TIPOS_TARIFA_FORECAST } from '@/constants/cronograma.constant';

export default function TareaForecast({
  disabled = false,
  tareaForecast,
  perforadorForecast,
  tiposTareasForecast,
  fecha,
  onReload = () => {},
  width,
  height,
  explandible,
}) {
  if (!tareaForecast?.tipo_tarea_forecast?.id || disabled) {
    return (
      <TareaForecastVacia
        disabled={disabled}
        perforadorForecast={perforadorForecast}
        tiposTareasForecast={tiposTareasForecast}
        onReload={onReload}
        fecha={fecha}
        explandible={explandible}
      />
    );
  }

  switch (tareaForecast?.tipo_tarea_forecast?.nombre_clave) {
    case TIPOS_TARIFA_FORECAST.A:
      if (tareaForecast?.tipo_tarea_forecast?.tipo === TIPOS_TARIFA_FORECAST.B)
        return <AislacionTipoB height={height} width={width} />;
      return <AislacionTipoA height={height} width={width} />;
    case 'I':
      if (tareaForecast?.tipo_tarea_forecast?.tipo === TIPOS_TARIFA_FORECAST.B)
        return <IntermediaTipoB height={height} width={width} />;
      return <IntermediaTipoA height={height} width={width} />;
    case 'G':
      if (tareaForecast?.tipo_tarea_forecast?.tipo === TIPOS_TARIFA_FORECAST.B)
        return <GuiaTipoB height={height} width={width} />;
      return <GuiaTipoA height={height} width={width} />;
    case 'DTM':
      if (tareaForecast?.tipo_tarea_forecast?.tipo === TIPOS_TARIFA_FORECAST.B)
        return <DTMTipoB height={height} width={width} />;
      return <DTMTipoA height={height} width={width} />;
    case 'WS':
      if (tareaForecast?.tipo_tarea_forecast?.tipo === TIPOS_TARIFA_FORECAST.B)
        return <WalkingTipoB height={height} width={width} />;
      return <WalkingTipoA height={height} width={width} />;
    default:
      return <Plus size={10} />;
  }
}
