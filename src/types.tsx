export interface InventoryItem {
  id: number;
  inventory: number;
  department: string;
  asset_group: string;
  category: string;
  inventory_number: string;
  asset_component: string;
  sub_number: string;
  acquisition_date: string;
  asset_description: string;
  quantity: number;
  initial_value: string;
  lastInventoryRoom: string;
  currentRoom: string;
  scanned: boolean;
}