import * as React from 'react';
const Semaforo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="130"
    height="90"
    {...props}
  >
    <path
      d="M4 25h30v30H4z "
      style={{
        fill: props.s1,
        fillOpacity: 0.5,
      }}
    />

    <path
      d="M37 25h30v30H37z "
      style={{
        fill: props.s2,
        fillOpacity: 0.5,
      }}
    />
    <path
      d="M70 25h30v30H70z "
      style={{
        fill: props.s3,
        fillOpacity: 0.5,
      }}
    />

    <text
      x={5}
      y={17}
      style={{
        fill: 'rgb(71 85 105)',
        fontSize: 15,
      }}
    >
      {props.descripcion}
    </text>
    <text
      x={5}
      y={70}
      style={{
        fill: 'rgb(71 85 105)',
        fontSize: 15,
        fontWeight: 'bolder',
      }}
    >
      Horas: {props.horas}
    </text>
  </svg>
);
export default Semaforo;
