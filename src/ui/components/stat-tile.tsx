import React from "react";
import { Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
};

export function StatTile({ label, value }: Props) {
  return (
    <View className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <Text className="text-xs text-muted">{label}</Text>
      <Text className="pt-1 font-bold text-text">{value}</Text>
    </View>
  );
}
