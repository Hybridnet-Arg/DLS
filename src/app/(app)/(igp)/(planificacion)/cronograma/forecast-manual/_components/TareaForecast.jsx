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

const MIN_WITDH_FORECAST_CARD = '1.3rem';

export default function TareaForecast({
  disabled = false,
  tareaForecast,
  perforadorForecast,
  tiposTareasForecast,
  fecha,
  onReload = () => {},
  width,
  height,
  expandibleDays,
}) {
  if (!tareaForecast?.tipo_tarea_forecast?.id || disabled) {
    return (
      <TareaForecastVacia
        width={width}
        disabled={disabled}
        perforadorForecast={perforadorForecast}
        tiposTareasForecast={tiposTareasForecast}
        onReload={onReload}
        fecha={fecha}
        expandibleDays={expandibleDays}
      />
    );
  }

  switch (tareaForecast?.tipo_tarea_forecast?.nombre_clave) {
    case TIPOS_TARIFA_FORECAST.A:
      if (tareaForecast?.tipo_tarea_forecast?.tipo === TIPOS_TARIFA_FORECAST.B)
        return (
          <AislacionTipoB
            height={height}
            width={expandibleDays ? MIN_WITDH_FORECAST_CARD : width}
          />
        );
      return (
        <AislacionTipoA
          height={height}
          width={expandibleDays ? MIN_WITDH_FORECAST_CARD : width}
        />
      );
    case 'I':
      if (tareaForecast?.tipo_tarea_forecast?.tipo === TIPOS_TARIFA_FORECAST.B)
        return (
          <IntermediaTipoB
            height={height}
            width={expandibleDays ? MIN_WITDH_FORECAST_CARD : width}
          />
        );
      return (
        <IntermediaTipoA
          height={height}
          width={expandibleDays ? MIN_WITDH_FORECAST_CARD : width}
        />
      );
    case 'G':
      if (tareaForecast?.tipo_tarea_forecast?.tipo === TIPOS_TARIFA_FORECAST.B)
        return (
          <GuiaTipoB
            height={height}
            width={expandibleDays ? MIN_WITDH_FORECAST_CARD : width}
          />
        );
      return (
        <GuiaTipoA
          height={height}
          width={expandibleDays ? MIN_WITDH_FORECAST_CARD : width}
        />
      );
    case 'DTM':
      if (tareaForecast?.tipo_tarea_forecast?.tipo === TIPOS_TARIFA_FORECAST.B)
        return (
          <DTMTipoB
            height={height}
            width={expandibleDays ? MIN_WITDH_FORECAST_CARD : width}
          />
        );
      return (
        <DTMTipoA
          height={height}
          width={expandibleDays ? MIN_WITDH_FORECAST_CARD : width}
        />
      );
    case 'WS':
      if (tareaForecast?.tipo_tarea_forecast?.tipo === TIPOS_TARIFA_FORECAST.B)
        return (
          <WalkingTipoB
            height={height}
            width={expandibleDays ? MIN_WITDH_FORECAST_CARD : width}
          />
        );
      return (
        <WalkingTipoA
          height={height}
          width={expandibleDays ? MIN_WITDH_FORECAST_CARD : width}
        />
      );
    default:
      return <Plus size={10} />;
  }
}
