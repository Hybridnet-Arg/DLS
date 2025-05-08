export default function TubularIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width ?? '100%'}
      height={props?.height ?? '100%'}
      viewBox="0 0 10 301"
      fill="none"
      {...props}
    >
      <path
        fill="url(#a)"
        stroke="#25303B"
        strokeWidth={0.18}
        d="M.089 2.163c0 .27.121.533.354.78.234.247.576.474 1.005.667.859.385 2.051.626 3.374.626 1.322 0 2.514-.24 3.373-.626.43-.193.772-.42 1.005-.667.233-.247.354-.51.354-.78s-.121-.533-.354-.78c-.233-.248-.575-.475-1.005-.667C7.336.33 6.144.09 4.822.09c-1.323 0-2.515.24-3.374.626-.43.192-.771.42-1.005.667-.233.247-.354.51-.354.78Z"
      />
      <path
        fill="url(#b)"
        d="M9.688 3.422S7.843 4.954 4.723 4.954C1.602 4.954.042 3.422.042 3.422v14.6s1.489 1.802 4.893 1.802c3.405 0 4.753-1.559 4.753-1.559V3.422Z"
      />
      <path
        fill="url(#c)"
        d="M8.34 19.469s-1.132.81-3.335.81c-2.203 0-3.474-.81-3.474-.81v270.073s.725 1.007 3.454 1.007c2.73 0 3.355-1.007 3.355-1.007V19.469Z"
      />
      <path
        fill="url(#d)"
        d="M8.34 289.828s-1.176.901-3.424.901c-2.25 0-3.527-.901-3.527-.901l.567 9.464s.506 1.23 2.96 1.168c2.453-.062 2.856-1.168 2.856-1.168l.568-9.464Z"
      />
      <defs>
        <linearGradient
          id="a"
          x1={4.822}
          x2={4.822}
          y1={0}
          y2={4.326}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D9D9D9" />
          <stop offset={1} stopColor="#838994" />
        </linearGradient>
        <linearGradient
          id="b"
          x1={0.042}
          x2={9.688}
          y1={11.625}
          y2={11.625}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D9D9D9" />
          <stop offset={1} stopColor="#838994" />
        </linearGradient>
        <linearGradient
          id="c"
          x1={1.531}
          x2={8.34}
          y1={172.182}
          y2={172.182}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D9D9D9" />
          <stop offset={1} stopColor="#838994" />
        </linearGradient>
        <linearGradient
          id="d"
          x1={1.389}
          x2={8.34}
          y1={295.145}
          y2={295.145}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D9D9D9" />
          <stop offset={1} stopColor="#838994" />
        </linearGradient>
      </defs>
    </svg>
  );
}
