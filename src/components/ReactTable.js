import { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table";
import "./ReactTable.css";
import filterIconFill from '../icons/filter-fill.png';
import filterIconEmpty from '../icons/filter-empty.png';
import filterIconActive from '../icons/filter-active.png';
import FilterMenu from "./FilterMenu";

const ReactTable = ({ tableData, setTableData }) => {
  const [columns, setColumns] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [filters, setFilters] = useState({});
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);

  const handleFilterClick = (columnKey) => {
    setActiveFilterColumn((prev) => (prev === columnKey ? null : columnKey));
  };

  const closeMenu = () => setActiveFilterColumn(null);

  useEffect(() => {
    if (tableData.length > 0) {
      const generatedColumns = Object.keys(tableData[0]).map((key) => {
        const baseColumn = {
          accessorKey: key,
          header: key.replace(/_/g, " ").toUpperCase(),
          filterFn: (row, columnId, filterValue) => {
            if (filterValue.length === 0) {
              return false;
            }
            return filterValue.includes(row.getValue(columnId));
          },
        };

        if (key === "scanned") {
          baseColumn.cell = (info) => (
            <div className="checkbox-wrapper">
              <input type="checkbox" checked={info.getValue()} readOnly />
            </div>
          );
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
                const columnKey = header.column.columnDef.accessorKey;
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
                            data={columnFilters.some((filter) => filter.id === columnKey) ? tableData : tableData}
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
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReactTable;
