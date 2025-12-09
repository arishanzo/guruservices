 // === Pagination component ===
  const Pagination = ({ currentPage, totalData, onPageChange }) => {
    const rowsPerPage = 5;

    const totalPages = Math.ceil(totalData / rowsPerPage);
    return (
      <div className="flex justify-end items-center mt-4 gap-2 text-sm">
        <button
          className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Sebelumnya
        </button>
        <span className="text-gray-600">
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Selanjutnya
        </button>
      </div>
    );
  };

  export default Pagination;