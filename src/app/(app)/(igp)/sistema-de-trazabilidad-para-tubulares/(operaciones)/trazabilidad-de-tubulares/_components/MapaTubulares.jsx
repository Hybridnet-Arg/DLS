'use client';
import { clsx } from 'clsx';
import { Plus } from 'lucide-react';
import { Fragment, useState, useEffect } from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';
import { formatToDDMMYYYY } from '@/utils/formatters/date.formatter';
import { obtenerTubularesDestinos } from '@/services/tubularesMovimientos.service';
import {
  CONFIG,
  DESTINOS_TUBULARES,
  ESTADOS_BARRA_TUBULARES,
  ESTADOS_MOVIMIENTOS_TUBULARES,
  TIPOS_DOCUMENTO_TUBULARES,
} from '@/constants';
import FileViewer from '@/components/fileViewer/FileViewer';
import ScrapIcon from './icons/ScrapIcon';
import TallerIcon from './icons/TallerIcon';
import BaseTubularIcon from './icons/BaseTubularIcon';
import PerdidaEnPozoIcon from './icons/PerdidaEnPozoIcon';
import LocacionTubularIcon from './icons/LocacionTubularIcon';
import CrearTubularModal from './modals/CrearTubularModal';
import CrearMovimientoTubularModal from './modals/CrearMovimientoTubularModal';
import CargarPartidaInicialTubularModal from './modals/CargarPartidaInicialTubularModal';
import {
  RemitoRefIcon,
  TallyRefIcon,
  InformeRefIcon,
  CargarDocRefIcon,
} from './icons/referencias';
import CargarDocumentoMovimientoModal from './modals/CargarDocumentoMovimientoModal';
import OtroPerforadorIcon from './icons/OtroPerforadorIcon';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import CargarLocacionTubularModal from './modals/CargarLocacionTubularModal';

const ICONOS_TUBULARES = {
  LOCACIÓN: <LocacionTubularIcon height={40} width={40} />,
  TALLER: <TallerIcon height={40} width={40} />,
  BASE: <BaseTubularIcon height={40} width={40} />,
  'OTRO PERFORADOR': <OtroPerforadorIcon height={40} width={40} />,
  SCRAP: <ScrapIcon height={40} width={40} />,
  'PERDIDA EN POZO': <PerdidaEnPozoIcon height={40} width={40} />,
};

const ICONOS_DOCUMENTOS_TUBULARES = {
  [TIPOS_DOCUMENTO_TUBULARES.INFORME]: <InformeRefIcon />,
  [TIPOS_DOCUMENTO_TUBULARES.TALLY]: <TallyRefIcon />,
  [TIPOS_DOCUMENTO_TUBULARES.REMITO]: <RemitoRefIcon />,
};

const COLORES_ESTADO = {
  [ESTADOS_BARRA_TUBULARES.DESCARTE]: 'bg-red-700 text-white',
  [ESTADOS_BARRA_TUBULARES.INSPECCION]: 'bg-warning',
  [ESTADOS_BARRA_TUBULARES.OPERATIVAS]: 'bg-success text-white',
};

const MAX_COLUMNS_TUBULARES = 6;

