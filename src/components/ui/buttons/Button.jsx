'use client';

import clsx from 'clsx';
import { Loader } from 'lucide-react';

export default function Button({
  icon,
  iconRight,
  children,
  disabled = false,
  loading = false,
  className = '',
  labelStyles = '',
  disabledStyles = 'cursor-not-allowed opacity-60 hover:opacity-60 text-gray-200',
  loadingProps = {},
  backgroundColor = '',
  ...props
}) {
  const baseClasses =
    'px-4 py-2 rounded flex items-center justify-center space-x-2 text-white font-bold text-sm rounded-lg bg-dark hover:bg-dark hover:opacity-80';

  return (
    <button
      {...props}
      className={clsx(
        baseClasses,
        {
          [disabledStyles]: disabled || loading,
          [backgroundColor]: backgroundColor,
          'bg-gradient-to-t from-dark via-[#25303b] to-[#6d8caa]':
            !backgroundColor,
        },
        className
      )}
      disabled={disabled || loading}
    >
      {icon && icon}
      <span className={clsx('flex-grow', labelStyles)}>{children}</span>
      {loading && (
        <Loader
          size={20}
          className="animate-spin text-white"
          {...loadingProps}
        />
      )}
      {iconRight && iconRight}
    </button>
  );
}
