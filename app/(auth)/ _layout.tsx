import { Stack, Redirect } from "expo-router";
import { useSessionStore } from "@/state/session.store";

export default function AuthLayout() {
  const { token, hydrated } = useSessionStore();

  if (!hydrated) {
    return null;
  }
   
  if (token) {
    return <Redirect href="/(tabs)" />;
  }
  
  return <Stack screenOptions={{ headerShown: false }} />;
}
