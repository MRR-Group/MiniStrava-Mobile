import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth.token";

export type AuthUser = {
  id: number;
  email: string;
  name: string;

  first_name: string | null;
  last_name: string | null;
  birth_date: string | null;

  height: number | null;
  weight: number | null;

  avatar: string;
  created_at: string;
};

type SessionState = {
  token: string | null;
  user: AuthUser | null;
  hydrated: boolean;

  hydrate: () => Promise<void>;
  setToken: (token: string) => Promise<void>;
  setUser: (user: AuthUser) => void;
  clearSession: () => Promise<void>;
};

export const useSessionStore = create<SessionState>((set) => ({
  token: null,
  user: null,
  hydrated: false,

  hydrate: async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    set({ token: token ?? null, hydrated: true });
  },

  setToken: async (token) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    set({ token });
  },

  setUser: (user) => set({ user }),

  clearSession: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    set({ token: null, user: null });
  },
}));
