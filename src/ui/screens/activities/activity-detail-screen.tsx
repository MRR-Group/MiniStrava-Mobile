import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Image, Text, View } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import dayjs from "dayjs";
import MapView, { Marker, Polyline, Region } from "react-native-maps";

import { getActivityUseCase } from "@app/usecases/activities/get-activity";
import { deleteActivityUseCase } from "@app/usecases/activities/delete-activity";
import { getActivityPointsUseCase } from "@app/usecases/activities/get-activity-points";
import { ActivityType } from "@infra/db/repositories/activities.repository";
import { Background } from "@ui/components/background";
import { Screen } from "@ui/components/screen";
import { Card } from "@ui/components/card";
import { Button } from "@ui/components/button";
import { PrimaryButton } from "@ui/components/primary-button";
import { useConfirm } from "@/ui/confirm/confirm-context";
import { useT } from "@/core/i18n/use-t";
import { I18N } from "@/core/i18n/keys";

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
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatPace(secondsPerKm: number | null) {
  if (!secondsPerKm || secondsPerKm <= 0) return "—";
  const m = Math.floor(secondsPerKm / 60);
  const s = Math.round(secondsPerKm % 60);
  return `${m}:${String(s).padStart(2, "0")} /km`;
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

export function ActivityDetailScreen() {
  const { t } = useT();
  const confirm = useConfirm();
  const params = useLocalSearchParams<{ id: string }>();
  const activityId = typeof params.id === "string" ? params.id : "";

  const [activity, setActivity] = useState<Awaited<ReturnType<typeof getActivityUseCase>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [points, setPoints] = useState<Array<{ lat: number; lng: number }>>([]);

  const mapRef = useRef<MapView | null>(null);
  const coords = useMemo(() => points.map((p) => ({ latitude: p.lat, longitude: p.lng })), [points]);
  const lastCoord = coords[coords.length - 1];
  const [fallbackRegion, setFallbackRegion] = useState<Region>();

  const load = useCallback(async () => {
    if (!activityId) {
      setActivity(null);
      setLoading(false);
      return;
    }

    const data = await getActivityUseCase(activityId);
    setActivity(data);

    if (data) {
      const pts = await getActivityPointsUseCase(activityId);
      setPoints(pts.map((p) => ({ lat: p.lat, lng: p.lng })));
    } else {
      setPoints([]);
    }
    setLoading(false);
  }, [activityId]);

  useEffect(() => {
    if (fallbackRegion || coords.length === 0) return;
    const first = coords[0];
    setFallbackRegion({ latitude: first.latitude, longitude: first.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
  }, [coords, fallbackRegion]);

  useEffect(() => {
    if (!lastCoord || !mapRef.current) return;
    mapRef.current.animateCamera({ center: lastCoord, zoom: 16 }, { duration: 300 });
  }, [lastCoord]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const handleDelete = async () => {
    if (!activityId) return;

    const ok = await confirm({
      title: t(I18N.activities.detail.confirm.deleteTitle),
      description: t(I18N.activities.detail.confirm.deleteDesc),
      confirmText: t(I18N.activities.detail.confirm.deleteConfirm),
      cancelText: t(I18N.activities.detail.confirm.deleteCancel),
      destructive: true,
    });

    if (!ok) return;

    setDeleting(true);
    await deleteActivityUseCase(activityId);
    setDeleting(false);
    router.replace("/(tabs)/activities");
  };

  const handleEdit = () => {
    if (!activityId) return;
    router.push({ pathname: "/(tabs)/activities/[id]/edit", params: { id: activityId } });
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/activities");
    }
  };

  const notFound = !loading && !activity;

  return (
    <Background>
      <Screen>
        <View className="gap-4 py-6">
          <View className="flex-row items-center justify-between px-2">
            <Text className="text-2xl font-bold text-text">{t(I18N.activities.detail.title)}</Text>
            <Button title={t(I18N.activities.detail.back)} onPress={handleBack} />
          </View>

          {loading ? (
            <Card>
              <View className="p-5">
                <Text className="text-center text-muted">{t(I18N.common.loading)}</Text>
              </View>
            </Card>
          ) : null}

          {notFound ? (
            <Card>
              <View className="p-5 gap-3">
                <Text className="text-lg font-semibold text-text">{t(I18N.activities.detail.notFound)}</Text>
                <Button title={t(I18N.activities.detail.back)} onPress={handleBack} />
              </View>
            </Card>
          ) : null}

          {!loading && activity ? (
            <View className="gap-4">
              <Card>
                <View className="gap-4 p-5">
                  <View className="flex-row items-center gap-3">
                    <Text className="text-3xl">{typeLabel(activity.type)}</Text>
                    <View className="flex-1">
                      <Text className="text-xl font-semibold text-text">{activity.title || "—"}</Text>
                      <Text className="text-xs text-muted">{dayjs(activity.startAt).format("YYYY-MM-DD HH:mm")}</Text>
                    </View>
                  </View>

                  <View className="flex-row gap-3">
                    <View className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <Text className="text-[11px] uppercase tracking-wide text-muted">{t(I18N.activities.fields.distance)}</Text>
                      <Text className="text-lg font-semibold text-text">{formatDistance(activity.distanceM)}</Text>
                    </View>
                    <View className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <Text className="text-[11px] uppercase tracking-wide text-muted">{t(I18N.activities.fields.duration)}</Text>
                      <Text className="text-lg font-semibold text-text">{formatDuration(activity.durationS)}</Text>
                    </View>
                    <View className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <Text className="text-[11px] uppercase tracking-wide text-muted">{t(I18N.activities.detail.pace)}</Text>
                      <Text className="text-lg font-semibold text-text">{formatPace(activity.avgPaceSecPerKm)}</Text>
                    </View>
                  </View>

                  <View className="mt-2 h-56 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    {coords.length > 0 ? (
                      <MapView
                        ref={mapRef}
                        style={{ flex: 1 }}
                        initialRegion={fallbackRegion || {
                          latitude: coords[0].latitude,
                          longitude: coords[0].longitude,
                          latitudeDelta: 0.01,
                          longitudeDelta: 0.01,
                        }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        rotateEnabled={false}
                        pointerEvents="none"
                      >
                        <Polyline coordinates={coords} strokeColor="#ef4444" strokeWidth={4} />
                        <Marker coordinate={coords[0]} pinColor="#ef4444" />
                        <Marker coordinate={coords[coords.length - 1]} pinColor="#22c55e" />
                      </MapView>
                    ) : (
                      <View className="flex-1 items-center justify-center">
                        <Text className="text-muted">{t(I18N.common.loading)}</Text>
                      </View>
                    )}
                  </View>

                  {activity.notes ? (
                    <View className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <Text className="text-[11px] uppercase tracking-wide text-muted">{t(I18N.record.save.fields.notes)}</Text>
                      <Text className="text-base text-text">{activity.notes}</Text>
                    </View>
                  ) : null}

                  {activity.photoUri ? (
                    <View className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                      <Image source={{ uri: activity.photoUri }} style={{ width: "100%", height: 220 }} resizeMode="cover" />
                    </View>
                  ) : null}
                </View>
              </Card>

              <View className="flex-row gap-3 px-2">
                <View className="flex-1">
                  <Button title={t(I18N.activities.detail.edit)} onPress={handleEdit} />
                </View>
                <View className="flex-1">
                  <Button title={deleting ? t(I18N.activities.detail.deleting) : t(I18N.activities.detail.delete)} onPress={handleDelete} disabled={deleting} />
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </Screen>
    </Background>
  );
}
