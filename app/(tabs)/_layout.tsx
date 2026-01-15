import { Tabs, Redirect } from "expo-router";
import { useSessionStore } from "@/state/session.store";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  const { token, hydrated } = useSessionStore();

  if (!hydrated) {
    return null;
  }
  
  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#141822",
          borderTopColor: "rgba(255,255,255,0.08)",
        },
        tabBarActiveTintColor: "#e8ebf1",
        tabBarInactiveTintColor: "#9aa3b2",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Start",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-circle" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="activities"
        options={{
          title: "Aktywności",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />

      {/* Hidden record stack; keep accessible via navigation but off the tab bar */}
      <Tabs.Screen
        name="record"
        options={{
          href: null,
          title: "Record",
        }}
      />

      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Ranking",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
