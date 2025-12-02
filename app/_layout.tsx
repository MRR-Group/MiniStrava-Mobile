import { useAuthStore } from "@/store/authStore";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { configureReanimatedLogger,ReanimatedLogLevel } from 'react-native-reanimated';

configureReanimatedLogger({
  level: ReanimatedLogLevel.error,
  strict: false,
});

export default function RootLayout() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const hydrateUser = useAuthStore(state => state.hydrateUser);

  useEffect(() => {
    (async () => {
      await hydrateUser();

      if (!user) {
        router.replace("/login");
      }
    })();
  }, [hydrateUser, router, user]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        contentStyle: { backgroundColor: "#0b0d12" }
      }}
    />
  );
}
