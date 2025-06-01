import * as XLSX from 'xlsx';
import { InventoryItem } from '../types';

export const generateXlsxFromItems = (items: InventoryItem[], filename = 'raport.xlsx') => {
  if (!items || items.length === 0) {
    alert('Brak danych do eksportu.');
    return;
  }

  const headers = [
    "ID", "Inwentarz ID", "Dział", "Grupa Aktywów", "Kategoria", "Numer Inwentarzowy",
    "Składnik Aktywów", "Podnumer", "Data Nabycia", "Opis", "Ilość", "Wartość Początkowa",
    "Poprzednie Pomieszczenie", "Obecne Pomieszczenie", "Zeskanowano"
  ];

  const rows = items.map(item => [
    item.id,
    item.inventory,
    item.department,
    item.asset_group,
    item.category,
    item.inventory_number,
    item.asset_component,
    item.sub_number,
    item.acquisition_date,
    item.asset_description,
    item.quantity,
    item.initial_value,
    item.lastInventoryRoom,
    item.currentRoom,
    item.scanned,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dane');

  XLSX.writeFile(workbook, filename);
};
