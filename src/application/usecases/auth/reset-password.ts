import { AuthApi } from "@/infrastructure/api/auth.api";

export async function resetPassword(payload: {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}) {
  await AuthApi.resetPassword(payload);
}
