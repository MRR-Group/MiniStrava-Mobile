import React from "react";
import { Pressable, Text, View } from "react-native";
import clsx from "clsx";

type Item<T extends string> = { key: T; label: string };

type Props<T extends string> = {
  items: Item<T>[];
  value: T;
  onChange: (v: T) => void;
};

export function Segmented<T extends string>({ items, value, onChange }: Props<T>) {
  return (
    <View className="flex-row overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      {items.map((it, idx) => {
        const active = it.key === value;

        return (
          <Pressable
            key={it.key}
            onPress={() => onChange(it.key)}
            className={clsx(
              "px-2.5 py-2 flex-1 text-center items-center justify-center",
              idx !== 0 && "border-l border-white/10",
              active ? "bg-white/10" : "bg-transparent"
            )}
          >
            <Text className={clsx("text-xs", active ? "text-text font-bold" : "text-muted")}>
              {it.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
