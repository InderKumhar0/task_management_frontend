import { api, handleApiError } from '@/utils/apiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface CreateTaskPayload {
  title: string;
  description: string;
  priority: string | null;
  status: string | null;
}

interface UpdateTaskPayload {
  id: number | null;
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
}

export const getAllTasks = createAsyncThunk(
  'task/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/tasks');
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const createTask = createAsyncThunk(
  'task/create',
  async (payload: CreateTaskPayload, { rejectWithValue }) => {
    try {
      const response = await api.post('/tasks', payload);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateTask = createAsyncThunk(
  'task/update',
  async ({ id, ...updates }: UpdateTaskPayload, { rejectWithValue }) => {
    try {
      const response = await api.put(`/tasks/${id}`, updates);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteTask = createAsyncThunk(
  'task/delete',
  async (taskId: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      return { taskId, ...response.data?.data };
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
