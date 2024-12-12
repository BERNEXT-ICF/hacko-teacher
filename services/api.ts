import axios, { AxiosError, AxiosInstance } from 'axios';

let authProvider: { setIsAuthenticated: (value: boolean) => void } | null = null;

export const setAuthProvider = (provider: typeof authProvider) => {
  authProvider = provider;
};

const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        authProvider?.setIsAuthenticated(false);
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const api = createApi();