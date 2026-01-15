import React, { useMemo, useState, useEffect, useRef } from "react";
import { BackHandler, Text, View } from "react-native";
import { router } from "expo-router";
import MapView, { Marker, Polyline, Region } from "react-native-maps";
import * as Location from "expo-location";

import { Screen } from "@/ui/components/screen";
import { Card } from "@/ui/components/card";
import { PrimaryButton } from "@/ui/components/primary-button";
import { Button } from "@/ui/components/button";
import { StatTile } from "@/ui/components/stat-tile";
import { Background } from "@/ui/components/background";

import { useRecordingStore } from "@/state/recording.store";
import { startRecordingUseCase } from "@app/usecases/activities/start-recording";
import { pauseRecordingUseCase } from "@app/usecases/activities/pause-recording";
import { resumeRecordingUseCase } from "@app/usecases/activities/resume-recording";
import { discardRecordingUseCase } from "@app/usecases/activities/discard-recording";
import { useConfirm } from "@/ui/confirm/confirm-context";

import { useT } from "@/core/i18n/use-t";
import { I18N } from "@/core/i18n/keys";
import { useElapsed } from "@ui/hooks/use-elapsed";

function formatTime(totalS: number) {
  const h = Math.floor(totalS / 3600);
  const m = Math.floor((totalS % 3600) / 60);
  const s = totalS % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function formatKm(meters: number) {
  const km = meters / 1000;

  return `${km.toFixed(2)} km`;
}

export function RecordScreen() {
  const { t } = useT();
  const confirm = useConfirm();

  const {
    isRecording,
    isPaused,
    recordingId,
    startedAtMs,
    elapsedMs,
    distanceM,
    points,
  } = useRecordingStore();

  const [loading, setLoading] = useState(false);

  const elapsed = useElapsed(isRecording, elapsedMs, startedAtMs);
  const durationS = Math.floor(elapsed / 1000);

  const minDistanceForSpeed = 20;
  
  const avgSpeedKmh =
    distanceM >= minDistanceForSpeed && durationS > 0
      ? (distanceM / durationS) * 3.6
      : null;

  const mapRef = useRef<MapView | null>(null);
  const coords = useMemo(
    () => points.map((p) => ({ latitude: p.lat, longitude: p.lng })),
    [points]
  );
  const lastCoord = coords[coords.length - 1];
  const [fallbackRegion, setFallbackRegion] = useState<Region>();

  useEffect(() => {
    (async () => {
      try {
        const perm = await Location.requestForegroundPermissionsAsync();
        if (perm.status !== "granted") {
          return;
        }

        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });

        console.log("got current location for map fallback", loc);

        setFallbackRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch (_) {
      }
    })();
  }, []);

  useEffect(() => {
    if (!lastCoord || !mapRef.current) {
      return;
    }

    mapRef.current.animateCamera(
      {
        center: lastCoord,
        zoom: 17,
      },
      { duration: 400 }
    );
  }, [lastCoord]);

  const paceLabel = useMemo(() => {
    if (!avgSpeedKmh) {
      return "—";
    }

    return `${avgSpeedKmh.toFixed(1)} km/h`;
  }, [avgSpeedKmh]);

  const hasDraft = !!recordingId && (isRecording || isPaused);

  const confirmExit = async (): Promise<boolean> => {
    if (!hasDraft) {
      return true;
    }
    
    return await confirm({
      title: t(I18N.record.confirm.exitTitle),
      description: t(I18N.record.confirm.exitDesc),
      confirmText: t(I18N.record.confirm.exitConfirm),
      cancelText: t(I18N.record.confirm.exitCancel),
      destructive: true,
    });
  };

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      confirmExit().then((ok) => {
        if (!ok) {
          return;
        }
        
          discardRecordingUseCase();
        
        router.back();
      });

      return true;
    });

    return () => sub.remove();
  }, [hasDraft]);

  const onStart = async () => {
    setLoading(true);

    try {
      await startRecordingUseCase(t(I18N.record.notification));
    } finally {
      setLoading(false);
    }
  };

  const onStop = async () => {
    await pauseRecordingUseCase();
  };

  const onResume = async () => {
    await resumeRecordingUseCase(t(I18N.record.notification));
  };

  const onSave = () => {
    router.push("/(tabs)/record/save");
  };

  const onDiscard = async () => {
    const ok = await confirm({
      title: t(I18N.record.confirm.discardTitle),
      description: t(I18N.record.confirm.discardDesc),
      confirmText: t(I18N.record.confirm.discardConfirm),
      cancelText: t(I18N.record.confirm.discardCancel),
      destructive: true,
    });

    if (!ok) {
      return;
    }

    await discardRecordingUseCase();
    
    router.replace("/(tabs)");
  };

  const onBack = async () => {
    const ok = await confirmExit();

    if (!ok) {
      return;
    }

    await discardRecordingUseCase();

    router.back();
  };

  return (
    <Background>
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Card>
            <View className="p-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-xl font-bold text-text">{t(I18N.record.title)}</Text>

                <View />
              </View>

              <View className="mt-5 flex-row gap-3">
                <StatTile label={t(I18N.record.stats.time)} value={formatTime(durationS)} />
                <StatTile label={t(I18N.record.stats.distance)} value={formatKm(distanceM)} />
                <StatTile label={t(I18N.record.stats.pace)} value={paceLabel} />
              </View>

              <View className="mt-4 h-56 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                { fallbackRegion && (
                  <MapView
                    ref={mapRef}
                    style={{ flex: 1 }}
                    initialRegion={fallbackRegion ?? {
                      latitude: 0,
                      longitude: 0,
                      latitudeDelta: 0.1,
                      longitudeDelta: 0.1,
                    }}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    pitchEnabled={false}
                    rotateEnabled={false}
                    pointerEvents="none"
                  >
                    {coords.length > 0 && (
                      <>
                        <Polyline coordinates={coords} strokeColor="#ef4444" strokeWidth={4} />
                        <Marker coordinate={coords[0]} title={t(I18N.record.title)} description={t(I18N.record.stats.distance)} />
                        <Marker coordinate={lastCoord} pinColor="#4ade80" title={t(I18N.record.stats.distance)} />
                      </>
                    )}
                  </MapView>
                )}

                {!fallbackRegion && (
                  <View className="flex-1 items-center justify-center">
                    <Text className="text-muted">{t(I18N.common.loading)}</Text>
                  </View>
                )}
              </View>

              <View className="mt-5 gap-3">
                {!hasDraft ? (
                  <>
                    <PrimaryButton
                      title={t(I18N.record.actions.start)}
                      onPress={onStart}
                      loading={loading}
                    />
                    <Button
                      title={t(I18N.record.actions.manual)}
                      onPress={() => router.push("/(tabs)/record/manual?mode=manual")}
                    />
                  </>
                ) : isRecording ? (
                  <>
                    <PrimaryButton title={t(I18N.record.actions.stop)} onPress={onStop} />
                    <Button title={t(I18N.record.actions.back)} onPress={onBack} />
                  </>
                ) : (
                  <>
                    <PrimaryButton title={t(I18N.record.actions.save)} onPress={onSave} />
                    <View className="flex-row gap-3">
                      <View className="flex-1">
                        <Button title={t(I18N.record.actions.resume)} onPress={onResume} />
                      </View>
                      <View className="flex-1">
                        <Button title={t(I18N.record.actions.discard)} onPress={onDiscard} />
                      </View>
                    </View>
                  </>
                )}
              </View>
            </View>
          </Card>
        </View>
      </Screen>
    </Background>
  );
}
