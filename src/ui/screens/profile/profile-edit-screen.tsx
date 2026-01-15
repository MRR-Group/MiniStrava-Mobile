import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Controller, useForm } from "react-hook-form";
import { router } from "expo-router";

import { useSessionStore } from "@/state/session.store";
import { updateProfileUseCase } from "@app/usecases/profile/update-profile";
import { useT } from "@/core/i18n/use-t";
import { I18N } from "@/core/i18n/keys";
import { Background } from "@/ui/components/background";
import { Screen } from "@/ui/components/screen";
import { Card } from "@/ui/components/card";
import { Input } from "@/ui/components/input";
import { PrimaryButton } from "@/ui/components/primary-button";
import { Button } from "@/ui/components/button";
import { useOnline } from "@/ui/hooks/use-online";
import { handleLaravel422 } from "../../../infrastructure/api/handle-laravel-errors";

import type { UpdateProfilePayload } from "@/infrastructure/api/profile.api";

type FormValues = UpdateProfilePayload;

export function ProfileEditScreen() {
  const { t } = useT();
  const online = useOnline();
  const user = useSessionStore((s) => s.user);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name ?? "",
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      height: user?.height ?? undefined,
      weight: user?.weight ?? undefined,
      birth_date: user?.birth_date ?? "",
    },
  });

  const birthDateValue = watch("birth_date");

  const onSubmit = handleSubmit(async (values) => {
    if (!online) return;
    try {
      setServerError(null);
      const normalized: UpdateProfilePayload = {
        ...values,
        height: values.height ? Number(values.height) : null,
        weight: values.weight ? Number(values.weight) : null,
        birth_date: values.birth_date || null,
      };

      await updateProfileUseCase(normalized);
      router.back();
    } catch (e) {
      console.error("[Profile] update failed", e);
      if (handleLaravel422<FormValues>(e, setError, setServerError)) {
        return;
      }
      Alert.alert(t(I18N.profile.edit.title), t(I18N.profile.edit.errors.updateFailed));
    }
  });

  return (
    <Background>
      <Screen>
        <View className="flex-1 items-center justify-center py-6">
          <Card>
            <View className="gap-4 p-5 w-full max-w-[360px]">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-text">{t(I18N.profile.edit.title)}</Text>
                {!online && (
                  <Text className="text-xs text-red-400">{t(I18N.profile.edit.offline)}</Text>
                )}
              </View>

              <Input<FormValues>
                control={control}
                name="name"
                label={t(I18N.profile.details.name)}
                errors={errors}
                placeholder="Amon"
                rules={{
                  required: t(I18N.profile.edit.errors.nameRequired),
                  minLength: { value: 2, message: t(I18N.profile.edit.errors.nameMin) },
                  maxLength: { value: 255, message: t(I18N.profile.edit.errors.nameMax) },
                }}
              />

              <Input<FormValues>
                control={control}
                name="first_name"
                label={t(I18N.profile.edit.fields.firstName)}
                errors={errors}
                placeholder="Imię"
                rules={{
                  validate: (v) =>
                    !v || v.length >= 2 || (t(I18N.profile.edit.errors.nameMin) as string),
                }}
              />

              <Input<FormValues>
                control={control}
                name="last_name"
                label={t(I18N.profile.edit.fields.lastName)}
                errors={errors}
                placeholder="Nazwisko"
                rules={{
                  validate: (v) =>
                    !v || v.length >= 2 || (t(I18N.profile.edit.errors.nameMin) as string),
                }}
              />

              <Input<FormValues>
                control={control}
                name="height"
                label={t(I18N.profile.details.height)}
                errors={errors}
                placeholder="180"
                rules={{
                  validate: (v) =>
                    !v || /^\d+(\.\d+)?$/.test(String(v))
                      || (t(I18N.profile.edit.errors.heightInvalid) as string),
                }}
              />

              <Input<FormValues>
                control={control}
                name="weight"
                label={t(I18N.profile.details.weight)}
                errors={errors}
                placeholder="75"
                rules={{
                  validate: (v) =>
                    !v || /^\d+(\.\d+)?$/.test(String(v))
                      || (t(I18N.profile.edit.errors.weightInvalid) as string),
                }}
              />

              <Controller
                control={control}
                name="birth_date"
                rules={{
                  validate: (v) =>
                    !v || /^\d{4}-\d{2}-\d{2}$/.test(v)
                      || (t(I18N.profile.edit.errors.birthInvalid) as string),
                }}
                render={({ field: { value, onChange } }) => (
                  <View className="gap-1">
                    <Text className="text-sm text-muted">{t(I18N.profile.details.birth)}</Text>
                    <Button
                      title={value ? value : t(I18N.profile.details.birth)}
                      onPress={() => setShowDatePicker(true)}
                    />
                    {errors.birth_date?.message ? (
                      <Text className="text-xs text-red-400">{errors.birth_date.message}</Text>
                    ) : null}

                    {showDatePicker ? (
                      <DateTimePicker
                        value={value ? new Date(value) : new Date()}
                        mode="date"
                        display="spinner"
                        onChange={(_, selectedDate) => {
                          setShowDatePicker(false);
                          if (selectedDate) {
                            const iso = selectedDate.toISOString().slice(0, 10);
                            onChange(iso);
                            setValue("birth_date", iso, { shouldValidate: true });
                          }
                        }}
                      />
                    ) : null}
                  </View>
                )}
              />

              <View className="flex-1">
                <Button title={t(I18N.profile.edit.actions.cancel)} onPress={() => router.back()} />
              </View>

              <View className="flex-1">
                <PrimaryButton
                  title={t(I18N.profile.edit.actions.save)}
                  onPress={onSubmit}
                  loading={isSubmitting || !online}
                />
              </View>
            </View>
          </Card>
        </View>
      </Screen>
    </Background>
  );
}
