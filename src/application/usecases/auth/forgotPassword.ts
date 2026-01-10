import { AuthApi } from "@/infrastructure/api/auth.api";

export async function forgotPassword(email: string) {
  await AuthApi.forgotPassword({ email });
}
