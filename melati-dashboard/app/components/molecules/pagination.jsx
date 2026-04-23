import React from "react";

export const Pagination = ({ currentPage, totalItems, perPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / perPage);
  
  // Jika tidak ada data, jangan tampilkan text aneh, kembalikan 0
  const startEntry = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endEntry = Math.min(currentPage * perPage, totalItems);

  // Fungsi pembantu untuk tombol
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-between py-4 px-6 border-t border-gray-200">
      <span className="text-sm text-gray-500">
        Showing {startEntry} to {endEntry} of {totalItems} entries
      </span>
      
      {totalPages > 0 && (
        <div className="flex space-x-2">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-50 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lsaquo;
          </button>
          
          {/* Generate nomor halaman dinamis berdasarkan total data */}
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button 
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1 rounded cursor-pointer ${
                  currentPage === pageNum 
                    ? "bg-blue-600 text-white font-medium" 
                    : "border text-gray-600 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            )
          })}

          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-50 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &rsaquo;
          </button>
        </div>
      )}
    </div>
  );
};