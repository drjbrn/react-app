import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Column, ColumnListItem } from '@/types';

interface IColumnData {
  allData: Column[];
  columnList: ColumnListItem[];
  columnItemData: Column;
}

const initialState: IColumnData = {
  allData: [],
  columnList: [],
  columnItemData: {} as Column,
};

export const tasksColumnSlice = createSlice({
  name: 'tasksColumn',
  initialState,
  reducers: {
    setAllColumnsData: (state, action: PayloadAction<Column[]>) => {
      state.allData = action.payload;
    },
    setColumnList: (state, action: PayloadAction<ColumnListItem[]>) => {
      state.columnList = action.payload;
    },
    setColumnItemData: (state, action: PayloadAction<Column>) => {
      state.columnItemData = action.payload;
    },
  },
});

export const { setAllColumnsData, setColumnItemData, setColumnList } =
  tasksColumnSlice.actions;

export default tasksColumnSlice.reducer;
