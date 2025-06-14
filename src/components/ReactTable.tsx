import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import './ReactTable.css';
import filterIconFill from '../icons/filter-fill.png';
import filterIconEmpty from '../icons/filter-empty.png';
import filterIconActive from '../icons/filter-active.png';
import FilterMenu from './FilterMenu';
import { InventoryItem } from '../types';

interface ReactTableProps {
  tableData: InventoryItem[];
  setTableData: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

const headerMap: Record<string, string> = {
  id: 'ID',
  inventory: 'Inwentarz ID',
  department: 'Dział',
  asset_group: 'Grupa Aktywów',
  category: 'Kategoria',
  inventory_number: 'Numer Inwentarzowy',
  asset_component: 'Kod przedmiotu',
  sub_number: 'Podnumer',
  acquisition_date: 'Data Nabycia',
  asset_description: 'Opis',
  quantity: 'Ilość',
  initial_value: 'Wartość Początkowa',
  lastInventoryRoom: 'Poprzednie Pomieszczenie',
  currentRoom: 'Obecne Pomieszczenie',
  scanned: 'Zeskanowano',
};

const ReactTable: React.FC<ReactTableProps> = ({ tableData }) => {
  const [columns, setColumns] = useState<ColumnDef<InventoryItem, any>[]>([]);
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [sorting, setSorting] = useState<any[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);

  const handleFilterClick = (columnKey: string) => {
    setActiveFilterColumn((prev) => (prev === columnKey ? null : columnKey));
  };

  const closeMenu = () => setActiveFilterColumn(null);

  useEffect(() => {
    if (tableData.length > 0) {
      const keys = Object.keys(tableData[0]) as (keyof InventoryItem)[];
      const generatedColumns: ColumnDef<InventoryItem, any>[] = keys.map((key) => ({
        accessorKey: key,
        header: headerMap[key] || key.replace(/_/g, ' ').toUpperCase(),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue?.length) return true;
          return filterValue.includes(String(row.getValue(columnId)));
        },
        cell: (info) => {
          const value = info.getValue();
          if (key === 'scanned') {
            return (
              <div className="checkbox-wrapper">
                <input type="checkbox" checked={Boolean(value)} readOnly />
              </div>
            );
          }
          return String(value);
        },
      }));
      setColumns(generatedColumns);
    }
  }, [tableData]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
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
                        {isActive && (
                          <FilterMenu
                            isOpen={true}
                            onClose={closeMenu}
                            data={table.getFilteredRowModel().rows.map(r => r.original)} // ✅ dynamiczne dane
                            columnName={columnKey}
                            filters={filters}
                            setFilters={setFilters}
                            setColumnFilters={setColumnFilters}
                            setSorting={setSorting}
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
