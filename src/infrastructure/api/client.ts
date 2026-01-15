import axios from "axios";
import { ENV } from "@/core/config/env";
import { useSessionStore } from "@/state/session.store";

export const api = axios.create({
  baseURL: ENV.apiBaseUrl,
  timeout: 20000,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useSessionStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      await useSessionStore.getState().clearSession();
    }
    return Promise.reject(error);
  }
);
