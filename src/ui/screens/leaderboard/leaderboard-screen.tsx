import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { router } from "expo-router";

import { getWeeklyLeaderboard, LeaderboardEntry } from "@app/usecases/leaderboard/get-weekly-leaderboard";
import { useSessionStore } from "@/state/session.store";
import { Background } from "@ui/components/background";
import { Screen } from "@ui/components/screen";
import { Card } from "@ui/components/card";
import { Button } from "@ui/components/button";
import { useT } from "@/core/i18n/use-t";
import { I18N } from "@/core/i18n/keys";

function formatDistance(meters: number) {
  const km = meters / 1000;
  if (!Number.isFinite(km) || km <= 0) return "0 km";
  return `${km.toFixed(1)} km`;
}

function initialsFromName(name?: string | null) {
  if (!name) return "";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

type Row = LeaderboardEntry & { position: number; isYou: boolean };

export function LeaderboardScreen() {
  const { t } = useT();
  const user = useSessionStore((s) => s.user);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await getWeeklyLeaderboard();
    const mapped = data
      .sort((a, b) => a.place - b.place)
      .map((r) => ({
      ...r,
        position: r.place,
      isYou: !!user && r.userId === user.id,
    }));
    setRows(mapped);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const yourRow = useMemo(() => rows.find((r) => r.isYou), [rows]);

  const renderItem = ({ item }: { item: Row }) => (
    <View className="w-full px-2 py-1">
      <Card>
        <View className="flex-row items-center flex justify-between gap-3 p-3 w-full">
          <View className="w-10 items-center">
            <Text className="text-lg font-bold text-text">#{item.position}</Text>
          </View>

          <View>
            <Text className="text-base font-semibold text-text">{item.name}</Text>
            {item.isYou ? (
              <Text className="text-xs text-emerald-300">{t(I18N.activities.leaderboard.you)}</Text>
            ) : null}
          </View>

          <View className="items-end">
            <Text className="text-sm text-muted">{t(I18N.activities.leaderboard.distanceThisWeek)}</Text>
            <Text className="text-lg font-semibold text-text">{formatDistance(item.distanceM)}</Text>
          </View>
        </View>
      </Card>
    </View>
  );

  const listEmpty = (
    <Card>
      <View className="p-5">
        <Text className="text-center text-muted">{t(I18N.activities.leaderboard.empty)}</Text>
      </View>
    </Card>
  );

  return (
    <Background>
      <Screen scrollable={false}>
        <View className="flex-1 gap-4 py-6 w-full">
          <View className="flex-row items-center justify-between px-2">
            <Text className="text-2xl font-bold text-text">{t(I18N.activities.leaderboard.title)}</Text>
            <Button title={loading ? t(I18N.common.loading) : t(I18N.activities.leaderboard.refresh)} onPress={load} />
          </View>

          {yourRow ? (
            <Card>
              <View className="gap-2 p-4">
                <Text className="text-xs text-muted">{t(I18N.activities.leaderboard.you)}</Text>
                <Text className="text-xl font-semibold text-text">{yourRow.name}</Text>
                <Text className="text-sm text-text">{t(I18N.activities.leaderboard.yourPosition, { pos: `#${yourRow.position}` })}</Text>
                <Text className="text-sm text-muted">{formatDistance(yourRow.distanceM)}</Text>
              </View>
            </Card>
          ) : null}

          <FlatList
            data={rows}
            keyExtractor={(item) => `${item.userId}`}
            renderItem={renderItem}
            ListEmptyComponent={listEmpty}
            className="flex-1 w-full"
            contentContainerStyle={{ flexGrow: 1, justifyContent: rows.length ? "flex-start" : "center", alignItems: "center", paddingHorizontal: 4 }}
          />

          <View className="px-2">
            <Button title={t(I18N.common.back)} onPress={() => router.back()} />
          </View>
        </View>
      </Screen>
    </Background>
  );
}