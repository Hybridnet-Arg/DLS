import BobinaIcon from './BobinaIcon';
import {
  obtenerColorBobina,
  obtenerLargoDelCable,
  obtenerTotalCortesEnMetros,
} from '../../_helpers/cortes.helper';
import Corte from './Corte';
import { calcularPorcentaje } from '@/utils/formatters/percentage.formatter';
import MetrosDisponibles from './MetrosDisponibles';

const ETAPAS_CORTE = 3;
const DEFAULT_CORTES = 26;

export default function MapaCortes({ bobina, cableDesgastado }) {
  const largoCable = obtenerLargoDelCable({
    metrosCable: bobina?.diametro?.metros_cable,
    metrosDespliegue: bobina?.diametro?.metros_despliegue,
  });

  const totalCortes = obtenerTotalCortesEnMetros(bobina?.cortes_cable);
  const totalRemanente = calcularPorcentaje(
    largoCable - totalCortes,
    bobina?.diametro?.largo_corte,
    '%',
    true
  );

  const cortes = largoCable ? bobina?.cortes_cable?.length + 1 : DEFAULT_CORTES;
  return (
    <div className="grid grid-cols-8 gap-3 ">
      <div>
        <h2 className="font-medium col-span-1 mt-[1.5rem]">Mapa de cortes</h2>
        <h2 className="font-medium col-span-1 mt-[5rem]">
          Metros cortados y disponibles
        </h2>
      </div>
      <div className="flex flex-col col-span-7">
        <div className="flex">
          <div className="flex-1 space-y-2">
            <div
              id="cortes"
              className="flex flex-1 gap-[2px] me-[2px] relative"
            >
              {Array.from(
                {
                  length: cortes,
                },
                (_, index) => ({ id: index })
              ).map((item) => (
                <Corte
                  key={item?.id}
                  item={item}
                  cortesCable={bobina?.cortes_cable}
                  cableDesgastado={cableDesgastado}
                  bobina={bobina}
                  totalRemanente={totalRemanente}
                />
              ))}
              <div
                className="absolute top-12 left-0 flex flex-col items-center"
                style={{
                  left: 0,
                  transform: 'translateX(-50%)',
                }}
              >
                <div
                  id="up-arrow"
                  className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-black"
                ></div>
              </div>
              <div
                className="absolute top-12 right-0 flex flex-col items-center"
                style={{
                  right: -13,
                  transform: 'translateX(-50%)',
                }}
              >
                <div
                  id="up-arrow"
                  className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-black"
                ></div>
              </div>
              <div id="lines">
                <div id="left-line">
                  <div
                    className="absolute top-1/3 left-1/3 h-[40px] w-[2px] bg-gray-500"
                    style={{ transform: 'translateX(-50%)' }}
                  ></div>
                  <div
                    className="absolute top-12 left-1/3 flex flex-col items-center"
                    style={{ transform: 'translateX(-50%)' }}
                  >
                    <span className="mt-2 text-gray-700 text-xs">
                      {largoCable
                        ? `${largoCable * (1 / ETAPAS_CORTE)} m`
                        : 'N/A'}
                    </span>
                  </div>
                </div>
                <div id="rigth-line">
                  <div
                    className="absolute top-1/3 left-2/3 h-[40px] w-[2px] bg-gray-500"
                    style={{ transform: 'translateX(-50%)' }}
                  ></div>
                  <div
                    className="absolute top-12 left-2/3 flex flex-col items-center"
                    style={{ transform: 'translateX(-50%)' }}
                  >
                    <span className="mt-2 text-gray-700 text-xs">
                      {largoCable
                        ? `${largoCable * (2 / ETAPAS_CORTE)} m`
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">0 mts</p>
              </div>
              <div>
                <p className="font-semibold text-end">{largoCable ?? 0} mts</p>
              </div>
            </div>
            <MetrosDisponibles
              bobina={bobina}
              cableDesgastado={cableDesgastado}
            />
          </div>
          <BobinaIcon
            width={200}
            height={200}
            title={
              bobina?.diametro?.metros_cable
                ? `${bobina?.diametro?.metros_cable} m`
                : 'N/A'
            }
            color={obtenerColorBobina({
              largoCable,
              cortesCable: bobina?.cortes_cable,
            })}
          />
        </div>
      </div>
    </div>
  );
}
