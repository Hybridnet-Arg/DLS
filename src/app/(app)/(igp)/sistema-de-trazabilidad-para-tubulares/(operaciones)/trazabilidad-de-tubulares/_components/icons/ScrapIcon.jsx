export default function ScrapIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width || '100%'}
      height={props?.height || '100%'}
      viewBox="0 0 42 67"
      fill="none"
      {...props}
    >
      <g filter="url(#a)">
        <path
          fill="#25303B"
          d="M23.114 57.977a2.071 2.071 0 1 0 4.1-.591l-4.1.591Zm4.1-54.686.29-2.051-4.101-.58-.29 2.05 4.102.58Zm-5.956 27.33-2.051-.29-.041.292.042.293 2.05-.296Zm5.956 26.765-3.906-27.062-4.1.592 3.906 27.061 4.1-.591ZM23.309 30.91l3.905-27.62-4.101-.58-3.906 27.62 4.102.58Z"
        />
      </g>
      <g filter="url(#b)">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M8.793 16.25a2.708 2.708 0 0 1 3.83 0l10.273 10.274L33.17 16.251A2.709 2.709 0 1 1 37 20.08L26.726 30.354l10.273 10.273a2.708 2.708 0 0 1-3.83 3.83L22.896 34.184 12.623 44.457a2.708 2.708 0 0 1-3.83-3.83l10.273-10.273L8.793 20.08a2.708 2.708 0 0 1 0-3.83Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <filter
          id="a"
          width={14.968}
          height={65.722}
          x={15.85}
          y={0.66}
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
            result="effect1_dropShadow_7577_77157"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_7577_77157"
            result="shape"
          />
        </filter>
        <filter
          id="b"
          width={41.824}
          height={41.793}
          x={0}
          y={12.424}
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
            result="effect1_dropShadow_7577_77157"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_7577_77157"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
