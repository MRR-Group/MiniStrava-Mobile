import React, { useEffect, useMemo } from "react";
import { Image, Text, View } from "react-native";
import { router } from "expo-router";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

import { logout } from "@/application/usecases/auth/logout";
import { getProfileSummary } from "@app/usecases/profile/get-profile-summary";
import { useSessionStore } from "@/state/session.store";
import { useT } from "@/core/i18n/useT";
import { I18N } from "@/core/i18n/keys";
import { Background } from "@ui/components/Background";
import { Screen } from "@/ui/components/Screen";
import { Card } from "@/ui/components/Card";
import { StatTile } from "@/ui/components/StatTile";
import { Button } from "@/ui/components/Button";
import { PrimaryButton } from "@/ui/components/PrimaryButton";
import { AuthApi } from "@/infrastructure/api/auth.api";

function formatDistance(meters: number) {
  const km = meters / 1000;
  if (!Number.isFinite(km) || km <= 0) return "0 km";

  return `${km.toFixed(1)} km`;
}

function formatDuration(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return "0:00";

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  if (h > 0) {
    return `${h}h ${String(m).padStart(2, "0")}m`;
  }

  return `${m}:${String(s).padStart(2, "0")} min`;
}

function formatPace(totalDistanceM: number, totalSeconds: number) {
  if (!totalDistanceM || !totalSeconds) return "—";

  const pace = totalSeconds / (totalDistanceM / 1000);
  const m = Math.floor(pace / 60);
  const s = Math.round(pace % 60);

  if (!Number.isFinite(m) || m < 0) return "—";

  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")} /km`;
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <Text className="text-xs text-muted">{label}</Text>
      <Text className="pt-1 text-text">{value || "—"}</Text>
    </View>
  );
}

export function ProfileScreen() {
  const { t } = useT();
  const user = useSessionStore((s) => s.user);
  const setUser = useSessionStore((s) => s.setUser);

  const { data: summary, refetch, isFetching } = useQuery({
    queryKey: ["profile-summary"],
    queryFn: getProfileSummary,
  });

  const {
    data: me,
    isFetching: isFetchingUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["me"],
    queryFn: AuthApi.me,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (me) {
      void setUser(me);
    }
  }, [me, setUser]);

  const memberSince = useMemo(() => {
    if (!user?.created_at) return "";

    return dayjs(user.created_at).format("YYYY.MM.DD");
  }, [user?.created_at]);

  const lastActivity = useMemo(() => {
    if (!summary?.lastActivityAtMs) return t(I18N.profile.placeholders.noActivity);

    return dayjs(summary.lastActivityAtMs).format("YYYY.MM.DD HH:mm");
  }, [summary?.lastActivityAtMs, t]);

  const paceLabel = useMemo(
    () => formatPace(summary?.totalDistanceM ?? 0, summary?.totalDurationS ?? 0),
    [summary?.totalDistanceM, summary?.totalDurationS]
  );

  const onLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  const avatarInitials = initialsFromName(user?.name);
  const statsDistance = formatDistance(summary?.totalDistanceM ?? 0);
  const statsTime = formatDuration(summary?.totalDurationS ?? 0);

  const onRefresh = () => {
    refetch();
    refetchUser();
  };

  return (
    <Background>
      <Screen>
        <View className="flex-1 items-center justify-center py-6">
          <Card>
            <View className="gap-4 p-5">
              <Text className="text-sm text-muted">{t(I18N.profile.greeting)}</Text>
              <View className="flex-row items-center gap-4">
                {user?.avatar ? (
                  <Image
                    source={{ uri: user.avatar }}
                    className="h-16 w-16 rounded-2xl border border-white/10 bg-white/10"
                  />
                ) : (
                  <View className="h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <Text className="text-lg font-bold text-text">{avatarInitials || "?"}</Text>
                  </View>
                )}

                <View className="flex-1">
                  <Text className="text-2xl font-bold text-text">{user?.name ?? "-"}</Text>
                  <Text className="text-sm text-muted">{user?.email ?? ""}</Text>

                  {memberSince ? (
                    <View className="mt-2 self-start rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      <Text className="text-[11px] text-muted">
                        {t(I18N.profile.memberSince)} {memberSince}
                      </Text>
                    </View>
                  ) : null}
                </View>

                <View className="items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                  <Text className="text-xs text-muted">{t(I18N.profile.metrics.activities)}</Text>
                  <Text className="text-lg font-bold text-text">{summary?.totalActivities ?? 0}</Text>
                </View>
              </View>
            </View>
          </Card>

          <Card>
            <View className="gap-4 p-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-text">{t(I18N.profile.title)}</Text>
                <Button
                  title={
                    isFetching || isFetchingUser
                      ? `${t(I18N.common.loading)}...`
                      : t(I18N.profile.actions.refresh)
                  }
                  onPress={onRefresh}
                />
              </View>

              <View className="gap-3">
                <View className="flex-row gap-3">
                  <StatTile label={t(I18N.profile.metrics.distance)} value={statsDistance} />
                  <StatTile label={t(I18N.profile.metrics.time)} value={statsTime} />
                </View>
                <View className="flex-row gap-3">
                  <StatTile label={t(I18N.profile.metrics.pace)} value={paceLabel} />
                  <StatTile label={t(I18N.profile.lastActivity)} value={lastActivity} />
                </View>
              </View>
            </View>
          </Card>

          <Card>
            <View className="gap-3 p-5">
              <View className="gap-3">
                <InfoRow label={t(I18N.profile.details.email)} value={user?.email ?? ""} />
                <InfoRow label={t(I18N.profile.details.name)} value={user?.name ?? ""} />
                <InfoRow label={t(I18N.profile.details.birth)} value={user?.birth_date ?? ""} />
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <InfoRow
                      label={t(I18N.profile.details.height)}
                      value={user?.height ? `${user.height} cm` : ""}
                    />
                  </View>
                  <View className="flex-1">
                    <InfoRow
                      label={t(I18N.profile.details.weight)}
                      value={user?.weight ? `${user.weight} kg` : ""}
                    />
                  </View>
                </View>
              </View>

              <PrimaryButton title={t(I18N.profile.actions.logout)} onPress={onLogout} />
            </View>
          </Card>
        </View>
      </Screen>
    </Background>
  );
}
