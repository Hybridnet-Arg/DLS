import clsx from 'clsx';
import { useState } from 'react';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import TareaForecast from './TareaForecast';
import PerforadorCronograma from '../../_components/PerforadorCronograma';

export default function FilaTareasForecast({
  perforadorForecast,
  tiposTareasForecast = [],
  onReload = () => {},
  setShowCreatePerforadorCronograma = () => {},
}) {
  const locacionesPerforadorCronograma =
    perforadorForecast?.perforador?.perforadores_cronograma?.[0]
      ?.locaciones_perforador_cronograma;

  const [explandible, setExplandible] = useState(false);

  return (
    <div className="flex flex-1 mt-2">
      <div className="flex-shrink-0">
        <PerforadorCronograma
          nombre={perforadorForecast?.perforador?.nombre}
          className="me-2"
          completed={perforadorForecast?.perforador}
          handleOnPlus={() => setShowCreatePerforadorCronograma(true)}
        />
      </div>
      <div className="flex flex-1 flex-col ms-[11px]">
        <div className="flex flex-1">
          {perforadorForecast?.tareas_forecast?.map((tareaForecast, index) => (
            <div
              key={`${tareaForecast?.id}-tarea-forecast`}
              className={clsx(
                'flex flex-1 py-2 px-1 bg-white text-center justify-center items-center h-[80px]',
                {
                  'rounded-s-md': index === 0,
                  'rounded-e-md':
                    index === perforadorForecast?.tareas_forecast.length - 1,
                }
              )}
            >
              <TareaForecast
                disabled={locacionesPerforadorCronograma?.length === 0}
                tareaForecast={tareaForecast}
                perforadorForecast={perforadorForecast}
                tiposTareasForecast={tiposTareasForecast}
                fecha={tareaForecast?.data?.fecha}
                onReload={onReload}
                width={'2rem'}
                height={'3.5rem'}
                explandible={explandible}
              />
            </div>
          ))}
        </div>
        {explandible && (
          <div
            className={clsx(
              'flex flex-1 py-2 px-1 bg-white text-center flex justify-center items-center gap-1'
            )}
          >
            {locacionesPerforadorCronograma?.map(
              (locacionesPerforadorCronograma) => (
                <div
                  key={locacionesPerforadorCronograma?.id}
                  className="flex flex-1 bg-dark text-white text-center justify-center items-center rounded"
                >
                  {locacionesPerforadorCronograma?.locacion?.nombre}
                </div>
              )
            )}
          </div>
        )}
      </div>
      <button
        disabled={
          !locacionesPerforadorCronograma ||
          locacionesPerforadorCronograma?.length === 0
        }
        className={clsx({
          'cursor-not-allowed':
            !locacionesPerforadorCronograma ||
            locacionesPerforadorCronograma?.length === 0,
          'hover:opacity-60': locacionesPerforadorCronograma?.length > 0,
        })}
        onClick={() => setExplandible((value) => !value)}
      >
        {explandible ? <ChevronsUp size={20} /> : <ChevronsDown size={20} />}
      </button>
    </div>
  );
}
