import React, { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import "./ReactTable.css";

const ReactTable = () => {
  const [tableData, setTableData] = useState([]);

  // Load data from JSON file
  useEffect(() => {
    fetch("/inventoryData.json")
 // ✅ Load the JSON file
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  const handleCheckboxChange = (id) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, scanned: !item.scanned } : item
      )
    );
  };

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "inventory", header: "Inwentarz" },
    { accessorKey: "department", header: "Dział Gospodarczy" },
    { accessorKey: "asset_group", header: "Grupa Aktywów Trw." },
    { accessorKey: "category", header: "Grupa Rodzajowa" },
    { accessorKey: "inventory_number", header: "Numer Inwentarzowy" },
    { accessorKey: "asset_component", header: "Składnik Aktywów Trw." },
    { accessorKey: "sub_number", header: "Podnumer" },
    { accessorKey: "acquisition_date", header: "Data Pierwotnego Przychodu" },
    { accessorKey: "asset_description", header: "Oznaczenie Aktywów Trwałych" },
    { accessorKey: "quantity", header: "Ilość" },
    { accessorKey: "initial_value", header: "Wartość Początkowa" },
    { accessorKey: "room", header: "Pomieszczenie" },
    {
      accessorKey: "scanned",
      header: "Zeskanowany",
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.scanned}
          onChange={() => handleCheckboxChange(row.original.id)}
        />
      ),
    }
  ];

  const table = useReactTable({
    data: tableData,
    columns,
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
