import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface InventoryState {
  items: InventoryItem[];
  columnFilters: any[];
  sorting: any[];
}

const initialState: InventoryState = {
  items: [],
  columnFilters: [],
  sorting: [],
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<InventoryItem[]>) => {
      state.items = action.payload;
    },
    setColumnFilters: (state, action: PayloadAction<any[]>) => {
      state.columnFilters = action.payload;
    },
    setSorting: (state, action: PayloadAction<any[]>) => {
      state.sorting = action.payload;
    },
    markScanned: (state, action: PayloadAction<{ asset_component: number; new_room: string }>) => {
      const item = state.items.find(i => i.asset_component === action.payload.asset_component);
      if (item) {
        item.scanned = true;
        item.new_room = action.payload.new_room;
      }
    }
  }
});

export const { setItems, setColumnFilters, setSorting, markScanned } = inventorySlice.actions;
export default inventorySlice.reducer;
