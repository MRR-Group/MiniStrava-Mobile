import { Platform } from "react-native";
import { registerForPush } from "@/core/push/register-for-push";
import { PushTokensApi } from "@/infrastructure/api/push-tokens.api";
import * as Device from "expo-device";

export async function registerPushTokenUseCase(): Promise<{ token: string | null; reason?: string }> {
  const { token, reason } = await registerForPush();

  if (!token) {
    return { token: null, reason };
  }

  const platform = Platform.OS === "ios" ? "ios" : Platform.OS === "android" ? "android" : "web";

  try {
    await PushTokensApi.register({
      token,
      platform,
      device_id: Device.osInternalBuildId ?? Device.osBuildId ?? undefined,
      device_name: Device.deviceName ?? undefined,
    });
  } catch (e) {
    return { token: null, reason: "api_error" };
  }

  return { token, reason: "ok" };
}
