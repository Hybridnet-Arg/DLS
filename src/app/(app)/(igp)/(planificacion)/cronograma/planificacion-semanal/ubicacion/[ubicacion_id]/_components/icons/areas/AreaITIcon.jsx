export default function AreaITIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width || '100%'}
      height={props?.height || '100%'}
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <path
        fill="#fff"
        d="M16 0C7.178 0 0 7.178 0 16v6.629C0 24.267 1.435 25.6 3.2 25.6h1.6A1.6 1.6 0 0 0 6.4 24v-8.229a1.6 1.6 0 0 0-1.6-1.6H3.347C4.237 7.98 9.565 3.2 16 3.2c6.435 0 11.763 4.78 12.653 10.971H27.2a1.6 1.6 0 0 0-1.6 1.6V25.6c0 1.765-1.435 3.2-3.2 3.2h-3.2v-1.6h-6.4V32h9.6c3.53 0 6.4-2.87 6.4-6.4 1.765 0 3.2-1.333 3.2-2.971V16c0-8.822-7.178-16-16-16Z"
      />
    </svg>
  );
}
