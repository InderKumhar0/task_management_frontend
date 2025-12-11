import { api, handleApiError } from '@/utils/apiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const signupUser = createAsyncThunk(
  'user/signup',
  async (payload: SignupPayload, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signup', payload);
      localStorage.setItem('token', response.data.token);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', payload);
      localStorage.setItem('token', response.data.token);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout', {
        withCredentials: true,
      });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/me', {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
