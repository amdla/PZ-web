import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setColumnFilters, setSorting } from '../features/inventory/inventorySlice';
import './ReactTable.css';
import filterIconFill from '../icons/filter-fill.png';
import filterIconEmpty from '../icons/filter-empty.png';
import filterIconActive from '../icons/filter-active.png';
import FilterMenu from './FilterMenu';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';


interface InventoryItem {
  id: number;
  inventory: number;
  department: number;
  asset_group: number;
  category: string;
  inventory_number: string;
  asset_component: number;
  sub_number: number;
  acquisition_date: string;
  asset_description: string;
  quantity: number;
  initial_value: string;
  room: string;
  new_room: string;
  scanned: boolean;
}

const ReactTable: React.FC = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.inventory.items);
  const columnFilters = useSelector((state: RootState) => state.inventory.columnFilters);
  const sorting = useSelector((state: RootState) => state.inventory.sorting);

  const [columns, setColumns] = useState<ColumnDef<InventoryItem, any>[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);

  const handleFilterClick = (columnKey: string) => {
    setActiveFilterColumn((prev) => (prev === columnKey ? null : columnKey));
  };

  const closeMenu = () => setActiveFilterColumn(null);

  useEffect(() => {
    if (tableData.length > 0) {
      const generatedColumns: ColumnDef<InventoryItem, any>[] = Object.keys(tableData[0]).map((key) => {
        const baseColumn: ColumnDef<InventoryItem, any> = {
          accessorKey: key,
          header: key.replace(/_/g, ' ').toUpperCase(),
          filterFn: (row, columnId, filterValue) => {
            if (filterValue.length === 0) return false;
            return filterValue.includes(String(row.getValue(columnId)));
          },
        };

        if (key === 'scanned') {
          baseColumn.cell = (info) => {
            const value = info.getValue();
            return (
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={Boolean(value)}
                  readOnly
                />
              </div>
            );
          };
        }

        return baseColumn;
      });

      setColumns(generatedColumns);
    }
  }, [tableData]);

  const table = useReactTable({
    data: tableData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: (updater) =>
      dispatch(setColumnFilters(typeof updater === 'function' ? updater(columnFilters) : updater)),
    onSortingChange: (updater) =>
      dispatch(setSorting(typeof updater === 'function' ? updater(sorting) : updater)),
    
  });

  return (
    <div className="table-container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const columnKey = header.column.id;
                const isActive = activeFilterColumn === columnKey;
                const isFiltered = columnFilters.some((filter) => filter.id === columnKey);

                return (
                  <th key={header.id}>
                    <div className="table-header">
                      <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                      <div className="filter-icon-wrapper" onMouseDown={(e) => e.stopPropagation()}>
                        <img
                          src={isActive ? filterIconEmpty : isFiltered ? filterIconActive : filterIconFill}
                          alt="filter"
                          onClick={() => handleFilterClick(columnKey)}
                        />
                        {activeFilterColumn === columnKey && (
                          <FilterMenu
                            isOpen={activeFilterColumn === columnKey}
                            onClose={closeMenu}
                            data={tableData}
                            columnName={columnKey}
                            filters={filters}
                            setFilters={setFilters}
                            setColumnFilters={(filters: ColumnFiltersState) => dispatch(setColumnFilters(filters))}
                            setSorting={(sorting: SortingState) => dispatch(setSorting(sorting))}
                            sorting={sorting}
                          />
                        )}
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReactTable;
