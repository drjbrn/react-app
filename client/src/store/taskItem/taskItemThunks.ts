import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '@/api/axios.api';
import { setAllTaskData, setTaskData } from './taskItemSlice';

export const createNewTask = createAsyncThunk(
  'tasks/create',
  async ({
    title,
    description,
    priority,
    dueDate,
    column,
  }: {
    title: string;
    description: string;
    priority: string;
    dueDate: string;
    column: number;
  }) => {
    try {
      const response = await instance.post('/tasks', {
        title,
        description,
        priority,
        dueDate,
        column,
      });
      return response.data;
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const editTask = createAsyncThunk(
  'tasks/edit',
  async ({
    taskId,
    title,
    description,
    priority,
    dueDate,
    column,
  }: {
    taskId: number;
    title?: string;
    description?: string;
    priority?: string;
    dueDate?: string;
    column?: number;
  }) => {
    try {
      const response = await instance.patch(`/tasks/${taskId}`, {
        title,
        description,
        priority,
        dueDate,
        column,
      });
      return response.data;
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const removeTask = createAsyncThunk(
  'tasks/delete',
  async (taskId: number) => {
    try {
      const response = await instance.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const getTaskById = createAsyncThunk(
  'tasks/item',
  async (taskId: number, { dispatch }) => {
    try {
      const response = await instance.get(`/tasks/${taskId}`);
      if (response.status === 200) {
        dispatch(setTaskData(response.data));
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const getAllTaskData = createAsyncThunk(
  'tasks/all',
  async (_, { dispatch }) => {
    try {
      const response = await instance.get(`/tasks`);
      if (response.status === 200) {
        dispatch(setAllTaskData(response.data));
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);
