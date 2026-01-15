import { api } from "@/infrastructure/api/client";

export type PushTokenPayload = {
  token: string;
  platform: "android" | "ios" | "web";
  device_id?: string | null;
  device_name?: string | null;
};

export const PushTokensApi = {
  async register(payload: PushTokenPayload): Promise<void> {
    await api.post("/push-tokens", payload);
  },

  async revoke(token: string): Promise<void> {
    await api.delete("/push-tokens", { data: { token } });
  },
};
