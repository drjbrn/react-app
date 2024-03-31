import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SingleTask } from '@/types';

interface ITaskData {
  task: SingleTask;
  allTaskData: SingleTask[];
}

const initialState: ITaskData = {
  task: {} as SingleTask,
  allTaskData: [],
};

export const taskItemSlice = createSlice({
  name: 'taskItem',
  initialState,
  reducers: {
    setTaskData: (state, action: PayloadAction<SingleTask>) => {
      state.task = action.payload;
    },
    setAllTaskData: (state, action: PayloadAction<SingleTask[]>) => {
      state.allTaskData = action.payload;
    },
  },
});

export const { setTaskData, setAllTaskData } = taskItemSlice.actions;

export default taskItemSlice.reducer;
