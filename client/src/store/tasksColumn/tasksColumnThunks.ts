import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '@/api/axios.api';
import { Column, ColumnListItem } from '@/types';
import {
  setAllColumnsData,
  setColumnItemData,
  setColumnList,
} from './tasksColumnSlice';

export const getAllColumns = createAsyncThunk(
  'columns/all',
  async (_, { dispatch }) => {
    try {
      const response = await instance.get('/columns');
      if (response.status === 200) {
        dispatch(setAllColumnsData(response.data));

        const columnList: ColumnListItem[] = response.data.map(
          (item: Column) => ({
            id: item.id,
            value: item.title,
            label: item.title,
          }),
        );
        dispatch(setColumnList(columnList));
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const getColumnById = createAsyncThunk(
  'columns/item',
  async (columnId: number, { dispatch }) => {
    try {
      const response = await instance.get(`/columns/${columnId}`);
      if (response.status === 200) {
        dispatch(setColumnItemData(response.data));
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const createNewColumn = createAsyncThunk(
  'columns/create',
  async (title: string) => {
    try {
      const response = await instance.post('/columns', {
        title,
      });
      return response.data;
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const editColumn = createAsyncThunk(
  'columns/create',
  async ({ columnId, title }: { title: string; columnId: number }) => {
    try {
      const response = await instance.patch(`/columns/${columnId}`, {
        title,
      });
      return response.data;
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const deleteColumn = createAsyncThunk(
  'columns/delete',
  async (columnId: number) => {
    try {
      const response = await instance.delete(`/columns/${columnId}`);
      return response.data;
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);
