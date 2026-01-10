import React from "react";
import { Pressable, Text, View } from "react-native";
import { setAppLanguage } from "@/core/i18n/i18n";
import { useT } from "@/core/i18n/useT";

export function LanguageToggle() {
  const { lang } = useT();
  const current = (lang?.startsWith("pl") ? "pl" : "en") as "pl" | "en";

  return (
    <View className="flex-row gap-2">
      {(["pl", "en"] as const).map((l) => (
        <Pressable
          key={l}
          onPress={() => setAppLanguage(l)}
          className={`px-3 py-1.5 rounded-xl border border-white/15 ${
            current === l ? "bg-white/10" : "bg-transparent"
          }`}
        >
          <Text className="text-text font-bold">{l.toUpperCase()}</Text>
        </Pressable>
      ))}
    </View>
  );
}
