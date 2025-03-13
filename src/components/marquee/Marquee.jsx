import React from 'react';
import localFont from 'next/font/local'; // Para fuentes locales

// Para una fuente local
const myFont = localFont({
  src: [
    {
      path: '../../../public/fonts/LEDDot.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});

export const Marquee = ({ text, size = 'xl' }) => {
  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  };
  return (
    <div className="overflow-hidden shadow-sm lg:w-3/4">
      <div className="marquee-content flex gap-4 items-center animate-marquee w-full">
        <div
          className={`text-white ${textSizes[size] || 'text-xl'}`}
          style={{ textWrap: 'nowrap' }}
        >
          <span className={myFont.className}>{text}</span>
        </div>
      </div>
    </div>
  );
};