export default function MapaTubulares({
  tubular,
  planPozo,
  perforadorLocaciones = [],
  onRefresh = () => {},
}) {
  const [destinos, setDestinos] = useState([]);
  const [movimiento, setMovimiento] = useState({});
  const [showCreateTubular, setShowCreateTubular] = useState(false);
  const [showCargarPartida, setShowCargarPartida] = useState(false);
  const [showCreateMovimientos, setShowCreateMovimientos] = useState(false);
  const [documentPath, setDocumentPath] = useState({});
  const [showDocuments, setShowDocuments] = useState(false);
  const [showCargarDocumento, setShowCargarDocumento] = useState(false);
  const [showUpdateTubular, setShowUpdateTubular] = useState(false);
  const [showDocumentosPendientes, setShowDocumentosPendientes] =
    useState(false);

  useEffect(() => {
    async function fetchTubularesDestino() {
      try {
        const destinosRaw = await obtenerTubularesDestinos();
        setDestinos(destinosRaw);
      } catch (error) {
        setDestinos([]);
      }
    }
    fetchTubularesDestino();
  }, []);

  const handleOnPlusClick = () => {
    if (!tubular?.id) setShowCreateTubular(true);
    else setShowCargarPartida(true);
  };

  const handleOnMovementClick = (movimientoRaw) => {
    if (!tubular?.plan_pozo_id) {
      setMovimiento(movimientoRaw);
      setShowUpdateTubular(true);
      return;
    }
    if (movimientoRaw?.tubulares_documentos?.length == 0) {
      return setShowDocumentosPendientes(true);
    }

    if (
      movimientoRaw?.tubulares_destino_id ===
      DESTINOS_TUBULARES.OTRO_PERFORADOR
    ) {
      return;
    }

    setShowCreateMovimientos(true);
    setMovimiento(movimientoRaw);
  };

  return (
    <Fragment>
      <div className="flex flex-1 gap-5 min-h-[4.5rem] max-h-[4.5rem] mb-5">
        {destinos?.length > 0 &&
          destinos?.map((destino) => (
            <div
              key={destino?.id}
              className="bg-backgroundGray rounded text-center font-semibold flex flex-col flex-1 items-center justify-center"
            >
              {destino?.nombre}
              {ICONOS_TUBULARES?.[destino?.nombre?.toUpperCase()]}
            </div>
          ))}
      </div>
      <ArcherContainer
        strokeColor="gray"
        strokeWidth={1.3}
        strokeDasharray="5,5"
      >
        <div className="grid grid-cols-6 gap-2 relative">
          {tubular?.tubulares_movimientos?.map((tubularesMovimiento, index) => {
            const prestamos =
              tubularesMovimiento?.tubulares_movimientos_prestamos_destino?.reduce(
                (acc, prestamo) => acc + prestamo?.cantidad,
                0
              ) ?? 0;
            const distribucionTotal =
              tubularesMovimiento?.tubulares_movimientos_conexiones_origen?.reduce(
                (acc, conexion) => acc + conexion?.movimiento_destino?.cantidad,
                0
              ) ?? 0;

            const cantidadRaw = tubularesMovimiento?.cantidad ?? 0;
            const cantidad = cantidadRaw - distribucionTotal + prestamos;

            function getSourceAnchor(connection) {
              const indexRaw = index + 1;

              const isLastColumn = indexRaw % MAX_COLUMNS_TUBULARES === 0;

              if (isLastColumn) return 'bottom';
              const connectionIndex = tubular?.tubulares_movimientos?.findIndex(
                (mov) => mov.id === connection?.tubulares_movimiento_destino_id
              );
              if (connectionIndex > index + 1) return 'top';
              return 'right';
            }

            function getTargetAnchor(connection) {
              const indexRaw = index + 1;

              const isLastColumn = indexRaw % MAX_COLUMNS_TUBULARES === 0;
              if (isLastColumn) return 'top';

              const connectionIndex = tubular?.tubulares_movimientos?.findIndex(
                (mov) => mov.id === connection?.tubulares_movimiento_destino_id
              );
              if (connectionIndex > index + 1) return 'left';
              return 'left';
            }

            return (
              <ArcherElement
                id={`${tubularesMovimiento?.id}`}
                relations={
                  tubular?.tubulares_movimientos?.[index + 1]
                    ? tubularesMovimiento?.tubulares_movimientos_conexiones_origen?.map(
                        (conexion) => ({
                          targetId: `${conexion?.tubulares_movimiento_destino_id}`,
                          targetAnchor: getTargetAnchor(conexion),
                          sourceAnchor: getSourceAnchor(conexion),
                        })
                      )
                    : []
                }
                key={`${tubularesMovimiento?.id}-archer-element-${Math.random()}`}
              >
                {tubularesMovimiento?.tubular_id ? (
                  <div
                    className={clsx(
                      'shadow-dark-sm rounded-md text-center min-h-[4rem] my-10 w-[60%] mx-auto mb-5 items-center justify-center flex hover:cursor-pointer relative',
                      {
                        'bg-dark text-white':
                          !tubularesMovimiento?.tubulares_estado_barra_id,
                        [`${COLORES_ESTADO?.[tubularesMovimiento?.tubulares_estado_barra_id]} bg-red-100`]:
                          tubularesMovimiento?.tubulares_estado_barra_id &&
                          cantidad !== 0,
                        'bg-gray-400 text-white': cantidad === 0,
                      }
                    )}
                  >
                    <button
                      className="flex flex-col flex-1 items-center justify-center"
                      onClick={() =>
                        handleOnMovementClick({
                          ...tubularesMovimiento,
                          cantidad,
                        })
                      }
                    >
                      {tubularesMovimiento?.tubulares_destino_id ===
                        DESTINOS_TUBULARES.OTRO_PERFORADOR && (
                        <div className="text-xs font-bold text-black">
                          {
                            tubularesMovimiento
                              ?.tubulares_movimientos_prestamos_origen?.[0]
                              ?.movimiento_destino?.perforador?.nombre
                          }
                        </div>
                      )}
                      <p className="font-bold">{cantidad}</p>
                      <p className="text-xs">
                        {formatToDDMMYYYY(tubularesMovimiento?.fecha)}
                      </p>
                    </button>
                    <div className="relative flex flex-wrap space-x-5">
                      {tubularesMovimiento?.tubulares_documentos?.length > 0 &&
                        tubularesMovimiento?.tubulares_documentos?.map(
                          (documento, index) => (
                            <button
                              style={
                                index !== 0
                                  ? {
                                      transform: `translateX(${index - 1}rem)`,
                                    }
                                  : { transform: 'translateX(0rem)' }
                              }
                              key={documento?.id}
                              onClick={() => {
                                setDocumentPath(documento);
                                setShowDocuments(true);
                              }}
                              className="absolute left-[-6rem] top-[-3rem] transform -translate-y-1/2 rounded-full  w-7 h-7 flex items-center justify-center shadow-lg"
                            >
                              {ICONOS_DOCUMENTOS_TUBULARES?.[documento?.tipo]}
                            </button>
                          )
                        )}
                    </div>
                    {tubularesMovimiento?.estado ===
                      ESTADOS_MOVIMIENTOS_TUBULARES.DOCUMENTACION_PENDIENTE &&
                      tubular?.plan_pozo_id && (
                        <button
                          onClick={() => {
                            setMovimiento(tubularesMovimiento);
                            setShowCargarDocumento(true);
                          }}
                          className="absolute left-[-2rem] top-[2.3rem] transform -translate-y-1/2 rounded-full  w-7 h-7 flex items-center justify-center shadow-lg"
                        >
                          <CargarDocRefIcon />
                        </button>
                      )}
                  </div>
                ) : (
                  <div
                    className={clsx(
                      'shadow-dark-sm rounded-md text-center min-h-[4rem] my-10 w-[60%] mx-auto mb-5 relative bg-white'
                    )}
                  >
                    {index === 0 && (
                      <div className="flex justify-center items-center h-full">
                        <button
                          onClick={() => handleOnPlusClick()}
                          className={clsx(
                            'bg-white shadow-dark-sm p-2 rounded-full hover:bg-dark hover:text-warning z-10'
                          )}
                        >
                          <Plus size={15} className="font-bold" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </ArcherElement>
            );
          })}
        </div>
        <CargarLocacionTubularModal
          tubular={tubular}
          tubularesMovimientoId={movimiento?.id}
          planPozo={planPozo}
          initialValues={{
            perforador_locacion_id: perforadorLocaciones?.[0]?.id,
          }}
          perforadorLocaciones={perforadorLocaciones}
          isOpen={showUpdateTubular}
          onOk={() => setShowUpdateTubular(false)}
          onCancel={() => setShowUpdateTubular(false)}
          onRefresh={onRefresh}
        />
        <CrearTubularModal
          planPozo={planPozo}
          initialValues={{
            perforador_locacion_id: perforadorLocaciones?.[0]?.id,
          }}
          perforadorLocaciones={perforadorLocaciones}
          isOpen={showCreateTubular}
          onOk={() => setShowCreateTubular(false)}
          onCancel={() => setShowCreateTubular(false)}
          onRefresh={onRefresh}
        />
        <CargarPartidaInicialTubularModal
          isOpen={showCargarPartida}
          tubular={tubular}
          onCancel={() => setShowCargarPartida(false)}
          onRefresh={onRefresh}
        />
        <CrearMovimientoTubularModal
          isOpen={showCreateMovimientos}
          tubular={tubular}
          onCancel={() => setShowCreateMovimientos(false)}
          onRefresh={onRefresh}
          tubularesMovimiento={movimiento}
          destinos={destinos}
          initialValues={{
            disponible: movimiento?.cantidad,
          }}
        />
        <CargarDocumentoMovimientoModal
          isOpen={showCargarDocumento}
          tubularesMovimientoId={movimiento?.id}
          onCancel={() => setShowCargarDocumento(false)}
          onRefresh={onRefresh}
        />
        <FileViewer
          isOpen={showDocuments}
          onClose={() => setShowDocuments(false)}
          filePath={`${CONFIG.BASE_URL}${documentPath?.ruta}`}
        >
          <div className="h-10 w-10 top-20 left-7 absolute">
            {ICONOS_DOCUMENTOS_TUBULARES?.[documentPath?.tipo]}
          </div>
        </FileViewer>
        <ModalDialog
          isOpen={showDocumentosPendientes}
          onCancel={() => setShowDocumentosPendientes(false)}
          status={'warning'}
          autoclose
        >
          <h1 className="text-center font-semibold text-xl">
            Tiene documentos pendientes
          </h1>
          <p className="text-center font-medium text-sm mb-4 mt-1">
            Debe subir los documentos pendientes para poder continuar.
          </p>
        </ModalDialog>
      </ArcherContainer>
    </Fragment>
  );
}
