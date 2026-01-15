import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";

import { listActivities } from "@app/usecases/activities/list-activities";
import { Background } from "@ui/components/Background";
import { Screen } from "@ui/components/Screen";
import { Card } from "@ui/components/Card";
import { useT } from "@/core/i18n/useT";
import { I18N } from "@/core/i18n/keys";
import { ActivityListItem } from "@/ui/components/ActivityListItem";

type ActivityItem = Awaited<ReturnType<typeof listActivities>>[number];

export function ActivitiesScreen() {
  const { t } = useT();
  const [items, setItems] = useState<ActivityItem[]>([]);

  const load = async () => {
    const data = await listActivities(200);
    setItems(data);
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
          <Text className="px-2 text-2xl font-bold text-text">{t(I18N.activities.title)}</Text>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={listEmpty}
            className="flex-1 w-full"
            contentContainerStyle={
              { flexGrow: 1, justifyContent: "center", alignItems: "center" }
            }
          />
        </View>
      </Screen>
    </Background>
  );
}
