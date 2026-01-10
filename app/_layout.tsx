import { Stack } from "expo-router";
import { AppProviders } from "@/core/bootstrap/AppProviders";
import "../global.css";

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false }} />
    </AppProviders>
  );
}
