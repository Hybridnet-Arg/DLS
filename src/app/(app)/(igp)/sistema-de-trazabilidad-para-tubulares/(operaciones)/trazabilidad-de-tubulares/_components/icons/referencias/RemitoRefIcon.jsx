export default function RemitoRefIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width ?? '100%'}
      height={props?.height ?? '100%'}
      viewBox="0 0 32 33"
      fill="none"
      {...props}
    >
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="3"
            floodColor="rgba(0, 0, 0, 0.3)"
          />
        </filter>
      </defs>

      <rect
        width={31.238}
        height={31.238}
        x={0.381}
        y={1.014}
        fill="#4A6277"
        rx={15.619}
        filter="url(#shadow)"
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
        d="M20.361 25.633a.345.345 0 0 1-.34-.22l-3.22-7.021c-.032-.065-.08-.098-.145-.098H13.73c-.081 0-.122.04-.122.122v6.924a.303.303 0 0 1-.098.22.264.264 0 0 1-.195.073h-2.243a.357.357 0 0 1-.219-.073.357.357 0 0 1-.073-.22V8.86c0-.082.024-.147.073-.195a.303.303 0 0 1 .22-.098h6.704c.992 0 1.87.211 2.633.634a4.307 4.307 0 0 1 1.78 1.756c.423.747.634 1.609.634 2.584 0 1.121-.293 2.08-.878 2.877-.569.78-1.365 1.324-2.389 1.633-.033 0-.057.017-.073.05a.104.104 0 0 0 0 .097l3.438 7.095a.375.375 0 0 1 .048.146c0 .13-.09.195-.268.195h-2.34ZM13.73 11.004c-.081 0-.122.04-.122.122v4.852c0 .081.04.122.122.122h3.657c.78 0 1.406-.228 1.877-.683.488-.471.732-1.089.732-1.853s-.244-1.381-.732-1.853c-.471-.471-1.097-.707-1.877-.707H13.73Z"
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
