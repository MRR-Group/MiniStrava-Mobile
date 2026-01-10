import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  padded?: boolean;
};

export function Screen({ children, padded = true }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-transparent">
      <View className={padded ? "flex-1 px-6" : "flex-1"}>{children}</View>
    </SafeAreaView>
  );
}
