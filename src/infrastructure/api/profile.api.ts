import { api } from "./client";
import type { AuthUser } from "@/state/session.store";

export type UpdateProfilePayload = {
  name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  height?: number | null;
  weight?: number | null;
  birth_date?: string | null;
};

export const ProfileApi = {
  async update(payload: UpdateProfilePayload): Promise<AuthUser> {
    const { data } = await api.patch<AuthUser | { data: AuthUser }>("/profile", payload);
    return ((data as any)?.data ?? data) as AuthUser;
  },

  async exportCsv(): Promise<string> {
    const { data } = await api.get<string>("/profile/export", {
      responseType: "text",
    });
    return data;
  },
};
