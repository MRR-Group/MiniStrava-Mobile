import React from "react";
import { Text, View, Alert } from "react-native";
import { useForm } from "react-hook-form";
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

import type { UpdateProfilePayload } from "@/infrastructure/api/profile.api";

type FormValues = UpdateProfilePayload;

export function ProfileEditScreen() {
  const { t } = useT();
  const online = useOnline();
  const user = useSessionStore((s) => s.user);

  const {
    control,
    handleSubmit,
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

  const onSubmit = handleSubmit(async (values) => {
    if (!online) return;
    try {
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
              />

              <Input<FormValues>
                control={control}
                name="first_name"
                label={t(I18N.profile.edit.fields.firstName)}
                errors={errors}
                placeholder="Imię"
              />

              <Input<FormValues>
                control={control}
                name="last_name"
                label={t(I18N.profile.edit.fields.lastName)}
                errors={errors}
                placeholder="Nazwisko"
              />

              <Input<FormValues>
                control={control}
                name="height"
                label={t(I18N.profile.details.height)}
                errors={errors}
                placeholder="180"
              />

              <Input<FormValues>
                control={control}
                name="weight"
                label={t(I18N.profile.details.weight)}
                errors={errors}
                placeholder="75"
              />

              <Input<FormValues>
                control={control}
                name="birth_date"
                label={t(I18N.profile.details.birth)}
                errors={errors}
                placeholder="YYYY-MM-DD"
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
