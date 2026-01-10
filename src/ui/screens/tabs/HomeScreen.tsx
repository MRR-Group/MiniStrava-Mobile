import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { logout } from "@/application/usecases/auth/logout";

export function HomeScreen() {
  const onLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-bg px-5 pt-10">
      <Pressable
        onPress={onLogout}
        className="mt-6 border border-danger/40 rounded-xl py-3"
      >
        <Text className="text-danger text-center font-bold">
          Wyloguj się
        </Text>
      </Pressable>
    </View>
  );
}
