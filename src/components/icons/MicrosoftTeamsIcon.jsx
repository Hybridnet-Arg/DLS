export default function MicrosoftTeamsIcon({
  width = 20,
  height = 20,
  color = 'yellow',
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 192 192"
      {...props}
    >
      <rect
        width={68}
        height={68}
        x={22}
        y={62}
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={12}
        rx={4}
      />
      <circle cx={103} cy={46} r={18} stroke={color} strokeWidth={12} />
      <circle cx={156} cy={53} r={11} stroke={color} strokeWidth={12} />
      <path
        fill={color}
        fillRule="evenodd"
        d="M136.859 126.839c1.969 5.347 7.11 9.161 13.141 9.161 7.732 0 14-6.268 14-14V90h-27.261l-.239-11-11.004 2.341A7.988 7.988 0 0 1 132 78h36a8 8 0 0 1 8 8v36c0 14.359-11.641 26-26 26a25.916 25.916 0 0 1-17.999-7.237l4.858-13.924Z"
        clipRule="evenodd"
      />
      <path
        fill={color}
        fillRule="evenodd"
        d="M62 130c0 22.091 17.909 40 40 40s40-17.909 40-40V82a4 4 0 0 0-4-4H90v12h40v40c0 15.464-12.536 28-28 28s-28-12.536-28-28H62Z"
        clipRule="evenodd"
      />
      <path
        stroke={'#000'}
        strokeLinecap="round"
        strokeWidth={12}
        d="M56 110V82m0 0H42m14 0h14"
      />
    </svg>
  );
}
