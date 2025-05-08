import React from 'react';

export default function OtroPerforadorIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width || '100%'}
      height={props?.height || '100%'}
      viewBox="0 0 101 10"
      fill="none"
      {...props}
    >
      <g filter="url(#a)">
        <circle cx={82} cy={18} r={16} fill="#25303B" />
        <circle cx={82} cy={18} r={15.68} stroke="#C9CCD2" strokeWidth={0.64} />
      </g>
      <path
        fill="#C9CCD2"
        d="m80.984 9.254.476-1.92h1.426l.475 1.92h-2.377Zm3.166 3.84-.76-2.88h-2.472l-.751 2.88-.561 1.92h5.096l-.552-1.92Zm3.49 13.44H85.67l-.228-.864-3.29-4.992-3.298 4.992-.219.864h-1.968l2.729-10.56h1.987l-.343 1.296 1.113 1.68 1.103-1.68-.333-1.296h1.968l2.747 10.56Zm-6.057-6.72-.855-1.296-1.122 4.3 1.977-3.004Zm3.119 2.995-1.122-4.3-.856 1.305 1.978 2.995Z"
      />
      <g filter="url(#b)">
        <circle cx={22} cy={18} r={16} fill="#25303B" />
        <circle cx={22} cy={18} r={15.68} stroke="#C9CCD2" strokeWidth={0.64} />
      </g>
      <path
        fill="#C9CCD2"
        d="m20.984 9.254.476-1.92h1.426l.475 1.92h-2.377Zm3.166 3.84-.76-2.88h-2.472l-.751 2.88-.561 1.92h5.096l-.552-1.92Zm3.49 13.44H25.67l-.228-.864-3.29-4.992-3.298 4.992-.219.864h-1.968l2.729-10.56h1.987l-.343 1.296 1.113 1.68 1.103-1.68-.333-1.296h1.968l2.747 10.56Zm-6.057-6.72-.855-1.296-1.122 4.3 1.977-3.004Zm3.119 2.995-1.122-4.3-.856 1.305 1.978 2.995Z"
      />
      <path
        fill="#25303B"
        d="M65.707 19.707a1 1 0 0 0 0-1.414l-6.364-6.364a1 1 0 0 0-1.414 1.414L63.586 19l-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364ZM39 20h26v-2H39v2Z"
      />
      <defs>
        <filter
          id="a"
          width={39.68}
          height={39.68}
          x={60.88}
          y={0.08}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-1.28} dy={1.92} />
          <feGaussianBlur stdDeviation={1.92} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_7870_81180"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_7870_81180"
            result="shape"
          />
        </filter>
        <filter
          id="b"
          width={39.68}
          height={39.68}
          x={0.88}
          y={0.08}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-1.28} dy={1.92} />
          <feGaussianBlur stdDeviation={1.92} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_7870_81180"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_7870_81180"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
