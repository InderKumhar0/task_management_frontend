import axios, { AxiosError, AxiosInstance } from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 20000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       cleanupAndRedirect();
//     } else {
//       console.error('API Error:', error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// const cleanupAndRedirect = () => {
//   toast.error('Session expired. Please log in again.');
//   localStorage.removeItem('token');
//   window.location.href = '/login';
// };

interface ApiErrorResponse {
  status?: string;
  message?: string;
  errors?: Record<string, string>;
}

export const handleApiError = (error: unknown): Record<string, string> => {
  let fieldErrors: Record<string, string> = {};

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    if (axiosError.response) {
      const { message, errors } = axiosError.response.data || {};

      if (message && axiosError.response.status !== 409) {
        toast.error(message);
      }

      if (errors && Object.keys(errors).length > 0) {
        fieldErrors = errors;
      }

      return fieldErrors;
    }

    if (axiosError.request) {
      toast.error('Network error. Please check your connection.');
      return {};
    }
  }

  toast.error('An unexpected error occurred.');
  return {};
};
