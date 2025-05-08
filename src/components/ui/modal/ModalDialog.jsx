'use client';

import clsx from 'clsx';
import { useEffect } from 'react';
import { Check, TriangleAlert, X } from 'lucide-react';
import Button from '../buttons/Button';

const STATUS_ICONS = {
  success: (
    <div className="bg-green-500 rounded-full p-3">
      <Check size={25} color="white" />
    </div>
  ),
  error: (
    <div className="bg-red-500 rounded-full p-3">
      <X size={25} color="white" />
    </div>
  ),
  warning: (
    <div className="bg-yellow-500 rounded-full p-2">
      <TriangleAlert size={35} color="white" />
    </div>
  ),
};

export default function ModalDialog({
  title,
  isOpen,
  loading = false,
  children,
  className = '',
  containerStyles = '',
  onOkLabel = 'Si',
  onCancelLabel = 'No',
  onOk = () => {},
  onCancel = () => {},
  status = null,
  autoclose = false,
  onAutoClose = () => {},
  closable = true,
  timeout = 2500,
  showCancelButton = true,
}) {
  useEffect(() => {
    if (autoclose && isOpen)
      setTimeout(() => {
        onCancel();
        onAutoClose();
      }, timeout);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={clsx('relative bg-white rounded-lg shadow-lg', {
          'max-w-3xl w-80': !containerStyles,
          containerStyles: containerStyles,
        })}
      >
        {closable && (
          <button
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-700"
            onClick={onCancel}
          >
            <X size={20} />
          </button>
        )}

        <div
          className={clsx('py-5 px-4', {
            className: className,
          })}
        >
          {children ? (
            children
          ) : (
            <p
              className={clsx('text-base font-medium text-center mt-1 mb-14', {
                'mb-5': status,
              })}
            >
              {title ?? ''}
            </p>
          )}
          {status && (
            <div className="flex justify-center">
              {' '}
              {status && STATUS_ICONS[status]}
            </div>
          )}
          {!autoclose && (
            <div className="flex justify-center mt-6 mb-1 gap-14">
              {showCancelButton && (
                <Button
                  className="font-medium  text-lg"
                  onClick={() => onCancel()}
                >
                  {onCancelLabel}
                </Button>
              )}
              <Button
                className="font-medium px-5 text-lg"
                type="button"
                loading={loading}
                onClick={() => onOk()}
              >
                {onOkLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
