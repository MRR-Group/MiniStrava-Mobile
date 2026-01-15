import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";

import { listActivities } from "@app/usecases/activities/list-activities";
import { syncPendingOnce } from "@app/usecases/services/sync/sync-pending";
import { Background } from "@ui/components/background";
import { Card } from "@ui/components/card";
import { Button } from "@ui/components/button";
import { useT } from "@/core/i18n/use-t";
import { I18N } from "@/core/i18n/keys";
import { ActivityListItem } from "@/ui/components/activity-list-item";
import { Screen } from "@ui/components/screen";
import { Segmented } from "@ui/components/segmented";

type ActivityItem = Awaited<ReturnType<typeof listActivities>>[number];

type TypeFilter = "all" | "run" | "ride" | "walk" | "other";
type DateFilter = "all" | "7d" | "30d";
type SortOption = "date_desc" | "date_asc" | "distance_desc" | "distance_asc";

export function ActivitiesScreen() {
  const { t } = useT();
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [sort, setSort] = useState<SortOption>("date_desc");

  const load = async () => {
    try {
      await syncPendingOnce();
    } catch {
    }
    const data = await listActivities(200);
    setItems(data);
  };

  const handleSyncPress = async () => {
    if (syncing) {
      return;
    }
    setSyncing(true);
    try {
      await syncPendingOnce();
    } finally {
      const data = await listActivities(200);
      setItems(data);
      setSyncing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      load();
    }, [])
  );

  useEffect(() => {
    load();
  }, []);

  const filteredAndSorted = useMemo(() => {
    const now = Date.now();
    const rangeMs = dateFilter === "7d" ? 7 * 86400000 : dateFilter === "30d" ? 30 * 86400000 : null;

    return [...items]
      .filter((item) => {
        if (typeFilter !== "all" && item.type !== typeFilter) return false;
        if (rangeMs && item.startAt < now - rangeMs) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sort) {
          case "date_asc":
            return a.startAt - b.startAt;
          case "date_desc":
            return b.startAt - a.startAt;
          case "distance_asc":
            return a.distanceM - b.distanceM;
          case "distance_desc":
            return b.distanceM - a.distanceM;
          default:
            return 0;
        }
      });
  }, [items, typeFilter, dateFilter, sort]);

  const renderItem = ({ item }: { item: ActivityItem }) => <ActivityListItem item={item} />;

  const listEmpty = (
    <Card>
      <View className="p-5">
        <Text className="text-center text-muted">{t(I18N.activities.listEmpty)}</Text>
      </View>
    </Card>
  );

  return (
    <Background>
      <Screen scrollable={false}>
        <View className="flex-1 gap-4 py-6">
          <View className="flex-row items-center justify-between px-2">
            <Text className="text-2xl font-bold text-text">{t(I18N.activities.title)}</Text>
            <Button title={syncing ? t(I18N.activities.actions.syncing) : t(I18N.activities.actions.sync)} onPress={handleSyncPress} />
          </View>

          <View className="gap-3 px-2">
            <View className="gap-2">
              <Text className="text-xs text-muted">{t(I18N.activities.filters.type)}</Text>
              <Segmented<TypeFilter>
                value={typeFilter}
                onChange={setTypeFilter}
                items={[
                  { key: "all", label: t(I18N.activities.filters.typeAll) },
                  { key: "run", label: t(I18N.activities.filters.typeRun) },
                  { key: "ride", label: t(I18N.activities.filters.typeRide) },
                  { key: "walk", label: t(I18N.activities.filters.typeWalk) },
                  { key: "other", label: t(I18N.activities.filters.typeOther) },
                ]}
              />
            </View>

            <View className="gap-2">
              <Text className="text-xs text-muted">{t(I18N.activities.filters.date)}</Text>
              <Segmented<DateFilter>
                value={dateFilter}
                onChange={setDateFilter}
                items={[
                  { key: "all", label: t(I18N.activities.filters.dateAll) },
                  { key: "7d", label: t(I18N.activities.filters.date7d) },
                  { key: "30d", label: t(I18N.activities.filters.date30d) },
                ]}
              />
            </View>

            <View className="gap-2">
              <Text className="text-xs text-muted">{t(I18N.activities.filters.sort)}</Text>
              <Segmented<SortOption>
                value={sort}
                onChange={setSort}
                items={[
                  { key: "date_desc", label: t(I18N.activities.filters.sortDateDesc) },
                  { key: "date_asc", label: t(I18N.activities.filters.sortDateAsc) },
                  { key: "distance_desc", label: t(I18N.activities.filters.sortDistanceDesc) },
                  { key: "distance_asc", label: t(I18N.activities.filters.sortDistanceAsc) },
                ]}
              />
            </View>
          </View>

          <FlatList
            data={filteredAndSorted}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={listEmpty}
            className="flex-1 w-full"
            contentContainerStyle={
               { flexGrow: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 8 }
            }
          />
        </View>
      </Screen>
    </Background>
  );
}
