export default function PerdidaEnPozoIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || '100%'}
      height={props.height || '100%'}
      viewBox="0 0 68 53"
      fill="none"
      {...props}
    >
      <path
        fill="#C9CCD2"
        fillRule="evenodd"
        d="M11.997 36.568c-3.672-1.393-7.23-3.715-7.23-8.925V.51H.47v27.133C.76 36.383 8.057 39.53 11.997 40.44l55.745.07v-3.942H11.997Z"
        clipRule="evenodd"
      />
      <g filter="url(#a)">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M19.774 14.532a2.776 2.776 0 0 1 1.943-.79c.73 0 1.428.285 1.944.79l10.427 10.23 10.427-10.23c.254-.257.557-.463.892-.604a2.795 2.795 0 0 1 3.03.57c.257.254.462.555.6.887a2.654 2.654 0 0 1-.635 2.961l-10.427 10.23 10.427 10.23c.501.508.778 1.19.772 1.897a2.672 2.672 0 0 1-.805 1.883c-.51.5-1.2.784-1.92.79a2.777 2.777 0 0 1-1.934-.757L34.088 32.39 23.66 42.62a2.777 2.777 0 0 1-1.934.757 2.776 2.776 0 0 1-1.92-.79 2.672 2.672 0 0 1-.805-1.883 2.67 2.67 0 0 1 .772-1.897L30.2 28.576l-10.427-10.23a2.672 2.672 0 0 1-.805-1.907c0-.715.29-1.4.805-1.907Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <filter
          id="a"
          width={42.273}
          height={41.668}
          x={10.969}
          y={10.709}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-2} dy={3} />
          <feGaussianBlur stdDeviation={3} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_7673_62873"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_7673_62873"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
