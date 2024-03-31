import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { History } from '@/types';

interface ITaskData {
  allHistory: History[];
  taskHistory: History[];
}

const initialState: ITaskData = {
  allHistory: [],
  taskHistory: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setAllHistory: (state, action: PayloadAction<History[]>) => {
      state.allHistory = action.payload;
    },
    setTaskHistory: (state, action: PayloadAction<History[]>) => {
      state.taskHistory = action.payload;
    },
  },
});

export const { setAllHistory, setTaskHistory } = historySlice.actions;

export default historySlice.reducer;
