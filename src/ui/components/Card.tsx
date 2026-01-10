import React, { PropsWithChildren } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function Card({ children }: PropsWithChildren) {
  return (
    <View className="m-3.5 w-full overflow-hidden rounded-custom border border-white/10 shadow-custom">
      <LinearGradient colors={["#141822", "#0f131b"]} style={{ borderRadius: 18 }}>
        {children}
      </LinearGradient>
    </View>
  );
}
