import React, { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import filterIcon from '../icons/filter.png';
import "./ReactTable.css";
import FilterMenu from "./FilterMenu";

const ReactTable = () => {
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);

    //filter hooks
    const [activeFilterColumn, setActiveFilerColum] = useState(null);
    const handleFilterClick = (columnKey) => {
        setActiveFilerColum((prev) => (prev === columnKey? null : columnKey));
    }

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
    });

    return (
        <div className="table-container">
        <table>
            <thead>
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                        <div className="table-header">  
                        <span>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                        
                        <div className="filter-icon-wrapper">
                            <img 
                            src={filterIcon}
                            alt="filter"
                            onClick={() => handleFilterClick(header.column.columnDef.accessorKey)}
                            />

                            {activeFilterColumn === header.column.columnDef.accessorKey && (
                                <FilterMenu isOpen={activeFilterColumn === header.column.columnDef.accessorKey} />
                            )}
                        </div>
                        </div>
                  </th>
                  
                ))}
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
