import { Tabs, Redirect } from "expo-router";
import { useSessionStore } from "@/state/session.store";

export default function TabsLayout() {
  const { token, hydrated } = useSessionStore();

  if (!hydrated) {
    return null;
  }
  
  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Start" }} />
      <Tabs.Screen name="activities" options={{ title: "Historia" }} />
      <Tabs.Screen name="stats" options={{ title: "Statystyki" }} />
      <Tabs.Screen name="leaderboard" options={{ title: "Ranking" }} />
      <Tabs.Screen name="profile" options={{ title: "Profil" }} />
    </Tabs>
  );
}
