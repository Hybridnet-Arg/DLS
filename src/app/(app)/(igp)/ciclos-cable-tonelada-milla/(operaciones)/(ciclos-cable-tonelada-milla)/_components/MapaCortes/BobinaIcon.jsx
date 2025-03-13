const textProps = {
  textAnchor: 'middle',
  dominantBaseline: 'middle',
  fontSize: '21',
  fill: 'black',
  fontWeight: 'bold',
  stroke: 'white',
  strokeWidth: '2',
  paintOrder: 'stroke',
};

export default function BobinaIcon({ title, color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || '100%'}
      height={props.height || '100%'}
      viewBox="0 0 259 188"
      fill="none"
      {...props}
    >
      <path fill={!title ? 'gray' : color} d="M0 2h167v23H0z" />
      <circle
        cx={165.465}
        cy={93.536}
        r={92.536}
        fill={!title ? 'gray' : color}
        stroke="#fff"
        strokeWidth={2}
      />
      <circle
        cx={165.59}
        cy={93.661}
        r={64.661}
        fill={!title ? 'gray' : color}
        stroke="#C9CCD2"
        strokeWidth={2}
      />
      <circle
        cx={166.587}
        cy={94.657}
        r={25.636}
        fill={!title ? 'gray' : color}
        stroke="#C9CCD2"
        strokeWidth={2}
        transform="rotate(-45 166.587 94.657)"
      />
      <path
        stroke="#C9CCD2"
        d="m149.416 75.907 36.793 36.793M152.928 72.403l35.917 35.917M140.658 95.18l25.405 25.404M141.533 103.064l16.645 16.645M158.182 70.651l32.413 32.413M141.533 89.048l30.661 30.661M163.439 68.899l28.909 28.909M143.287 83.791l34.165 34.165M170.443 68.899 192.344 90.8M145.916 79.412l35.917 35.917"
      />
      {title && (
        <text x="63%" y="50%" {...textProps}>
          {title}
        </text>
      )}
    </svg>
  );
}
