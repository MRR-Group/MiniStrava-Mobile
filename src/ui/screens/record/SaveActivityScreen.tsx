import React, { useEffect, useState } from "react";
import { BackHandler, Image, Text, View, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import dayjs from "dayjs";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { Screen } from "@/ui/components/Screen";
import { Card } from "@/ui/components/Card";
import { Input } from "@/ui/components/Input";
import { PrimaryButton } from "@/ui/components/PrimaryButton";
import { Button } from "@/ui/components/Button";
import { Segmented } from "@/ui/components/Segmented";

import { useRecordingStore } from "@/state/recording.store";
import { saveRecordingUseCase } from "@app/usecases/activities/save-recording";
import { discardRecordingUseCase } from "@app/usecases/activities/discard-recording";
import { saveManualActivityUseCase } from "@app/usecases/activities/save-manual-activity";
import { useConfirm } from "@/ui/confirm/ConfirmContext";

import { useT } from "@/core/i18n/useT";
import { I18N } from "@/core/i18n/keys";
import { Background } from "@ui/components/Background";
import { ActivityType } from "@infra/db/repositories/activities.repository";

type Form = {
  title: string;
  notes: string;
  photoUri: string | null;
  distance: string;
  duration: string;
  date: string;
  time: string;
};

export function SaveActivityScreen() {
  const { t } = useT();
  const confirm = useConfirm();
  const params = useLocalSearchParams();
  const isManual = params.mode === "manual";

  const { recordingId } = useRecordingStore();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<ActivityType>("run");

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<Form>({
    defaultValues: {
      title: "",
      notes: "",
      photoUri: null,
      distance: "",
      duration: "",
      date: dayjs().format("YYYY-MM-DD"),
      time: dayjs().format("HH:mm"),
    },
  });

  const photoUri = watch("photoUri");
  const dateValue = watch("date");
  const timeValue = watch("time");

  const confirmLeave = async (): Promise<boolean> => {
    if (!isDirty) {
      return true;
    }

    return await confirm({
      title: t(I18N.record.save.confirm.leaveTitle),
      description: t(I18N.record.save.confirm.leaveDesc),
      confirmText: t(I18N.record.save.confirm.leaveConfirm),
      cancelText: t(I18N.record.save.confirm.leaveCancel),
      destructive: true,
    });
  };

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      confirmLeave().then((ok) => ok && router.back());
      
      return true;
    });

    return () => sub.remove();
  }, [isDirty]);

  const pickPhoto = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      await confirm({
        title: t(I18N.record.save.photo.permission),
        confirmText: "OK",
        cancelText: "OK",
      });

      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
    });

    if (res.canceled) {
      return;
    }

    const uri = res.assets?.[0]?.uri ?? null;

    if (uri) {
      setValue("photoUri", uri, { shouldDirty: true });
    }
  };

  const removePhoto = () => {
    setValue("photoUri", null, { shouldDirty: true });
  };

  const openDatePicker = () => {
    if (Platform.OS !== "android") return;

    DateTimePickerAndroid.open({
      value: dayjs(dateValue, "YYYY-MM-DD", true).isValid()
        ? dayjs(dateValue, "YYYY-MM-DD").toDate()
        : new Date(),
      mode: "date",
      onChange: (_, selectedDate) => {
        if (selectedDate) {
          setValue("date", dayjs(selectedDate).format("YYYY-MM-DD"), { shouldDirty: true });
        }
      },
    });
  };

  const openTimePicker = () => {
    if (Platform.OS !== "android") return;

    const base = dayjs(`${dateValue} ${timeValue}`, "YYYY-MM-DD HH:mm", true).isValid()
      ? dayjs(`${dateValue} ${timeValue}`, "YYYY-MM-DD HH:mm")
      : dayjs();

    DateTimePickerAndroid.open({
      value: base.toDate(),
      mode: "time",
      is24Hour: true,
      onChange: (_, selectedDate) => {
        if (selectedDate) {
          setValue("time", dayjs(selectedDate).format("HH:mm"), { shouldDirty: true });
        }
      },
    });
  };

  const onBack = async () => {
    const ok = await confirmLeave();

    if (ok) {
      router.back();
    }
  };

  const onSubmit = handleSubmit(async (v) => {
    if (!recordingId) {
      const distanceKm = parseFloat(v.distance);
      const durationMin = parseFloat(v.duration);

      if (!Number.isFinite(distanceKm) || distanceKm <= 0) {
        setError("distance", { message: t(I18N.record.save.errors.distanceRequired) as any });
        return;
      }

      if (distanceKm < 0.001) {
        setError("distance", { message: t(I18N.record.save.errors.distanceMin) as any });
        return;
      }

      if (!Number.isFinite(durationMin) || durationMin <= 0) {
        setError("duration", { message: t(I18N.record.save.errors.durationRequired) as any });
        return;
      }

      const startAt = dayjs(`${v.date} ${v.time}`, "YYYY-MM-DD HH:mm", true);
      if (!startAt.isValid()) {
        setError("date", { message: t(I18N.record.save.errors.dateRequired) as any });
        setError("time", { message: t(I18N.record.save.errors.timeRequired) as any });
        return;
      }

      const distanceM = Math.round(distanceKm * 1000);
      const durationS = Math.round(durationMin * 60);

      setLoading(true);

      try {
        await saveManualActivityUseCase({
          type,
          title: v.title.trim(),
          notes: v.notes.trim() || null,
          photoUri: v.photoUri,
          distanceM,
          durationS,
          startAtMs: startAt.valueOf(),
        });
        reset();
        router.replace("/(tabs)");
      } finally {
        setLoading(false);
      }

      return;
    }

    setLoading(true);

    try {
      await saveRecordingUseCase({
        type,
        title: v.title.trim(),
        notes: v.notes.trim() || null,
        photoUri: v.photoUri,
      });
      reset();
      router.replace("/(tabs)");
    } finally {
      setLoading(false);
    }
  });

  const onDiscard = async () => {
    const ok = await confirm({
      title: t(I18N.record.save.confirm.discardTitle),
      description: t(I18N.record.save.confirm.discardDesc),
      confirmText: t(I18N.record.save.confirm.discardConfirm),
      cancelText: t(I18N.record.save.confirm.discardCancel),
      destructive: true,
    });

    if (!ok) {
      return;
    }

    await discardRecordingUseCase();
    reset();
    router.replace("/(tabs)");
  };

  return (
    <Background>
      <Screen>
        <View className="flex-1 items-center justify-center py-6">
          <Card>
            <Text className="border-b-[0.25px] border-white/10 p-4 pb-3 text-2xl font-bold text-text">
              {t(I18N.record.save.title)}
            </Text>

            <View className="gap-4 p-4">
              <Segmented<ActivityType>
                value={type}
                onChange={setType}
                items={[
                  { key: "run", label: t(I18N.record.types.run) },
                  { key: "walk", label: t(I18N.record.types.walk) },
                  { key: "ride", label: t(I18N.record.types.bike) },
                  { key: "other", label: t(I18N.record.types.other) },
                ]}
              />

              <Input<Form>
                control={control}
                name="title"
                label={t(I18N.record.save.fields.title)}
                placeholder={t(I18N.record.save.fields.titlePlaceholder)}
                errors={errors}
                rules={{
                  required: t(I18N.record.save.errors.titleRequired),
                  minLength: { value: 2, message: t(I18N.record.save.errors.titleMin) },
                  maxLength: { value: 255, message: t(I18N.record.save.errors.titleMax) },
                }}
              />

              {(!recordingId || isManual) && (
                <>
                  <View className="flex-row gap-3">
                    <View className="flex-1">
                      <Input<Form>
                        control={control}
                        name="distance"
                        label={t(I18N.record.save.fields.distance)}
                        placeholder={t(I18N.record.save.fields.distance)}
                        errors={errors}
                        rules={{ required: t(I18N.record.save.errors.distanceRequired) }}
                      />
                    </View>

                    <View className="flex-1">
                      <Input<Form>
                        control={control}
                        name="duration"
                        label={t(I18N.record.save.fields.duration)}
                        placeholder={t(I18N.record.save.fields.duration)}
                        errors={errors}
                        rules={{ required: t(I18N.record.save.errors.durationRequired) }}
                      />
                    </View>
                  </View>

                  <View className="flex-row gap-3">
                    <View className="flex-1">
                      <Input<Form>
                        control={control}
                        name="date"
                        label={t(I18N.record.save.fields.date)}
                        placeholder="YYYY-MM-DD"
                        errors={errors}
                        rules={{ required: t(I18N.record.save.errors.dateRequired) }}
                      />

                      {Platform.OS === "android" ? (
                        <View className="mt-2">
                          <Button title={t(I18N.record.save.fields.date)} onPress={openDatePicker} />
                        </View>
                      ) : null}
                    </View>

                    <View className="flex-1">
                      <Input<Form>
                        control={control}
                        name="time"
                        label={t(I18N.record.save.fields.time)}
                        placeholder="HH:mm"
                        errors={errors}
                        rules={{ required: t(I18N.record.save.errors.timeRequired) }}
                      />

                      {Platform.OS === "android" ? (
                        <View className="mt-2">
                          <Button title={t(I18N.record.save.fields.time)} onPress={openTimePicker} />
                        </View>
                      ) : null}
                    </View>
                  </View>
                </>
              )}

              <Input<Form>
                control={control}
                name="notes"
                label={t(I18N.record.save.fields.notes)}
                placeholder={t(I18N.record.save.fields.notesPlaceholder)}
                errors={errors}
              />

              <View className="gap-2">
                <Text className="text-xs text-muted">{t(I18N.record.save.photo.label)}</Text>

                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <Button
                      title={photoUri ? t(I18N.record.save.photo.change) : t(I18N.record.save.photo.add)}
                      onPress={pickPhoto}
                    />
                  </View>

                  {photoUri ? (
                    <View className="flex-1">
                      <Button title={t(I18N.record.save.photo.remove)} onPress={removePhoto} />
                    </View>
                  ) : null}
                </View>

                {photoUri ? (
                  <View className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <Image
                      source={{ uri: photoUri }}
                      style={{ width: "100%", height: 180 }}
                      resizeMode="cover"
                    />
                  </View>
                ) : null}
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Button title={t(I18N.record.save.actions.back)} onPress={onBack} />
                </View>

                <View className="flex-1">
                  <Button title={t(I18N.record.save.actions.discard)} onPress={onDiscard} />
                </View>
              </View>

              <PrimaryButton
                title={t(I18N.record.save.actions.save)}
                loading={loading}
                onPress={onSubmit}
              />
            </View>
          </Card>
        </View>
      </Screen>
    </Background>
  );
}