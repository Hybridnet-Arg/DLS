import clsx from 'clsx';
import {
  FASE_AISLACION,
  FASE_GUIA,
  FASE_INTERMEDIA,
  FASE_INTERMEDIA_SECUNDARIA,
} from '@/constants';

export default function LabelFases({ maxEtapas, className }) {
  return (
    <div
      className={clsx('flex flex-[0.13] flex-col space-y-[7rem] align-middle', {
        [className]: className,
      })}
    >
      <div></div>
      {maxEtapas >= FASE_GUIA && (
        <div className="py-4 flex flex-col rounded-lg mb-6 font-bold text-sm text-dark">
          Fase guía
        </div>
      )}
      {maxEtapas >= FASE_INTERMEDIA && (
        <div className="flex flex-col rounded-lg mb-6 font-bold text-sm text-dark">
          Fase intermedia {maxEtapas >= FASE_AISLACION && '1'}
        </div>
      )}
      {maxEtapas >= FASE_AISLACION && (
        <div className="py-4 flex flex-col rounded-lg mb-6 font-bold text-sm text-dark">
          Fase intermedia 2
        </div>
      )}
      {(maxEtapas >= FASE_AISLACION ||
        maxEtapas === FASE_INTERMEDIA_SECUNDARIA) && (
        <div className="py-4 flex flex-col rounded-lg mb-6 font-bold text-sm text-dark">
          Fase aislación
        </div>
      )}
    </div>
  );
}
