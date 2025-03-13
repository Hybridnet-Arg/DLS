'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const generarMeses = (fechaInicio, fechaFin) => {
  if (!fechaInicio || !fechaFin) return null;

  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];
  let [startYear, startMonth] = fechaInicio.split('-').map(Number);
  let [endYear, endMonth] = fechaFin.split('-').map(Number);

  const resultado = {};
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  while (
    startYear < endYear ||
    (startYear === endYear && startMonth <= endMonth)
  ) {
    const anio = startYear;
    const mes = meses[startMonth - 1];

    resultado[anio] = [
      ...(resultado[anio] || []),
      {
        name: mes,
        active: currentYear === startYear && mes === meses[currentMonth],
        value: startMonth - 1,
      },
    ];

    startMonth++;
    if (startMonth > 12) {
      startMonth = 1;
      startYear++;
    }
  }
  return resultado;
};

const diasDesdeInicioMes = (fecha) => {
  const fechaDada = new Date(fecha);
  const primerDiaMes = new Date(
    fechaDada.getFullYear(),
    fechaDada.getMonth(),
    1
  );

  const diferenciaTiempo = fechaDada - primerDiaMes;
  return Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
};

const calcularAnchoEnPixeles = (dias) => {
  const anchoPorDia = 100 / 30; //1 mes = 100px
  const anchoTotal = anchoPorDia * dias;
  return anchoTotal;
};

export default function FechaCronograma({
  fechaInicio,
  fechaFin,
  ubicacionId,
  mostrarFechaActual = false,
}) {
  const router = useRouter();
  const mesesPorAño = generarMeses(fechaInicio, fechaFin);
  const diasDesdeElInicio = diasDesdeInicioMes(new Date().toISOString());
  const marginLeft = calcularAnchoEnPixeles(diasDesdeElInicio);

  const handleRedirectForecast = ({ mes, anio, diaInicio, diaFin }) => {
    router.push(
      `/cronograma/forecast-manual/ubicacion/${ubicacionId}?mes=${mes?.value}&anio=${anio}&diaInicio=${diaInicio ?? ''}&diaFin=${diaFin ?? ''}`
    );
  };

  if (!mesesPorAño) return null;
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
        {Object.entries(mesesPorAño).map(([anio, meses]) => (
          <div key={anio} className="flex flex-col ">
            <div className="bg-dark text-warning p-1 rounded-lg text-center text-sm mx-[1px]">
              <h2>AÑO {anio}</h2>
            </div>
            <div className="flex">
              {meses.map((mes, index) => (
                <button
                  key={mes?.name}
                  className="flex py-2 text-center"
                  style={{
                    width: `100px`,
                  }}
                  onClick={() => {
                    const diaInicio =
                      index === 0 ? new Date(fechaInicio).getUTCDate() : null;
                    const diaFin =
                      index === meses.length - 1
                        ? new Date(fechaFin).getUTCDate()
                        : null;

                    handleRedirectForecast({ mes, anio, diaInicio, diaFin });
                  }}
                >
                  <div className="bg-dark text-warning hover:bg-gray-700 p-1 rounded-lg w-full mx-[1px]">
                    <h3 className="text-sm">{mes?.name}</h3>
                  </div>
                  {mostrarFechaActual && (
                    <div
                      className={clsx({
                        [`active-radar-cronograma h-[90.5%] mt-7`]: mes?.active,
                      })}
                      style={{
                        marginLeft: mes?.active ? `${marginLeft}px` : `0px`,
                      }}
                    ></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
