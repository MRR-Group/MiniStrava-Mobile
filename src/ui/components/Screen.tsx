import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  padded?: boolean;
  scrollable?: boolean;
};

export function Screen({ children, padded = true, scrollable = true }: Props) {
  const paddingClass = padded ? "flex-1 px-6" : "flex-1";

  if (scrollable) {
    return (
      <SafeAreaView className="flex-1 bg-transparent w-full h-full">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className={paddingClass}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-transparent w-full h-full">
      <View className={paddingClass}>{children}</View>
    </SafeAreaView>
  );
}
