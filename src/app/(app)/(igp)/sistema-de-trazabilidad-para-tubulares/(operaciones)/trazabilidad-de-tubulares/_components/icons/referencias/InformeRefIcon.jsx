export default function InformeRefIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width ?? '100%'}
      height={props?.height ?? '100%'}
      viewBox="0 0 32 33"
      fill="none"
      {...props}
    >
      <rect
        width={31.238}
        height={31.238}
        x={0.381}
        y={1.014}
        fill="#4A6277"
        rx={15.619}
      />
      <rect
        width={31.238}
        height={31.238}
        x={0.381}
        y={1.014}
        stroke="url(#b)"
        strokeWidth={0.762}
        rx={15.619}
      />
      <path
        fill="#fff"
        d="M14.953 26a.36.36 0 0 1-.22-.073.36.36 0 0 1-.072-.22V9.226q0-.122.073-.195a.3.3 0 0 1 .22-.098h2.242q.123 0 .195.098a.23.23 0 0 1 .098.195v16.481a.3.3 0 0 1-.098.22.26.26 0 0 1-.195.073z"
      />
      <defs>
        <linearGradient
          id="a"
          x1={16}
          x2={16}
          y1={32.633}
          y2={0.633}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#18222C" />
          <stop offset={1} stopColor="#7697B7" />
        </linearGradient>
        <linearGradient
          id="b"
          x1={16}
          x2={16}
          y1={32.633}
          y2={0.633}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#18222C" />
          <stop offset={1} stopColor="#7697B7" />
        </linearGradient>
      </defs>
    </svg>
  );
}
