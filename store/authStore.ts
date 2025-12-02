import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login as apiLogin, register as apiRegister, logout as apiLogout, me } from "@/api/auth";
import { tokenStorage } from "@/api/api";

type User = Awaited<ReturnType<typeof me>>;
type State = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

type Actions = {
  hydrateUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (p: { name: string; email: string; password: string; password_confirmation: string }) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
};

export const useAuthStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      clearError: () => set({ error: null }),

      hydrateUser: async () => {
        const token = await tokenStorage.get();

        if (!token) {
          return;
        }
        
        set({ token, loading: true });
        
        try {
          const u = await me();
          set({ user: u, loading: false });
        } 
        catch {
          await tokenStorage.set(null);
          set({ token: null, user: null, loading: false, error: null });
        }
      },

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const { token, user } = await apiLogin(email, password);

          await tokenStorage.set(token);
          
          set({ token, user, loading: false });
        } 
        catch (e: any) {
          console.log(e);
          set({ loading: false, error: e?.response?.data?.message ?? "Błąd logowania" });
          throw e;
        }
      },

      register: async (p) => {
        set({ loading: true, error: null });
        try {
          const { token, user } = await apiRegister(p);
          await tokenStorage.set(token);

          set({ token, user, loading: false });
        } catch (e: any) {
          set({ loading: false, error: e?.response?.data?.message ?? "Błąd rejestracji" });
          throw e;
        }
      },

      logout: async () => {
        try { await apiLogout(); } catch {}
        await tokenStorage.set(null);
        set({ token: null, user: null });
      },
    }),
    {
      name: "auth_store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ token: s.token, user: s.user }),
    }
  )
);
