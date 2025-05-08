import clsx from 'clsx';
import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { getDayNameInSpanish } from '@/utils/formatters/date.formatter';
import DTMTipoB from '../icons/DTMTipoB';
import DTMTipoA from '../icons/DTMTipoA';
import WalkingTipoB from '../icons/WalkingTipoB';
import WalkingTipoA from '../icons/WalkingTipoA';
import CrearActividadesModal from '../modals/CrearActividadesModal';
import EliminarPlanificacionModal from '../modals/EliminarPlanificacionModal';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/shadcn/tooltip';

function PlanificacionPerforadorCard({
  disabled,
  tareaForecast,
  planificacionArea,
  areas,
  onReload = () => {},
}) {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  if (
    !planificacionArea?.planificacion_actividades ||
    planificacionArea?.planificacion_actividades?.length === 0
  ) {
    return (
      <div className="bg-white p-2 min-h-[9rem] rounded-lg flex items-center justify-center">
        <button
          disabled={disabled}
          onClick={() => setShowModal(true)}
          className={clsx('bg-white shadow-dark-sm p-1 rounded-full  ', {
            'cursor-not-allowed opacity-50': disabled,
            'hover:opacity-60': !disabled,
          })}
        >
          <Plus size={20} />
        </button>
        <CrearActividadesModal
          showModal={showModal}
          setShowModal={setShowModal}
          tareaForecast={tareaForecast}
          planificacionArea={planificacionArea}
          planificacionActividades={
            areas.find((area) => area?.id === planificacionArea?.id)
              ?.planificacion_actividades
          }
          onFinish={onReload}
        />
      </div>
    );
  }

  const nota =
    tareaForecast?.planificacion_notas?.find(
      (nota) => nota?.planificacion_area_id === planificacionArea?.id
    )?.nota ?? '-';

  return (
    <div className="bg-white px-2 pb-2 min-h-[9rem] max-h-[9rem] overflow-y-auto rounded-lg flex flex-col justify-between">
      <div className="self-end">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <button
                className="bg-gray-500 hover:bg-dark p-1 rounded-full me-1"
                onClick={() => setShowEditModal(true)}
              >
                <Pencil size={12} color="white" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Editar planificación</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <button
                className="bg-gray-500 hover:bg-dark p-1 rounded-full"
                onClick={() => setShowRemoveModal(true)}
              >
                <Trash2 size={12} color="white" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Eliminar planificación</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ul>
        {planificacionArea?.planificacion_actividades?.map((actividad) => (
          <li key={`actividad_${actividad?.id}`} className="mb-1 text-xs">
            - {actividad?.nombre}
          </li>
        ))}
      </ul>
      <div className="text-xs border-t border-black">
        <p className="py-1 mb-0">Nota:</p>
        {nota}
      </div>
      <EliminarPlanificacionModal
        showModal={showRemoveModal}
        setShowModal={setShowRemoveModal}
        tareaForecast={tareaForecast}
        planificacionActividades={planificacionArea?.planificacion_actividades}
        onFinish={onReload}
      />
      <CrearActividadesModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        tareaForecast={tareaForecast}
        planificacionArea={planificacionArea}
        planificacionActividades={
          areas.find((area) => area?.id === planificacionArea?.id)
            ?.planificacion_actividades
        }
        initialValues={{
          planificacion_actividades:
            planificacionArea?.planificacion_actividades,
          nota,
        }}
        onFinish={onReload}
      />
    </div>
  );
}

export default function PlanificacionPerforadorDiaria({
  index,
  tareaForecast,
  areas = [],
  onReload = () => {},
}) {
  const obtenerTipoTareaForecast = (tarea) => {
    const nombreClave = tarea?.tipo_tarea_forecast?.nombre_clave;
    const tipo = tarea?.tipo_tarea_forecast?.tipo;
    const esTipoA = tipo === 'A';

    switch (nombreClave) {
      case 'WS':
        if (esTipoA) return <WalkingTipoA />;
        return <WalkingTipoB />;
      case 'DTM':
        if (esTipoA) return <DTMTipoA />;
        return <DTMTipoB />;
      default:
        return (
          <div
            className={clsx(
              'text-center h-[32px] rounded flex items-center justify-center',
              {
                'bg-[#85736a]': nombreClave === 'G' && esTipoA,
                'bg-[#6A5144]': nombreClave === 'I' && esTipoA,
                'bg-[#28170E]': nombreClave === 'A' && esTipoA,
                'bg-warning': !esTipoA,
              }
            )}
          >
            <span
              className={clsx('text-xs', {
                'text-dark': !esTipoA,
                'text-white': esTipoA,
              })}
            >
              {tarea?.tipo_tarea_forecast?.nombre}
            </span>
          </div>
        );
    }
  };

  return (
    <div key={index} className="flex flex-col flex-1">
      <div
        className={clsx(
          'bg-gray-400 text-center py-1 rounded mb-1 flex items-center justify-center'
        )}
      >
        <span className="text-white text-sm uppercase">
          {getDayNameInSpanish(tareaForecast?.fecha)}
        </span>
        <span className="ms-2 bg-gray-100 w-4 h-4 rounded-full text-xs flex items-center justify-center">
          {new Date(tareaForecast?.fecha).getDate()}
        </span>
      </div>
      {obtenerTipoTareaForecast(tareaForecast)}
      <div className="space-y-2 mt-1">
        {tareaForecast?.areas?.map((area) => (
          <PlanificacionPerforadorCard
            key={`planificacion_area_${area?.id}`}
            tareaForecast={tareaForecast}
            planificacionArea={area}
            areas={areas}
            onReload={onReload}
          />
        ))}
      </div>
    </div>
  );
}
