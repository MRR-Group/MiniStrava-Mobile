import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";

import { listActivities } from "@app/usecases/activities/list-activities";
import { syncPendingOnce } from "@app/usecases/services/sync/sync-pending";
import { Background } from "@ui/components/background";
import { Screen } from "@ui/components/screen";
import { Card } from "@ui/components/card";
import { Button } from "@ui/components/button";
import { useT } from "@/core/i18n/use-t";
import { I18N } from "@/core/i18n/keys";
import { ActivityListItem } from "@/ui/components/activity-list-item";

type ActivityItem = Awaited<ReturnType<typeof listActivities>>[number];

export function ActivitiesScreen() {
  const { t } = useT();
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [syncing, setSyncing] = useState(false);

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
          <FlatList
            data={items}
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
