'use client';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { Loader, Power } from 'lucide-react';
import { CANTIDAD_POZOS_MAX } from '@/constants';

const MAX_DIAS_SIN_MOVIMIENTO = 5;

function calcularDiferenciaDias(current, next) {
  const fechaFinCurrent = new Date(current?.fecha_fin);
  const fechaInicioNext = new Date(next?.fecha_inicio);

  if (isNaN(fechaFinCurrent) || isNaN(fechaInicioNext)) {
    return;
  }

  const diferenciaMilisegundos = fechaInicioNext - fechaFinCurrent;
  const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

  return diferenciaDias;
}

export default function LocacionPerforadorCronograma({
  locacionPerforadorCronograma,
  locacionesPerforadorCronograma,
  index,
  fechaInicioCronograma,
  fechaFinCronograma,
}) {
  const [isLoadingOnOff] = useState(false);
  const [intervalo, setIntervalo] = useState(null);
  const [anchoContenedor, setAnchoContenedor] = useState(0);
  const [marginLeftContenedor, setMarginLeftContenedor] = useState(0);

  useEffect(() => {
    calcularAnchoContenedorLocacion();
    calcularMarginPrimeraLocacion();
  }, [index, locacionesPerforadorCronograma]);

  const calcularDiferenciaEnDias = (fechaInicio, fechaFin) => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    const diferenciaMs = fin - inicio;
    const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

    return diferenciaDias;
  };

  const primerDiaDelMes = (fecha) => {
    const fechaObj = new Date(fecha);
    fechaObj.setUTCDate(1);
    return fechaObj.toISOString();
  };

  const calcularAnchoEnPixeles = (dias) => {
    const anchoPorDia = 100 / 30; //1 mes = 100px
    const anchoTotal = anchoPorDia * dias;
    return anchoTotal;
  };

  const calcularAnchoContenedorLocacion = () => {
    const dias = calcularDiferenciaEnDias(
      locacionPerforadorCronograma.fecha_inicio,
      locacionPerforadorCronograma.fecha_fin
    );
    const ancho = calcularAnchoEnPixeles(dias);
    setAnchoContenedor(ancho);
  };

  const calcularMarginPrimeraLocacion = () => {
    if (index === 0) {
      const dias = calcularDiferenciaEnDias(
        primerDiaDelMes(fechaInicioCronograma),
        locacionPerforadorCronograma.fecha_inicio
      );
      if (dias > 0) {
        const margenEnPixeles = calcularAnchoEnPixeles(dias);
        setMarginLeftContenedor(margenEnPixeles);
      }
    }
  };

  return (
    <div className="flex h-full">
      {locacionPerforadorCronograma.tipo === 'LOCACION' && (
        <div
          className={clsx(`bg-[#6D7E8C] p-1 rounded-lg flex flex-col`)}
          style={{
            width: `${anchoContenedor}px`,
            marginLeft: `${marginLeftContenedor}px`,
            height: '100%',
          }}
        >
          <div
            className="text-xs bg-white p-0.5 rounded-lg mb-2 flex-grow flex items-center justify-center"
            style={{ flexBasis: '70%' }}
          >
            {locacionPerforadorCronograma?.locacion?.nombre}
          </div>
          <div
            className="flex flex-nowrap gap-0.5 w-full"
            style={{ flexBasis: '30%' }}
          >
            {Array.from(
              {
                length: locacionPerforadorCronograma?.cantidad_pozos,
              },
              (_, index) => (
                <div
                  key={index}
                  className={clsx(
                    'bg-white rounded-lg text-xs flex-1 flex items-center justify-center'
                  )}
                >
                  {index + 1}
                </div>
              )
            )}
          </div>
        </div>
      )}
      {locacionPerforadorCronograma.tipo === 'DTM' && (
        <div
          className={clsx(
            'bg-danger rounded-lg flex justify-center items-center'
          )}
          style={{
            width: `${anchoContenedor}px`,
            marginLeft: `${0}px`,
          }}
        >
          {isLoadingOnOff ? (
            <Loader size={24} className="animate-spin text-white px-1" />
          ) : (
            <Power size={23} className="text-white px-1" />
          )}
        </div>
      )}
    </div>
  );
}
