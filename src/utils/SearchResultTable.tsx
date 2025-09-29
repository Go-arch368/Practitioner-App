import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  flexRender,
  SortingState,
  GroupingState,
  ColumnDef,
} from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { FaRegFile, FaSortUp, FaSortDown } from 'react-icons/fa';
import clearIco from '../assets/images/clear-icon.png'; // Make sure your assets path is correct

import "../../src/components/component-styles/Features.css"
import { degreeList } from '@/constants/Constants';
import Practitioner from '../components/model/Practitioner';

type TableProps<T, Filters> = {
  filteredData: T[];
  columns: ColumnDef<T, any>[];
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
};

export default function SearchResultTable<T , Filters>({
  filteredData,
  columns,
  filters,
  setFilters,
}: TableProps<T, Filters>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState('');
  const [grouping, setGrouping] = useState<GroupingState>([]);

  const totalRecord = filteredData.length;

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
      grouping,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onGroupingChange: setGrouping,
  });

  const clearFilter = () => setFiltering('');

  // Function to get unique values for filtering options e.g degrees
  function getUniqueValue<T>(array: T[], key: string): any[] {
    const valueSet = new Set<any>();
    for (const item of array) {
      if (item && typeof item === 'object' && key in item) {
        valueSet.add((item as any)[key]);
      }
    }
    return Array.from(valueSet);
  }

  let degreeOptions = getUniqueValue(filteredData, 'degrees');
  if (!degreeOptions || degreeOptions.length === 0) {
    degreeOptions = degreeList;
  }

  return (
    <div>
      <div className="features">
        <div style={{ minWidth: '300px', textAlign: 'left' }}>
          <p style={{ color: 'red' }}> Total {totalRecord} Records are Found. </p>
        </div>

        <div className="search-container">
          <input
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            placeholder="Search..."
          />
          {filtering && (
            <img
              className="clear-icon"
            //   src={clearIco}
              onClick={clearFilter}
              alt="Clear"
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>
      </div>

     
        <table
          className="table table-hover rounded-corners "
        
        >
          <thead className="thead-dark" >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const key = header.column.id as keyof Filters;

                  // Render sortable column headers with sort icons and optional degree filter
                  return (
                    <th key={header.id} className= 'sortable-header'>
                      <div className="header-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span className="header-text">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>

                        {key !== 'providerId' && (
                          <span className="sort-icons" style={{ display: 'flex', gap: '4px' }}>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                header.column.toggleSorting(false); // Ascending
                              }}
                              className={`sort-link ${header.column.getIsSorted() === 'asc' ? 'active' : ''}`}
                              title="Sort ascending"
                            >
                              <FaSortUp style={{ marginTop: '3px' }} />
                            </a>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                header.column.toggleSorting(true); // Descending
                              }}
                              className={`sort-link ${header.column.getIsSorted() === 'desc' ? 'active' : ''}`}
                              title="Sort descending"
                            >
                              <FaSortDown style={{ marginBottom: '3px' }} />
                            </a>
                          </span>
                        )}
                      </div>

                      {key === 'degrees' ? (
                        <select
                          id="degrees"
                          defaultValue="select"
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                          style={{ flex: 1, padding: '2px' }}
                        >
                          <option key="select" value="">
                            No Filter
                          </option>
                          {degreeOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={filters[key] as string}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="column-filter"
                        />
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="table-row">
                {row.getVisibleCells().map((cell) => (
                 <td key={cell.id}>
  {"originalRecordId" in (row.original as object) &&
  (row.original as any).originalRecordId ? (
    flexRender(cell.column.columnDef.cell, cell.getContext())
  ) : (
    <del>{flexRender(cell.column.columnDef.cell, cell.getContext())}</del>
  )}
</td>

                ))}
              </tr>
            ))}
          </tbody>
        </table>
     

      {/* Pagination features */}
      <div className="pagination-features" style={{ marginTop: '10px' }}>
        <button
          className="btn btn-primary"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          First
        </button>
        <button
          className="btn btn-primary"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>

        <select
          className="form-select mx-2"
          style={{ width: 'auto', display: 'inline-block' }}
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>

        <button
          className="btn btn-primary"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
        <button
          className="btn btn-primary"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Last
        </button>
      </div>
    </div>
  );
}
