export function paginationFormatter({
  data = [],
  page = 1,
  pageSize = 10,
  totalRecords = 0,
}) {
  const totalPages = Math.ceil(totalRecords / pageSize);
  const hasNextPage = page < totalPages;

  return {
    data,
    currentPage: page,
    pageSize,
    totalRecords,
    totalPages,
    hasNextPage,
  };
}
