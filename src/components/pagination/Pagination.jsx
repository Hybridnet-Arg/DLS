'use client';
import clsx from 'clsx';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { usePagination } from './hooks/usePagination';

export default function Pagination({
  currentPage,
  totalPages,
  pageSize = DEFAULT_PAGE_SIZE,
  onPageChange = () => {},
  className = '',
}) {
  const pagination = usePagination(currentPage, totalPages, pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (!totalPages) return;
  return (
    <div
      className={clsx('space-x-2 mt-4', {
        [className]: className,
        'flex justify-center items-center': !className,
      })}
    >
      <button
        type="button"
        onClick={() => handlePrevious()}
        disabled={currentPage === 1}
        className={clsx(
          'px-3 py-1 rounded-md text-white',
          currentPage === 1
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-dark hover:bg-gray-600'
        )}
      >
        Anterior
      </button>
      {currentPage > pageSize && (
        <button
          onClick={() => onPageChange(1)}
          className="px-3 py-1 rounded-md text-white bg-dark hover:bg-gray-600"
          aria-current="page"
        >
          1...
        </button>
      )}
      {pagination.map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => onPageChange(number)}
          className={clsx(
            'px-3 py-1 rounded-md text-white',
            currentPage === number
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-dark hover:bg-gray-600'
          )}
        >
          {number}
        </button>
      ))}
      {totalPages && totalPages > pageSize && (
        <button
          onClick={() => onPageChange(totalPages ?? 1)}
          className={clsx(
            'px-3 py-1 rounded-md text-white',
            totalPages === currentPage
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-dark hover:bg-gray-600'
          )}
        >
          ...{totalPages}
        </button>
      )}
      <button
        type="button"
        onClick={() => handleNext()}
        disabled={currentPage === totalPages}
        className={clsx(
          'px-3 py-1 rounded-md text-white',
          currentPage === totalPages
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-dark hover:bg-gray-600'
        )}
      >
        Siguiente
      </button>
    </div>
  );
}
