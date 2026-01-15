import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, Image, Platform, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import dayjs from "dayjs";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { getActivityUseCase } from "@app/usecases/activities/get-activity";
import { updateActivityUseCase } from "@app/usecases/activities/update-activity";
import { ActivityType } from "@infra/db/repositories/activities.repository";
import { Background } from "@ui/components/background";
import { Screen } from "@ui/components/screen";
import { Card } from "@ui/components/card";
import { Input } from "@ui/components/input";
import { PrimaryButton } from "@ui/components/primary-button";
import { Button } from "@ui/components/button";
import { Segmented } from "@ui/components/segmented";
import { useConfirm } from "@/ui/confirm/confirm-context";
import { useT } from "@/core/i18n/use-t";
import { I18N } from "@/core/i18n/keys";

type Form = {
  title: string;
  notes: string;
  photoUri: string | null;
  distance: string;
  duration: string;
  date: string;
  time: string;
};

export function ActivityEditScreen() {
  const { t } = useT();
  const confirm = useConfirm();
  const params = useLocalSearchParams<{ id: string }>();
  const activityId = typeof params.id === "string" ? params.id : "";

  const [type, setType] = useState<ActivityType>("run");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [missing, setMissing] = useState(false);

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

  const hydrate = useCallback(async () => {
    if (!activityId) {
      setMissing(true);
      setLoading(false);
      return;
    }
    const data = await getActivityUseCase(activityId);
    if (data) {
      setType((data.type as ActivityType) ?? "run");
      reset({
        title: data.title ?? "",
        notes: data.notes ?? "",
        photoUri: data.photoUri ?? null,
        distance: (data.distanceM / 1000).toFixed(2),
        duration: (data.durationS / 60).toFixed(1),
        date: dayjs(data.startAt).format("YYYY-MM-DD"),
        time: dayjs(data.startAt).format("HH:mm"),
      });
      setMissing(false);
    } else {
      setMissing(true);
    }
    setLoading(false);
  }, [activityId, reset]);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
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
    if (Platform.OS !== "android") {
      return;
    }

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
    if (Platform.OS !== "android") {
      return;
    }

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

  const onSubmit = handleSubmit(async (v) => {
    if (!activityId) {
      setMissing(true);
      setLoading(false);
      return;
    }

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

    setSaving(true);

    try {
      await updateActivityUseCase({
        id: activityId,
        type,
        title: v.title.trim(),
        notes: v.notes.trim() || null,
        photoUri: v.photoUri,
        distanceM,
        durationS,
        startAtMs: startAt.valueOf(),
      });

      reset({ ...v });

      router.replace({ pathname: "/(tabs)/activities/[id]", params: { id: activityId } });
    } finally {
      setSaving(false);
    }
  });

  const handleBack = async () => {
    if (!isDirty) {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace({ pathname: "/(tabs)/activities/[id]", params: { id: activityId } });
      }
      return;
    }

    const ok = await confirm({
      title: t(I18N.record.save.confirm.leaveTitle),
      description: t(I18N.record.save.confirm.leaveDesc),
      confirmText: t(I18N.record.save.confirm.leaveConfirm),
      cancelText: t(I18N.record.save.confirm.leaveCancel),
      destructive: true,
    });

    if (!ok) {
      return;
    }

    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({ pathname: "/(tabs)/activities/[id]", params: { id: activityId } });
    }
  };

  const missingActivity = !loading && missing;

  return (
    <Background>
      <Screen>
        <View className="flex-1 items-center justify-center py-6">
          <Card>
            <Text className="border-b-[0.25px] border-white/10 p-4 pb-3 text-2xl font-bold text-text">
              {t(I18N.activities.edit.title)}
            </Text>

            {loading ? (
              <View className="p-5">
                <Text className="text-center text-muted">{t(I18N.common.loading)}</Text>
              </View>
            ) : null}

            {missingActivity ? (
              <View className="p-5">
                <Text className="text-center text-muted">{t(I18N.activities.detail.notFound)}</Text>
              </View>
            ) : null}

            {!loading && activityId && !missingActivity ? (
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
                    <Button title={t(I18N.activities.edit.actions.cancel)} onPress={handleBack} />
                  </View>
                </View>

                <PrimaryButton
                  title={saving ? t(I18N.activities.edit.actions.saving) : t(I18N.activities.edit.actions.save)}
                  loading={saving}
                  onPress={onSubmit}
                />
              </View>
            ) : null}
          </Card>
        </View>
      </Screen>
    </Background>
  );
}
