import React from 'react';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  pageSize: number;
  setPageSize: (size: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
  canPreviousPage,
  canNextPage,
  goToFirstPage,
  goToLastPage,
  goToPreviousPage,
  goToNextPage,
  pageSize,
  setPageSize,
}: PaginationProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 16, gap: 8 }}>
      <button
        style={{ border: '1px solid #ddd', borderRadius: 4, background: '#fff', padding: 4, cursor: 'pointer' }}
        onClick={goToFirstPage}
        disabled={!canPreviousPage}
        aria-label="First Page"
      >
        <ChevronsLeft size={18} />
      </button>

      <ReactPaginate
        breakLabel="..."
        previousLabel={<ChevronLeft size={18} />}
        nextLabel={<ChevronRight size={18} />}
        onPageChange={(e) => onPageChange(e.selected)}
        pageCount={pageCount}
        forcePage={currentPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={5}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
        disableInitialCallback
        renderOnZeroPageCount={null}
      />

      <button
        style={{ border: '1px solid #ddd', borderRadius: 4, background: '#fff', padding: 4, cursor: 'pointer' }}
        onClick={goToNextPage}
        disabled={!canNextPage}
        aria-label="Next Page"
      >
        <ChevronsRight size={18} />
      </button>

      <select
        className="page-item"
        style={{ marginLeft: 8, borderRadius: 4, border: '1px solid #ddd', padding: '4px 10px' }}
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[5, 10, 25, 50, 100].map((size) => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
    </div>
  );
}
