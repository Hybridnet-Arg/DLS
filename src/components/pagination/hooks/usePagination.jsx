import { useState, useEffect } from 'react';

const FIRST_PAGE = 1;

export function usePagination(page, totalPages, pageSize) {
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    const getPages = (currentPage, totalPages) => {
      const totalDataLength = totalPages - pageSize;
      const totalLength =
        totalDataLength < FIRST_PAGE ? FIRST_PAGE : totalDataLength;

      const start = currentPage <= totalLength ? currentPage : totalLength;
      const end =
        currentPage <= totalLength ? currentPage + pageSize : totalPages;

      if (totalDataLength < FIRST_PAGE) {
        const lengthArr = { length: totalPages };
        return Array.from(lengthArr, (_, i) => start + i);
      }
      const lengthArr = { length: end - start };
      return Array.from(lengthArr, (_, i) => start + i);
    };

    if (!totalPages) return;
    const pagination = getPages(page, totalPages);
    setPagination(pagination);
  }, [page, pageSize, totalPages]);

  return pagination;
}
