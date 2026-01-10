import React from "react";
import { Pressable, Text } from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
};

export function Button({ title, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-xl border border-white/15 bg-transparent p-3 active:scale-[0.98]"
    >
      <Text className="select-none text-center text-sm text-text">{title}</Text>
    </Pressable>
  );
}
