import React, { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table";
import filterIconFill from '../icons/filter-fill.png';
import filterIconEmpty from '../icons/filter-empty.png';
import filterIconActive from '../icons/filter-active.png';

import "./ReactTable.css";
import FilterMenu from "./FilterMenu";

const ReactTable = () => {
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [sorting, setSorting] = useState([])
    //checkBoxes hook
    const [filters, setFilters] = useState({});
    

    //opening filter hooks
    const [activeFilterColumn, setActiveFilterColumn] = useState(null);

    const handleFilterClick = (columnKey) => {
        //if the prev === columnKey close the filterMenu
        setActiveFilterColumn((prev) => (prev === columnKey? null : columnKey));
    }
    
    //function to pass to filterMenu where a hook is attached to close the filterMenu when clicked outside the element
    const closeMenu = () => setActiveFilterColumn(null);


  // Load data from JSON file
    useEffect(()=>{
        fetch("/inventoryData.json")
            .then((response) => response.json())
            .then((data) => {
                setTableData(data);
                if (data.length > 0) {
                    setColumns(
                        Object.keys(data[0]).map((key) => ({
                            accessorKey: key,
                            header: key.replace(/_/g, " ").toUpperCase(),
                            filterFn: (row, columnId, filterValue) => {
                                if (filterValue.length === 0) {
                                    return false;
                                }
                                return filterValue.includes(row.getValue(columnId));
                            },
                              
                        }))
                    );
                }
            })
            .catch((error) => console.error("Error loading JSON:", error));
    }, []);

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
    
    const visibleData = table.getRowModel().rows.map((row) => row.original);
    
    return (
        <div className="table-container">
        <table>
            <thead>
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    const columnKey = header.column.columnDef.accessorKey;
                    const isActive = activeFilterColumn === columnKey;
                    const isFiltered = columnFilters.some(filter => filter.id === columnKey) /*|| header.column.getIsSorted()*/;
                    return(<th key={header.id}>
                            <div className="table-header">  
                            <span>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </span>
                            {/*clicking on the icon triggers the onClick handler and the mouseDown handler in the filterMenu which call on close and the onClick opens it instead of closing thats why onMouseDown */}
                            <div className="filter-icon-wrapper" onMouseDown={(e) => e.stopPropagation()} >
                                <img 
                                src={isActive ? filterIconEmpty : isFiltered ? filterIconActive : filterIconFill}
                                alt="filter"
                                onClick={() => handleFilterClick(header.column.columnDef.accessorKey)}
                                />

                                {activeFilterColumn === header.column.columnDef.accessorKey && (
                                    <FilterMenu isOpen={activeFilterColumn === header.column.columnDef.accessorKey} onClose={closeMenu} data={ columnFilters.some((filter) => filter.id === columnKey) ? tableData: visibleData } columnName={header.column.columnDef.accessorKey}  filters={filters} setFilters={setFilters} setColumnFilters={setColumnFilters} setSorting={setSorting} sorting={sorting}/>
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
                    { cell.getValue() /*TEGO UŻYWA SIĘ JAK BĘDZIE CHECKBOX {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
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
