import React from "react";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOnline } from "@/ui/hooks/use-online";
import { useT } from "@/core/i18n/use-t";
import { I18N } from "@/core/i18n/keys";

type Props = {
  children: React.ReactNode;
  padded?: boolean;
  scrollable?: boolean;
};

export function Screen({ children, padded = true, scrollable = true }: Props) {
  const online = useOnline();
  const { t } = useT();
  const paddingClass = padded ? "flex-1 px-6" : "flex-1";

  const Banner = (
    !online ? (
      <View className="w-full bg-amber-500/15 border-b border-amber-400/40 px-4 py-2">
        <Text className="text-xs font-semibold text-amber-100 text-center">{t(I18N.common.offline)}</Text>
      </View>
    ) : null
  );

  if (scrollable) {
    return (
      <SafeAreaView className="flex-1 bg-transparent w-full h-full">
        {Banner}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className={paddingClass}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-transparent w-full h-full">
      {Banner}
      <View className={paddingClass}>{children}</View>
    </SafeAreaView>
  );
}
