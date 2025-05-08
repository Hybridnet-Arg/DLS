'use client';

import { X } from 'lucide-react';
import Button from '../buttons/Button';

export default function Modal({
  isOpen,
  onClose,
  title = '',
  children,
  onOk,
  okLabel = 'ok',
  header = null,
  footer = null,
  cancel = false,
  isLoadingOk = false,
  containerStyles = '',
  closable = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-lg w-full relative ${containerStyles ? containerStyles : 'max-w-lg'} `}
      >
        {closable && (
          <button
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        )}
        {header
          ? header
          : title && (
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">{title ?? ''}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
            )}
        <div className="p-4">{children}</div>
        {footer ? (
          footer
        ) : (
          <div className="flex justify-end p-4 border-t gap-2">
            {cancel && (
              <Button
                onClick={onClose}
                className="px-4 py-2 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                backgroundColor="bg-red-600"
              >
                Cancelar
              </Button>
            )}
            <Button
              loading={isLoadingOk}
              onClick={onOk || onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {okLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
