import { useState, useMemo } from 'react';

export const usePagination = (data = [], initialItemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = useMemo(() => {
    return data.slice(indexOfFirstItem, indexOfLastItem);
  }, [data, indexOfFirstItem, indexOfLastItem]);

  const handlePageChange = (pageNumber, resetFn) => {
    const newPage = Math.max(1, Math.min(pageNumber, totalPages || 1));
    if (resetFn) resetFn();
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (value, resetFn) => {
    const newItemsPerPage = parseInt(value, 10);
    if (resetFn) resetFn();
    setItemsPerPage(newItemsPerPage);

    if (currentPage > Math.ceil(totalItems / newItemsPerPage)) {
      setCurrentPage(1);
    }
  };

  return {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    currentItems,
    handlePageChange,
    handleItemsPerPageChange,
  };
};
