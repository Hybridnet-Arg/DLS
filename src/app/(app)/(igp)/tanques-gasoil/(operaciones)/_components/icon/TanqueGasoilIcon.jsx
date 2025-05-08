import { useState, useEffect } from 'react';
import { formatNumber } from '@/utils/formatters/currency.formatter';

const MAX_HEIGHT_TANQUE = 150.25;

const obtenerPorcentajePorAltura = ({ value, min, max }) => {
  const percent = (value - min) / (max - min);

  const height = percent * MAX_HEIGHT_TANQUE;
  return height;
};

const obtenerEjeYTanque = ({ value, min, max, alert, critical }) => {
  const calcularDistanciaExtra = (altura) => {
    if (altura >= 76) return 42;
    if (altura >= 50) return 20;
    if (altura >= 35) return 5;
    return 0;
  };
  const alturaVisible = obtenerPorcentajePorAltura({
    value,
    min,
    max,
    alert,
    critical,
  });
  const extra = calcularDistanciaExtra(alturaVisible);

  return MAX_HEIGHT_TANQUE - alturaVisible + extra;
};

function obtenerColorTanque({ value, min, max, alert, critical }) {
  const percentage = ((value - min) / (max - min)) * 100;
  const percentageAlert = ((alert - min) / (max - min)) * 100;
  const percentageCritical = ((critical - min) / (max - min)) * 100;

  if (percentage <= percentageCritical) {
    return {
      a: '#76111A',
      b: '#9B1723',
      c: '#FF4D4F',
    };
  }
  if (percentage <= percentageAlert) {
    return {
      a: '#E8D22F',
      b: '#F0C130',
      c: '#E68F2E',
    };
  }
  const success = {
    a: '#30B632',
    b: '#C1D030',
    c: '#DE6F2D',
  };
  return success;
}

function obtenerColorTanqueDesactivado() {
  const success = {
    a: '#6d6d6d',
    b: '#646464',
    c: '#5f5f5f',
    d: '#5f5f5f',
  };
  return success;
}

