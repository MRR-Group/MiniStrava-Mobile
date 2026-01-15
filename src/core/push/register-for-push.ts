import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export type PushRegistrationResult = {
  token: string | null;
  reason?: string;
};

export async function registerForPush(): Promise<PushRegistrationResult> {
  if (!Device.isDevice) {
    return { token: null, reason: "not_a_device" };
  }

  const settings = await Notifications.getPermissionsAsync();
  let finalStatus = settings.status;

  if (finalStatus !== "granted") {
    const request = await Notifications.requestPermissionsAsync();
    finalStatus = request.status;
  }

  if (finalStatus !== "granted") {
    return { token: null, reason: "permission_denied" };
  }

  const projectId = Notifications.getExpoPushTokenAsync ? (await Notifications.getExpoPushTokenAsync()).data : null;
  if (!projectId) {
    return { token: null, reason: "token_unavailable" };
  }

  return {
    token: projectId,
    reason: "ok",
  };
}
