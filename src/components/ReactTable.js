import React, { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import "./ReactTable.css";

const ReactTable = () => {
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);

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
                    {flexRender(header.column.columnDef.header, header.getContext())}
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
