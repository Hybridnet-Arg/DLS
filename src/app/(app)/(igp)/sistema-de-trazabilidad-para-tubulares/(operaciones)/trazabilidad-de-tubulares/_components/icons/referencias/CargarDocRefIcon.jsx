export default function CargarDocRefIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width ?? '100%'}
      height={props?.height ?? '100%'}
      viewBox="0 0 35 35"
      fill="#CC1E2C"
      {...props}
    >
      <path d="M8 3.2c-7.5 5.2-9.8 12.5-6.1 20 2.9 5.9 6.3 8.1 13.3 8.6 4.9.4 6.4.1 9.3-1.9 4.8-3.3 7.9-9.8 7.2-15.1C30.6 7 23.8 1 16 1c-3.2 0-5.7.7-8 2.2zm9 12.4c0 4.8-.3 6.5-1.2 6.2-1.3-.5-2.3-8.9-1.4-11.4 1.3-3.5 2.6-.9 2.6 5.2zm.3 9.9c.1.5-.6 1.1-1.5 1.3-1.1.2-1.8-.3-1.8-1.3 0-1.7 3-1.8 3.3 0z" />
    </svg>
  );
}
