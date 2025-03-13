import * as React from 'react';

function Logo({ fill = '#3B81F6', ...rest }) {
  return (
    <svg
      width={40}
      height={40}
      fill="none"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M18 2H6c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 16H7V6h10v12zm-5-4h3v2h-3v-2zm0-4h3v2h-3v-2zm0-4h3v2h-3V6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default Logo;
