import { DATE_FORMATS, LOCALE_TIME } from '@/constants';
import { compareDates } from '../../utils';
import Button from '@/components/ui/buttons/Button';

function PlanPozoItemDesc({ title = '', value = '' }) {
  return (
    <div className="pt-1">
      <h2 className="text-start text-sm px-2">{title}</h2>
      <div className="bg-dark text-yellow-400 py-2 rounded-lg flex-row justify-center items-end text-sm tracking-[0.3rem]">
        <h2 className="text-start text-sm px-4">{value}</h2>
      </div>
    </div>
  );
}

function PlanPozoFecha({ title, date }) {
  return (
    <div className="mt-2 font-semibold">
      <h2 className="mb-4 text-center text-xs uppercase">{title ?? '-'}</h2>
      <div className="bg-gray-300 p-3 my-[0.1rem] rounded-md">
        <p
          className={`text-[13px] text-center font-extralight py-[1px] ${!date ? 'opacity-50' : ''}`}
        >
          {date
            ? new Date(date).toLocaleDateString(
                LOCALE_TIME,
                DATE_FORMATS.DD_MM_YYYY
              )
            : 'DD/MM/AAAA'}
        </p>
        <p
          className={`text-xs text-center font-medium ${!date ? 'opacity-50' : ''}`}
        >
          {date
            ? new Date(date).toLocaleTimeString(LOCALE_TIME, DATE_FORMATS.HH_MM)
            : '00:00'}{' '}
          hs
        </p>
      </div>
    </div>
  );
}

export default function ControlDiagram({
  isLoading,
  planPozo,
  creadoEl,
  actualizadoEl,
  toggleEditMode,
  isEditingEnabled,
  handleUpdateDiagram = () => {},
}) {
  return (
    <>
      <div>
        <PlanPozoItemDesc
          title="Locación"
          value={planPozo?.perforador_locacion?.locacion?.nombre ?? '-'}
        />
      </div>
      <div className="flex">
        <div className="w-[40%]"></div>
        <div className="w-[60%]">
          <h2 className="text-center text-sm font-semibold text-gray-500">
            Fecha y hora
          </h2>
          <PlanPozoFecha date={planPozo?.fecha_inicio} title={'Inicio'} />
          <PlanPozoFecha date={new Date()} title={'Actual'} />
          <PlanPozoFecha date={planPozo?.fecha_fin} title={'Final'} />
        </div>
      </div>
      <div>
        {/* <button
          className="w-full mt-5 bg-gray-300 hover:bg-dark text-white py-3 rounded-lg font-bold text-base"
          onClick={toggleEditMode}
        >
          {isEditingEnabled ? 'Cancelar edición' : 'Habilitar edición'}
        </button> */}
        <Button
          loading={isLoading}
          className="w-full"
          labelStyles="text-base"
          onClick={handleUpdateDiagram}
          disabled={!isEditingEnabled}
        >
          {compareDates(creadoEl, actualizadoEl)
            ? 'Cargar diagrama'
            : 'Modificar diagrama'}
        </Button>
      </div>
    </>
  );
}
