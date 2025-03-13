import clsx from 'clsx';
import {
  obtenerColorBobina,
  obtenerLargoDelCable,
  obtenerTotalCortesEnMetros,
} from '../../_helpers/cortes.helper';

const DEFAULT_CORTES = 26;

function MetersCard({
  title,
  value,
  measurement,
  className,
  getColor = () => {},
  disabled,
}) {
  return (
    <div className="grid grid-cols-5 gap-2">
      <div
        className={clsx(
          'col-span-2 rounded p-1 text-center',
          `bg-[${getColor && getColor()}]`,
          {
            'bg-[gray]': disabled,
            [className]: !disabled && className,
          }
        )}
      >
        <span className="font-extrabold">{value}</span>{' '}
        {measurement && (
          <span className="font-bold uppercase text-xs">{measurement}</span>
        )}
      </div>
      <div className="col-span-3 flex items-center">
        <h4 className="uppercase text-sm font-bold">{title}</h4>
      </div>
    </div>
  );
}

export default function MetrosDisponibles({ bobina }) {
  const largoCable = obtenerLargoDelCable({
    metrosCable: bobina?.diametro?.metros_cable,
    metrosDespliegue: bobina?.diametro?.metros_despliegue,
  });
  const cortes = largoCable
    ? Math.round(largoCable / bobina?.diametro?.largo_corte)
    : DEFAULT_CORTES;

  function getAvailableMeters() {
    if (!largoCable) return 0;
    const totalCuts = obtenerTotalCortesEnMetros(bobina?.cortes_cable);
    const availableCuts = largoCable - totalCuts;
    return availableCuts;
  }

  function getAvailableCuts() {
    if (!largoCable) return 0;
    const availableCuts = cortes - (bobina?.cortes_cable?.length || 0);
    return availableCuts > 0 ? availableCuts : 0;
  }

  return (
    <div className="grid grid-cols-8 gap-3 pt-10">
      <div className="flex flex-col col-span-7">
        <div className="flex flex-col">
          <div className="w-[65%] shadow border rounded-xl p-2">
            <div className="flex flex-col gap-2">
              <MetersCard
                title={'Cantidad de cable cortado'}
                value={obtenerTotalCortesEnMetros(bobina?.cortes_cable)}
                measurement={'m'}
                className={'bg-gray-500'}
                disabled={!bobina?.id}
              />
              <MetersCard
                title={'Cantidad de cable disponible'}
                value={getAvailableMeters()}
                measurement={'m'}
                className={'bg-gray-300'}
                disabled={!bobina?.id}
              />
              <MetersCard
                title="Tramos estimados disponibles"
                value={getAvailableCuts()}
                getColor={() =>
                  obtenerColorBobina({
                    largoCable,
                    cortesCable: bobina?.cortes_cable,
                  })
                }
                disabled={!bobina?.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
