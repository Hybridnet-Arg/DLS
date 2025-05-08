export default function LocacionTubularIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width || '100%'}
      height={props?.height || '100%'}
      viewBox="0 0 86 61"
      fill="none"
      {...props}
    >
      <g filter="url(#a)">
        <rect
          width={18.986}
          height={15.189}
          x={39.114}
          y={6.112}
          fill="#25303B"
          stroke="#25303B"
          strokeWidth={0.345}
          rx={1.553}
        />
        <rect
          width={18.986}
          height={15.189}
          x={10.118}
          y={22.682}
          fill="#25303B"
          stroke="#25303B"
          strokeWidth={0.345}
          rx={1.553}
        />
        <rect
          width={18.986}
          height={15.189}
          x={36.356}
          y={37.526}
          fill="#25303B"
          stroke="#25303B"
          strokeWidth={0.345}
          rx={1.553}
        />
        <mask id="b" fill="#fff">
          <path d="m50.336 21.508 2.286-2.104 6.852 7.445-2.286 2.104-6.852-7.445Z" />
        </mask>
        <path
          fill="#25303B"
          d="m50.336 21.508 2.286-2.104 6.852 7.445-2.286 2.104-6.852-7.445Z"
        />
        <path
          fill="#25303B"
          d="m59.474 26.849.234.254.254-.234-.234-.254-.254.234Zm-2.286 2.104-.254.234.233.254.255-.234-.234-.254Zm-4.82-9.315 6.852 7.445.508-.468-6.852-7.445-.508.468Zm6.872 6.957-2.286 2.104.468.508 2.286-2.104-.468-.508Zm-1.798 2.124-6.852-7.445-.508.468 6.852 7.445.508-.468Z"
          mask="url(#b)"
        />
        <mask id="c" fill="#fff">
          <path d="m55.547 39.61-2.104-2.287 11.595-10.67 2.104 2.285L55.547 39.61Z" />
        </mask>
        <path
          fill="#25303B"
          d="m55.547 39.61-2.104-2.287 11.595-10.67 2.104 2.285L55.547 39.61Z"
        />
        <path
          fill="#25303B"
          d="m65.038 26.652.254-.234-.234-.254-.254.234.234.254Zm2.104 2.286.234.254.254-.233-.234-.255-.254.234Zm-13.465 8.64 11.595-10.672-.468-.508L53.21 37.07l.468.508Zm11.107-10.692 2.104 2.286.508-.468-2.104-2.286-.508.468Zm2.124 1.798L55.313 39.355l.468.508 11.595-10.67-.468-.509Z"
          mask="url(#c)"
        />
        <mask id="d" fill="#fff">
          <path d="M76.227 26.652v3.107H20.648v-3.107h55.579Z" />
        </mask>
        <path fill="#25303B" d="M76.227 26.652v3.107H20.648v-3.107h55.579Z" />
        <path
          fill="#25303B"
          d="M76.227 26.652h.345v-.345h-.345v.345Zm0 3.107v.345h.345v-.345h-.345Zm-55.579 0h-.345v.345h.345v-.345Zm0-3.107v-.345h-.345v.345h.345Zm55.233 0v3.107h.69v-3.107h-.69Zm.346 2.762H20.648v.69h55.579v-.69Zm-55.234.345v-3.107h-.69v3.107h.69Zm-.345-2.761h55.579v-.69H20.648v.69Z"
          mask="url(#d)"
        />
      </g>
      <defs>
        <filter
          id="a"
          width={95.532}
          height={67.936}
          x={-6.628}
          y={-2.486}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-1.657} dy={2.486} />
          <feGaussianBlur stdDeviation={2.486} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_7577_77144"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_7577_77144"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
