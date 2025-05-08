export default function TallerIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width || '100%'}
      height={props?.height || '100%'}
      viewBox="0 0 55 55"
      fill="none"
      {...props}
    >
      <g
        stroke="#25303B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.486}
        filter="url(#a)"
      >
        <path d="M24.887 21.89 12.459 9.461M9.974 13.19l6.214-6.214L8.73 3.248 6.246 5.734l3.728 7.456Zm37.22 3.666a8.699 8.699 0 0 0 1.964-9.296l-3.535 3.535h-4.97V6.124l3.534-3.535A8.7 8.7 0 0 0 32.93 13.85L16.849 29.933a8.699 8.699 0 0 0-11.26 11.256l3.532-3.534h4.971v4.97l-3.534 3.535a8.698 8.698 0 0 0 11.26-11.254L37.902 18.82a8.7 8.7 0 0 0 9.291-1.964Z" />
        <path d="m26.863 30.587 13.929 13.93a3.355 3.355 0 0 0 4.75 0l1.968-1.97a3.355 3.355 0 0 0 0-4.75L33.582 23.87" />
      </g>
      <defs>
        <filter
          id="a"
          width={53.858}
          height={53.862}
          x={0.444}
          y={0.758}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={3.314} />
          <feGaussianBlur stdDeviation={1.657} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_7577_77156"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_7577_77156"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
