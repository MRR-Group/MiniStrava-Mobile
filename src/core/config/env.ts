import Constants from "expo-constants";

type Extra = { apiBaseUrl?: string };

const extra = (Constants.expoConfig?.extra ?? {}) as Extra;

export const ENV = {
  apiBaseUrl: extra.apiBaseUrl ?? "http://localhost/api",
};
