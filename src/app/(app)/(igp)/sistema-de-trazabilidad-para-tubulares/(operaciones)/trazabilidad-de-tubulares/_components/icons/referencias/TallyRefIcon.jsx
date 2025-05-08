export default function TallyRefIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || '100%'}
      height={props.height || '100%'}
      viewBox="0 0 35 35"
      fill="none"
      {...props}
    >
      <g filter="url(#a)">
        <circle cx={17.956} cy={16.817} r={15.694} fill="#fff" />
        <path
          fill="#25303B"
          d="M19.027 10.725a.457.457 0 0 1 .457-.457h3.657a.457.457 0 1 1 0 .914h-3.657a.457.457 0 0 1-.457-.457Zm.457 1.371a.457.457 0 0 0 0 .914h3.657a.457.457 0 0 0 0-.914h-3.657Zm-.457 4.571a.457.457 0 0 1 .457-.457h3.657a.457.457 0 0 1 0 .914h-3.657a.457.457 0 0 1-.457-.457Zm.457 1.371a.457.457 0 0 0 0 .915h3.657a.457.457 0 1 0 0-.915h-3.657Z"
        />
        <path
          fill="#25303B"
          fillRule="evenodd"
          d="M14.457 16.21a.457.457 0 0 1 .457-.458H17.2a.457.457 0 0 1 .457.457v2.286a.457.457 0 0 1-.457.457h-2.286a.457.457 0 0 1-.457-.457v-2.286Zm.914.456v1.372h1.371v-1.372h-1.37Z"
          clipRule="evenodd"
        />
        <path
          fill="#25303B"
          d="M17.982 11.046a.457.457 0 0 0-.646-.646l-1.505 1.505-.591-.591a.457.457 0 0 0-.647.646l1.238 1.238 2.151-2.152Z"
        />
        <path
          fill="#25303B"
          fillRule="evenodd"
          d="M14.457 6.61a1.828 1.828 0 0 0-1.828 1.828v12.799a1.828 1.828 0 0 0 1.828 1.828H23.6a1.828 1.828 0 0 0 1.829-1.828v-12.8a1.828 1.828 0 0 0-1.829-1.828h-9.142Zm-.914 1.828a.914.914 0 0 1 .914-.914H23.6a.914.914 0 0 1 .915.914v12.799a.914.914 0 0 1-.915.914h-9.142a.914.914 0 0 1-.914-.914v-12.8Zm12.799 2.742a1.371 1.371 0 0 1 2.743 0v9.281l-1.372 2.057-1.371-2.057v-9.28Zm1.371-.457a.457.457 0 0 0-.457.457v.915h.914v-.915a.457.457 0 0 0-.457-.457Zm0 10.147-.457-.686v-7.175h.914v7.175l-.457.686Z"
          clipRule="evenodd"
        />
        <ellipse cx={10.645} cy={24.893} fill="#25303B" rx={3.809} ry={0.914} />
        <ellipse cx={10.492} cy={24.893} fill="#D9D9D9" rx={1.219} ry={0.305} />
        <path
          fill="#25303B"
          d="M9.73 24.35a.762.762 0 1 0 1.524 0H9.73Zm1.524-15.303v-.762H9.73v.762h1.524Zm0 15.303V9.047H9.73V24.35h1.524Z"
        />
      </g>
      <defs>
        <filter
          id="a"
          width={33.825}
          height={33.827}
          x={0.433}
          y={0.818}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-0.609} dy={0.914} />
          <feGaussianBlur stdDeviation={0.609} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_7683_48756"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_7683_48756"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
