import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './modalSlice';
import taskItemSlice from './taskItem/taskItemSlice';
import tasksColumnSlice from './tasksColumn/tasksColumnSlice';
import historySlice from './history/historySlice';

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    taskItem: taskItemSlice,
    tasksColumn: tasksColumnSlice,
    history: historySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
