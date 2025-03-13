'use client';

import clsx from 'clsx';
import { Fragment } from 'react';
import { Inbox, Loader } from 'lucide-react';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import Pagination from '../pagination/Pagination';

export default function Table({
  columns,
  data,
  title = '',
  handleRowClick = () => {},
  selectedRow = null,
  noDataMessage = 'No hay datos para mostrar',
  className = '',
  pagination = {
    currentPage: null,
    totalPages: null,
    totalRecords: null,
    onPageChange: () => {},
  },
  loading = false,
}) {
  return (
    <Fragment>
      <div
        className={clsx('my-5 bg-backgroundGray rounded-lg shadow-md', {
          'p-3': !className,
          [className]: className,
        })}
      >
        {title && (
          <h2 className="uppercase text-sm bg-white p-1 rounded-t-md mb-1 text-center font-semibold">
            {title}
          </h2>
        )}
        <table
          className={clsx(
            'w-full text-xs table-fixed border border-backgroundGray bg-white',
            {
              'min-h-[256px]': data?.length === 0 || loading,
            }
          )}
        >
          <thead>
            <tr>
              {columns?.map((column, columnIndex) => (
                <th
                  key={column?.key}
                  className={clsx(
                    'border border-b-4 border-backgroundGray p-2 w-1/5 text-start',
                    {
                      'border-x-4 ':
                        columnIndex !== 0 && columnIndex !== columns.length - 1,
                    }
                  )}
                >
                  {column?.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex justify-center items-center">
                    <Loader size={20} className="animate-spin " />
                  </div>
                </td>
              </tr>
            ) : data?.length > 0 ? (
              data?.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => handleRowClick(row)}
                  className={clsx(
                    'cursor-pointer hover:bg-backgroundGray transition-colors',
                    {
                      'bg-backgroundGray': selectedRow === row,
                    }
                  )}
                >
                  {columns?.map((column, columnIndex) => (
                    <td
                      key={column.key}
                      className={clsx(
                        'border-b-4 border-backgroundGray px-2 py-1',
                        {
                          'border-x-4 ':
                            columnIndex !== 0 &&
                            columnIndex !== columns.length - 1,
                        }
                      )}
                    >
                      {column?.render
                        ? column?.render(row)
                        : row[column.key]
                          ? row[column.key]
                          : ''}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center p-[5rem]">
                  <div className="flex flex-col justify-center items-center">
                    <Inbox size={40} />
                    <span className="mt-2 text-[13px]">
                      {noDataMessage && noDataMessage}
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination?.totalRecords > DEFAULT_PAGE_SIZE && (
        <Pagination {...pagination} />
      )}
    </Fragment>
  );
}
