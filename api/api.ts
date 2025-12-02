import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const API_URL = (process as any)?.env?.API_URL;
const TOKEN_KEY = "auth_token";

export const tokenStorage = {
  get: () => AsyncStorage.getItem(TOKEN_KEY),
  set: (t: string | null) => t ? AsyncStorage.setItem(TOKEN_KEY, t) : AsyncStorage.removeItem(TOKEN_KEY),
};

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { Accept: "application/json" },
});

api.interceptors.request.use(async (config) => {
  const token = await tokenStorage.get();

  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  (config.headers as any).Accept = "application/json";

  return config;
});

export default api;
