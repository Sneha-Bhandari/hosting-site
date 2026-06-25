// components/Ui/Pagination.js
"use client";

import React, { useState, useRef, useEffect } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-5 px-2 sm:px-0">
      {/* Left side - showing info */}
      <div className="text-sm text-gray-500 order-2 sm:order-1">
        Page {currentPage} of {totalPages}
      </div>

      {/* Right side - pagination controls */}
      <div className="flex items-center gap-2 order-1 sm:order-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border border-gray-200"
              : "bg-teal-600 text-white hover:bg-teal-700 shadow-md cursor-pointer"
          }`}
        >
          &laquo; Prev
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === 'ellipsis' ? (
                <span className="px-2 text-gray-400">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                    page === currentPage
                      ? "bg-teal-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border border-gray-200"
              : "bg-teal-600 text-white hover:bg-teal-700 shadow-md cursor-pointer"
          }`}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default Pagination;