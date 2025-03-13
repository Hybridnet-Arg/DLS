'use client';
import { Fragment, useEffect, useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import usePerforadoresStore from '@/store/perforadores.store';
import { usePlanPozoStore } from '@/store/planPozo.store';
import { getAllPlanesPozo } from '@/services/planesPozo.services';
import {
  getAllPerforadores,
  guardarPerforadorSeleccionado,
  obtenerPerforadorSeleccionado,
} from '@/services/perforadores.services';

export default function SelectorPerforadores({
  showAccess = true,
  showAll = false,
  handleSelect = () => {},
}) {
  const { setPlanPozo, setIsLoading } = usePlanPozoStore();
  const { perforadores, seleccionarPerforador, perforadorSeleccionado } =
    usePerforadoresStore();
  const [perforadoresApi, setPerforadoresApi] = useState([]);
  const [existePerforadoresNeuquen, setExistePerforadoresNeuquen] =
    useState(false);
  const [existePerforadoresComodoro, setExistePerforadoresComodoro] =
    useState(false);
  const [perforadorSeleccionadoApi, setPerforadorSeleccionadoApi] =
    useState(null);

  function verificarExistenciaDePerforadores(ubicacionId) {
    const array1 = perforadores;
    const array2 = perforadoresApi;

    const idsPerforadores = new Set(
      array2
        .filter((perforador) => perforador.ubicacion?.id === ubicacionId)
        .map((perforador) => parseInt(perforador.nombre_clave))
    );

    const perforadoresFiltrados = array1
      .filter((perforador) =>
        idsPerforadores.has(parseInt(perforador.idPerforador))
      )
      .filter(
        (perforador, posicion, self) =>
          posicion ===
          self.findIndex((t) => t.idPerforador === perforador.idPerforador)
      )
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
    return perforadoresFiltrados;
  }

  useEffect(() => {
    const obtenerPerforadoresDesdeApi = async () => {
      setIsLoading(true);
      try {
        const data = await getAllPerforadores({
          deshabilitado: false,
        });
        setPerforadoresApi(data.perforadores);
      } catch (error) {
        setPerforadoresApi([]);
      }
    };
    const obtenerPerforadoreSeleccionadoRq = async () => {
      setIsLoading(true);
      try {
        const data = await obtenerPerforadorSeleccionado();
        setPerforadorSeleccionadoApi(data.perforador);
        obtenerPerforadoresDesdeApi();
      } catch (error) {
        setPerforadorSeleccionadoApi(null);
        obtenerPerforadoresDesdeApi();
      }
    };
    obtenerPerforadoreSeleccionadoRq();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const perforadoresFiltradosNeuquen = verificarExistenciaDePerforadores(1);
    const perforadoresFiltradosComodoro = verificarExistenciaDePerforadores(2);

    if (perforadoresFiltradosNeuquen.length) {
      setExistePerforadoresNeuquen(true);
      if (perforadorSeleccionadoApi) {
        const perfSeleccionado = perforadoresFiltradosNeuquen.find((item) => {
          return (
            parseInt(item.idPerforador, 10) ===
              perforadorSeleccionadoApi.numero && item?.nombre === item?.nombre
          );
        });

        if (perfSeleccionado) {
          handleSelect(perfSeleccionado);
          seleccionarPerforador(perfSeleccionado);
        }
      }
    }
    if (perforadoresFiltradosComodoro.length > 0) {
      setExistePerforadoresComodoro(true);
      if (perforadorSeleccionadoApi) {
        const perfSeleccionado = perforadoresFiltradosComodoro.find((item) => {
          return (
            parseInt(item.idPerforador, 10) ===
              perforadorSeleccionadoApi.numero &&
            perforadorSeleccionadoApi.numero &&
            item?.nombre === item?.nombre
          );
        });
        if (perfSeleccionado) {
          handleSelect(perfSeleccionado);
          seleccionarPerforador(perfSeleccionado);
        }
      }
    }
  }, [perforadoresApi]);

  useEffect(() => {
    const obtenerPlanPozo = async () => {
      setIsLoading(true);
      try {
        const { planesPozo } = await getAllPlanesPozo({
          numero_perforador: perforadorSeleccionado?.idPerforador,
        });

        const planPozo = planesPozo?.[0];
        const pozoActivo = planesPozo?.[0].pozos?.[0];

        setPlanPozo(planPozo, pozoActivo);
      } catch (error) {
        setPlanPozo({});
        setIsLoading(false);
      }
    };
    if (perforadorSeleccionado) obtenerPlanPozo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perforadorSeleccionado]);

  const handleButtonClick = async (perforador) => {
    handleSelect(perforador);
    seleccionarPerforador(perforador);

    if (!perforador?.idPerforador) return;
    await guardarPerforadorSeleccionado({
      perforadorNumero: perforador.idPerforador,
      perforadorNombre: perforador?.nombre,
    });
  };

  function renderPerforadores(perforadores = []) {
    return perforadores?.map((driller) => (
      <button
        key={driller?.idPerforador}
        className={`block text-sm w-full px-4 py-2 rounded text-black font-medium tracking-[0.1rem] ${perforadorSeleccionado?.idPerforador === driller.idPerforador ? 'bg-[#27B433]' : 'bg-[#35C944] opacity-80'} hover:opacity-100 focus:outline-none hover:shadow-md hover:shadow-gray-900`}
        onClick={() => handleButtonClick(driller)}
      >
        {`${driller?.nombre} ${showAccess ? '(' + driller?.acceso + ')' : ''}`}
      </button>
    ));
  }

  function renderPerforadoresPorProvincia(ubicacionId) {
    const perforadoresFiltrados =
      verificarExistenciaDePerforadores(ubicacionId);
    return renderPerforadores(perforadoresFiltrados);
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-dark hover:text-yellow-400 py-3 bg-dark text-yellow-400 p-2 rounded-md tracking-[0.2rem] data-[active]:bg-dark data-[state=open]:bg-dark">
            {perforadorSeleccionado?.nombre}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {perforadores?.length > 0 ? (
              <Fragment>
                <div className="flex space-x-2 p-1 bg-gray-200 shadow-lg">
                  {existePerforadoresNeuquen && (
                    <div className="bg-white rounded-md flex-grow min-w-0">
                      <h1 className="bg-gray-400 text-xs px-[4rem] py-3 rounded-t-md truncate text-white uppercase">
                        Neuquén
                      </h1>
                      <div className="px-2 flex flex-col space-y-5 py-3">
                        {showAll && (
                          <button
                            className={`block text-sm w-full px-4 py-2 rounded text-warning font-medium tracking-[0.1rem] bg-dark hover:opacity-100 focus:outline-none hover:shadow-md hover:shadow-gray-900`}
                            onClick={() =>
                              handleButtonClick({
                                idPerforador: null,
                                nombre: 'TODOS',
                                ubicacion_id: 1,
                              })
                            }
                          >
                            TODOS
                          </button>
                        )}
                        {renderPerforadoresPorProvincia(1)}
                      </div>
                    </div>
                  )}
                  {existePerforadoresComodoro && (
                    <div className="bg-white rounded-md flex-grow min-w-0">
                      <h1 className="bg-gray-400 text-xs px-5 py-3 rounded-t-md truncate text-white uppercase">
                        Comodoro Rivadavia
                      </h1>
                      <div className="px-2 flex flex-col space-y-5 py-3">
                        {showAll && (
                          <button
                            className={`block text-sm w-full px-4 py-2 rounded text-warning font-medium tracking-[0.1rem] bg-dark hover:opacity-100 focus:outline-none hover:shadow-md hover:shadow-gray-900`}
                            onClick={() =>
                              handleButtonClick({
                                idPerforador: null,
                                nombre: 'TODOS',
                                ubicacion_id: 2,
                              })
                            }
                          >
                            TODOS
                          </button>
                        )}
                        {renderPerforadoresPorProvincia(2)}
                      </div>
                    </div>
                  )}
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="flex space-x-2 p-1 bg-gray-200 shadow-lg">
                  <div className="bg-white rounded-md flex-grow min-w-0">
                    <h1 className="text-base text-start text-center px-5 py-2">
                      <b> Acceso denegado:</b> No cuentas con los permisos
                      necesarios
                    </h1>
                  </div>
                </div>
              </Fragment>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
