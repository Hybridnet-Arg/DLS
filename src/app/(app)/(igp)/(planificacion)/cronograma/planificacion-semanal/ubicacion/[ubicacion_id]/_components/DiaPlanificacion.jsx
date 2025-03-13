import clsx from 'clsx';

export default function DiaPlanificacion({
  selectedColumn,
  setSelectedColumn = () => {},
  planificacion,
}) {
  return (
    <div className="flex flex-col flex-1">
      <div
        className={clsx(
          'bg-gray-400 text-center py-1 rounded mb-1 flex items-center justify-center',
          {
            'bg-gray-600': selectedColumn?.dia === planificacion?.dia,
          }
        )}
      >
        <span className="text-white text-sm uppercase">
          {planificacion?.nombre}
        </span>
        <span className="ms-2 bg-gray-100 w-4 h-4 rounded-full text-xs flex items-center justify-center">
          {planificacion?.dia}
        </span>
      </div>
      <button
        hidden={selectedColumn}
        onClick={() => setSelectedColumn(planificacion)}
        className={clsx(
          'bg-white py-2 rounded hover:cursor-pointer hover:bg-gray-400'
        )}
      >
        {planificacion.planificaciones.map((item, index) => (
          <div
            key={`${item?.id}-actividades-count-${index}`}
            className="border border-gray-400 p-2 m-4 bg-white rounded text-center"
          >
            {item?.actividad_count ?? 0}
          </div>
        ))}
      </button>
    </div>
  );
}
