import * as React from 'react';
const Encendido = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="50"
    height="90"
    {...props}
  >
    <path
      d="M4 25h42v30H4z "
      style={{
        fill: props.color,
        fillOpacity: 0.5,
      }}
    />

    <text
      x={10}
      y={17}
      style={{
        fill: 'rgb(71 85 105)',
        fontSize: 15,
        fontWeight: 'bolder',
      }}
    >
      {props.descripcion}
    </text>
  </svg>
);
export default Encendido;
