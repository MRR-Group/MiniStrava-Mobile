import { PropsWithChildren } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const Card = ({children}: PropsWithChildren) => (
  <View className="border rounded-custom border-black/5 shadow-custom m-3.5 w-full">
    <LinearGradient colors={["#141822", "#0f131b"]} style={{borderRadius: 18 }}>
      {children}
    </LinearGradient>
  </View>
);