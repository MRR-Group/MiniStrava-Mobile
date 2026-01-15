import { api } from "@/infrastructure/api/client";
import type { AuthUser } from "@/state/session.store";

export type LoginPayload = { 
  email: string;
  password: string 
};

export type LoginResponse = { 
  token: string; 
  user_id: number 
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type ForgotPasswordPayload = { 
  email: string
};

export type ResetPasswordPayload = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const AuthApi = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/auth/login", payload);
    return data;
  },

  async register(payload: RegisterPayload): Promise<void> {
    await api.post("/auth/register", payload);
  },

  async forgotPassword(payload: ForgotPasswordPayload): Promise<void> {
    await api.post("/auth/forgot-password", payload);
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<void> {
    await api.post("/auth/reset-password", payload);
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },

  async me(): Promise<AuthUser> {
    const { data } = await api.get<AuthUser | { data: AuthUser }>("/profile");

    const maybeWrapped = (data as any)?.data;
    return (maybeWrapped ?? data) as AuthUser;
  },
};
