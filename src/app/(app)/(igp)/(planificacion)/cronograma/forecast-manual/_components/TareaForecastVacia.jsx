import clsx from 'clsx';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCronogramaStore } from '@/store/cronograma.store';
import CrearTareaForecastModal from './modals/CrearTareaForecastModal';

export default function TareaForecastVacia({
  fecha,
  perforadorForecast,
  tiposTareasForecast,
  disabled,
  onReload = () => {},
  expandibleDays,
}) {
  const { addTareaForescastPendiente, removeTareaForescastPendiente } =
    useCronogramaStore();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;

    if (!isChecked) {
      return removeTareaForescastPendiente(fecha);
    }

    addTareaForescastPendiente({
      fecha,
      perforador_forecast_id: perforadorForecast?.id,
    });
  };

  return (
    <div
      className={clsx('relative bg-backgroundGray rounded', {
        'px-1 py-4': !expandibleDays,
        'px-[2px] py-[0.4rem]': expandibleDays,
        'cursor-not-allowed bg-gray-500':
          !perforadorForecast?.perforador_id || disabled,
      })}
    >
      {(perforadorForecast?.perforador_id || disabled) && (
        <div className={clsx('absolute right-0', {
          'top-0': !expandibleDays,
          'top-[-6]': expandibleDays,
        })}>
          <input
            type="checkbox"
            id="checkbox"
            className="form-checkbox h-3 w-4 text-warning cursor-pointer"
            onChange={(event) => handleCheckboxChange(event)}
          />
        </div>
      )}
      <button
        disabled={!perforadorForecast?.perforador_id || disabled}
        onClick={() => setShowCreateModal(true)}
        className={clsx('bg-white shadow-dark-sm p-1 rounded-full', {
          'cursor-not-allowed opacity-50':
            !perforadorForecast?.perforador_id || disabled,
          'hover:bg-dark hover:text-warning': perforadorForecast?.perforador_id,
        })}
      >
        <Plus size={10} />
      </button>
      <CrearTareaForecastModal
        fecha={fecha}
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
        perforador_forecast_id={perforadorForecast?.id}
        tiposTareasForecast={tiposTareasForecast ?? []}
        onFinish={onReload}
      />
    </div>
  );
}
