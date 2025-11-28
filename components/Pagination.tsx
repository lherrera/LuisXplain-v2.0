import React from 'react';
import { ChevronLeft, ChevronRight } from './icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-8 py-4">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5 text-slate-600" />
      </button>
      
      <div className="flex gap-1">
        {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
                <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                    currentPage === pageNum
                        ? 'bg-red-600 text-white shadow-md shadow-red-200'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                >
                    {pageNum}
                </button>
            )
        })}
      </div>

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5 text-slate-600" />
      </button>
    </div>
  );
};

export default Pagination;