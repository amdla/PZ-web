import * as XLSX from 'xlsx';

export interface InventoryItem {
  id: number;
  inventory: number;
  department: number;
  asset_group: number;
  category: string;
  inventory_number: string;
  asset_component: string;
  sub_number: number;
  acquisition_date: string;
  asset_description: string;
  quantity: number;
  initial_value: number;
  lastInventoryRoom: string;
  currentRoom: string;
}

export const generateXlsxFromItems = (items: InventoryItem[], filename = 'raport.xlsx') => {
  if (!items || items.length === 0) {
    alert('Brak danych do eksportu.');
    return;
  }

  const headers = [
    "ID", "Inwentarz ID", "Dział", "Grupa Aktywów", "Kategoria", "Numer Inwentarzowy",
    "Składnik Aktywów", "Podnumer", "Data Nabycia", "Opis", "Ilość", "Wartość Początkowa",
    "Poprzednie Pomieszczenie", "Obecne Pomieszczenie"
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
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dane');

  XLSX.writeFile(workbook, filename);
};