export default function TanqueGasoilIcon({
  max,
  min,
  value,
  id,
  alert,
  critical,
  active,
  ...props
}) {
  const [tanque, setTanque] = useState({});

  useEffect(() => {
    function obtenerDatosTanque() {
      const estado = active
        ? obtenerColorTanque({ value, min, max, alert, critical })
        : obtenerColorTanqueDesactivado();
      const ejeY = obtenerEjeYTanque({ value, min, max, alert, critical });
      const porcentajeAltura = obtenerPorcentajePorAltura({
        value,
        min,
        max,
        alert,
        critical,
      });

      setTanque({
        estado,
        ejeY,
        porcentajeAltura,
      });
    }
    obtenerDatosTanque();
    return () => {
      setTanque({});
    };
  }, [max, min, value, active]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || '100%'}
      height={props.height || '100%'}
      viewBox="0 0 432 207"
      fill={'none'}
      {...props}
    >
      <g filter="url(#a)">
        <path
          fill="url(#b)"
          d="M49.755 35.086h246.147c24.419 31.214 24.419 97.389 0 124.857H49.755c-27.308-27.468-27.309-93.286 0-124.857Z"
        />
        <g filter="url(#c)">
          <path
            id="relleno"
            clipPath={`url(#clipDinamico${id})`}
            fill={`url(#relleno_tanque_${id})`}
            d="M59.237 45.25h232.229c10.488 24.924 22.534 71-4.681 105H60.498c-17.74-15.5-24.998-72-1.26-105Z"
          />
        </g>
        <g filter="url(#e)">
          <path
            fill="url(#f)"
            d="M70.96 22.6h29.61v12.842s-14.802 3.924-29.61 0V22.6Z"
          />
        </g>
        <g filter="url(#g)">
          <path fill="url(#h)" d="M64.898 16.178h42.095v6.421H64.898z" />
        </g>
        <path fill="url(#i)" d="M65.613 14.752h2.14v1.427h-2.14z" />
        <path fill="url(#j)" d="M70.606 14.752h2.14v1.427h-2.14z" />
        <path fill="url(#k)" d="M84.875 14.752h2.14v1.427h-2.14z" />
        <path fill="url(#l)" d="M80.238 14.752h2.14v1.427h-2.14z" />
        <path fill="url(#m)" d="M75.242 14.752h2.14v1.427h-2.14z" />
        <path fill="url(#n)" d="M94.508 14.752h2.14v1.427h-2.14z" />
        <path fill="url(#o)" d="M89.871 14.752h2.14v1.427h-2.14z" />
        <path fill="url(#p)" d="M99.5 14.752h2.14v1.427H99.5z" />
        <path fill="url(#q)" d="M104.137 14.752h2.14v1.427h-2.14z" />
        <g filter="url(#r)">
          <path fill="#737373" d="M75.5 154.375h17.813v24.375H75.5z" />
        </g>
        <g filter="url(#s)">
          <path fill="#737373" d="M73.625 178.75h21.563v2.813H73.625z" />
        </g>
        <g filter="url(#t)">
          <path fill="#737373" d="M251.75 154.375h17.813v24.375H251.75z" />
        </g>
        <g filter="url(#u)">
          <path fill="#737373" d="M250.402 178.701h21.404v2.861h-21.404z" />
        </g>
        <g filter="url(#v)">
          <path fill="#737373" d="M163.625 154.375h17.813v24.375h-17.813z" />
        </g>
        <g filter="url(#w)">
          <path fill="#737373" d="M162.285 178.701h21.404v2.861h-21.404z" />
        </g>
        <path
          stroke={active ? '#CD1E2C' : tanque?.estado?.d}
          strokeDasharray="3.57 3.57"
          strokeWidth={1.784}
          d="m60 149.358 338.136.065"
        />

        <path
          id="max-line"
          stroke={active ? '#25303B' : tanque?.estado?.d}
          strokeDasharray="3.57 3.57"
          strokeWidth={2}
          d="M59 44.25h348"
        />
        <path
          stroke={active ? '#25303B' : tanque?.estado?.d}
          strokeDasharray="3.57 3.57"
          strokeWidth={2}
          d="M59 0h348"
          transform={`translate(0, ${tanque?.ejeY})`}
        />
        <polyline
          points="0,0 12,-8 12,8"
          fill={active ? '#000' : tanque?.estado?.d}
          stroke={active ? '#000' : tanque?.estado?.d}
          strokeWidth="2"
          transform={`translate(407, ${tanque?.ejeY})`}
        />
        <text
          x="77.5%"
          y={20}
          fontSize="20"
          fontWeight="bold"
          fill={active ? '#25303B' : tanque?.estado?.d}
          transform={`translate(0, ${tanque?.ejeY})`}
        >
          {formatNumber({ value: value })}
        </text>
        <text
          x="87%"
          y="79%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill={active ? '#CD1E2C' : tanque?.estado?.d}
          fontSize="16"
          fontWeight="500"
          fontFamily="Arial"
        >
          {formatNumber({ value: min })} lts
        </text>
        <text
          x="81%"
          y="15%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill={active ? '#28B432' : tanque?.estado?.d}
          fontSize="16"
          fontWeight="500"
          fontFamily="Arial"
        >
          {formatNumber({ value: max })} lts
        </text>
      </g>
      <defs>
        <linearGradient
          id="b"
          x1={171.745}
          x2={171.745}
          y1={35.086}
          y2={159.943}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A1A1A1" />
          <stop offset={0.188} stopColor="#CCC" />
          <stop offset={0.443} stopColor="#D9D9D9" />
          <stop offset={1} stopColor="#484848" />
        </linearGradient>

        <defs>
          <clipPath id={`clipDinamico${id}`}>
            <rect
              x="0"
              y={tanque?.ejeY}
              width="300"
              height={tanque?.porcentajeAltura}
            />
          </clipPath>
          <linearGradient
            id={`relleno_tanque_${id}`}
            className="relleno"
            x1={171.606}
            x2={171.606}
            y1={45.25}
            y2={150.25}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={tanque?.estado?.a} />
            <stop offset={1} stopColor={tanque?.estado?.b} />
            <stop offset={1} stopColor={tanque?.estado?.c} />
          </linearGradient>
        </defs>
        <linearGradient
          id="f"
          x1={100.57}
          x2={70.961}
          y1={29.893}
          y2={29.893}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#737373" />
          <stop offset={0.5} stopColor="#D9D9D9" />
          <stop offset={1} stopColor="#737373" />
        </linearGradient>
        <linearGradient
          id="h"
          x1={106.993}
          x2={64.898}
          y1={19.388}
          y2={19.388}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#737373" />
          <stop offset={0.5} stopColor="#D9D9D9" />
          <stop offset={1} stopColor="#737373" />
        </linearGradient>
      </defs>
    </svg>
  );
}
