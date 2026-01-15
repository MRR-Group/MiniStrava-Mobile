import React from "react";
import { Text, View } from "react-native";
import dayjs from "dayjs";

import { Card } from "@/ui/components/Card";
import { useT } from "@/core/i18n/useT";
import { I18N } from "@/core/i18n/keys";
import { ActivityType } from "@infra/db/repositories/activities.repository";

export type ActivityListItemProps = {
  item: {
    id: string;
    title: string | null;
    startAt: number;
    distanceM: number;
    durationS: number;
    type: ActivityType | string;
    status: "recording" | "finished" | "synced" | string;
  };
};

function StatusBadge({ status }: { status: ActivityListItemProps["item"]["status"] }) {
  const { t } = useT();
  const isSynced = status === "synced";

  return (
    <View
      className={
        "self-start rounded-full px-3 py-1 text-xs " +
        (isSynced ? "bg-emerald-500/15 border border-emerald-500/30" : "bg-amber-500/15 border border-amber-500/30")
      }
    >
      <Text className={"text-[11px] " + (isSynced ? "text-emerald-300" : "text-amber-200")}>
        {isSynced ? t(I18N.activities.status.synced) : t(I18N.activities.status.local)}
      </Text>
    </View>
  );
}

function formatDistance(meters: number) {
  const km = meters / 1000;
  if (!Number.isFinite(km) || km <= 0) return "0 km";
  return `${km.toFixed(2)} km`;
}

function formatDuration(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return "0:00";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  return `${m}:${String(s).padStart(2, "0")} min`;
}

function typeLabel(type: ActivityType | string) {
  switch (type) {
    case "run":
      return "🏃";
    case "ride":
      return "🚴";
    case "walk":
      return "🚶";
    default:
      return "🏋";
  }
}

export function ActivityListItem({ item }: ActivityListItemProps) {
  const { t } = useT();
  const dateLabel = dayjs(item.startAt).format("YYYY-MM-DD HH:mm");

  return (
    <View className="p-4 w-full">
      <Card>
        <View className="gap-3 p-4">
          <View className="flex-row items-center gap-3">
            <Text className="text-xl">{typeLabel(item.type)}</Text>
            <View className="w-full">
              <Text className="text-lg font-semibold text-text">{item.title || "—"}</Text>
              <Text className="text-xs text-muted">{dateLabel}</Text>
            </View>
          </View>

          <StatusBadge status={item.status} />

          <View className="flex-row gap-3">
            <View className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <Text className="text-[11px] uppercase tracking-wide text-muted">{t(I18N.activities.fields.distance)}</Text>
              <Text className="text-base font-semibold text-text">{formatDistance(item.distanceM)}</Text>
            </View>
            <View className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <Text className="text-[11px] uppercase tracking-wide text-muted">{t(I18N.activities.fields.duration)}</Text>
              <Text className="text-base font-semibold text-text">{formatDuration(item.durationS)}</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
}
