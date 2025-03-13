export default function IntermediaTipoA({
  width = '100%',
  height = '100%',
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox="0 0 45 77"
      fill="none"
      {...props}
    >
      <rect width={41.65} height={74} x={1.5} y={1.5} fill="#6A5144" rx={3.5} />
      <rect
        width={41.65}
        height={74}
        x={1.5}
        y={1.5}
        stroke="#fff"
        strokeWidth={3}
        rx={3.5}
      />
      <path
        fill="#fff"
        d="M27.674 44a.263.263 0 0 1-.162-.054.263.263 0 0 1-.053-.162V31.616c0-.06.018-.108.053-.144a.224.224 0 0 1 .162-.072h1.657c.06 0 .108.024.143.072a.171.171 0 0 1 .073.144v12.168c0 .06-.024.114-.073.162a.195.195 0 0 1-.143.054h-1.657Z"
      />
      <path stroke="#fff" strokeWidth={2.106} d="M6.947 47V0" />
      <path fill="#fff" d="M6 30v17h14L6 30Z" />
    </svg>
  );
}
