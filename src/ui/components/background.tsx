import React, { PropsWithChildren } from "react";
import { ImageBackground, useWindowDimensions } from "react-native";

export function Background({ children }: PropsWithChildren) {
  const { width, height } = useWindowDimensions();

  return (
    <ImageBackground
      source={require("../../../assets/bg.png")}
      style={{ flex: 1 }}
      resizeMode="stretch"
      imageStyle={{
        height,
        width,
        overflow: "hidden",
        transform: [{ scale: 1.2 }],
      }}
    >
      {children}
    </ImageBackground>
  );
}
