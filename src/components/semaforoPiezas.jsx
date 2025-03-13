import * as React from 'react';
const SemaforoPiezas = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="145"
    height="85"
    {...props}
  >
    <path
      d="M4 35h40v20H4z "
      style={{
        fill: props.s1,
        fillOpacity: 0.5,
      }}
    />

    <path
      d="M47 35h40v20H47z "
      style={{
        fill: props.s2,
        fillOpacity: 0.5,
      }}
    />
    <path
      d="M90 35h40v20H90z "
      style={{
        fill: props.s3,
        fillOpacity: 0.5,
      }}
    />

    <text
      x={5}
      y={17}
      style={{
        fill: 'rgb(71 85 105);',
        fontSize: 13,
        fontWeight: 'bold',
      }}
    >
      {props.descripcion}
    </text>

    <text
      x={5}
      y={30}
      style={{
        fill: 'rgb(71 85 105);',
        fontSize: 13,
      }}
    >
      {props.hs} Horas
    </text>

    <text
      x={5}
      y={65}
      style={{
        fill: 'rgb(71 85 105);',
        fontSize: 10,
      }}
    >
      {'0'}
    </text>
    <text
      x={35}
      y={65}
      style={{
        fill: 'rgb(71 85 105);',
        fontSize: 10,
      }}
    >
      {props.escala.m1}
    </text>
    <text
      x={75}
      y={65}
      style={{
        fill: 'rgb(71 85 105);',
        fontSize: 10,
      }}
    >
      {props.escala.m2}
    </text>

    <text
      x={105}
      y={65}
      style={{
        fill: 'rgb(71 85 105);',
        fontSize: 10,
      }}
    >
      {props.escala.max}
    </text>
  </svg>
);
export default SemaforoPiezas;
