import React from "react";
import { Pressable, Text, ActivityIndicator, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import clsx from "clsx";
import { useT } from "@core/i18n/use-t";
import { I18N } from "@core/i18n/keys";

type Props = {
  title: string;
  loading?: boolean;
  onPress?: () => void;
};

export function PrimaryButton({ title, loading, onPress }: Props) {
  const { t } = useT();  

  return (
    <Pressable
      disabled={!!loading}
      onPress={onPress}
      className={clsx(
        "rounded-custom overflow-hidden",
        !loading && "active:scale-[0.98]",
        loading && "opacity-70"
      )}
    >
      <LinearGradient
        dither
        start={{ x: 0.2, y: 1 }}
        end={{ x: 0.8, y: 0 }}
        colors={["#7c5cff", "#8668ff", "#6f97ff", "#54e0ff", "#4ffaff"]}
        style={{ borderRadius: 18 }}
      >
        <View className="flex-row items-center justify-center gap-2 p-4">
          {loading ? <ActivityIndicator /> : null}
          <Text className="select-none text-center text-sm font-bold text-text">
            {loading ? `${t(I18N.common.loading)}...` : title}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
