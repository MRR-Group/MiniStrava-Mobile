import { AuthApi } from "@/infrastructure/api/auth.api";

export async function register(payload: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  await AuthApi.register(payload);
}
