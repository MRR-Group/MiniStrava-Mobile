import React, { useState } from "react";
import { Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { router } from "expo-router";

import { Background } from "@/ui/components/background";
import { Card } from "@/ui/components/card";
import { Screen } from "@ui/components/screen";
import { Input } from "@/ui/components/input";
import { Button } from "@/ui/components/button";
import { PrimaryButton } from "@/ui/components/primary-button";

import { register as registerUseCase } from "@/application/usecases/auth/register";
import { handleLaravel422 } from "@/infrastructure/api/handle-laravel-errors";

import { useT } from "@/core/i18n/use-t";
import { I18N } from "@/core/i18n/keys";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export function RegisterScreen() {
  const { t } = useT();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const password = watch("password");

  const onSubmit = handleSubmit(async (v) => {
    try {
      setServerError(null);

      await registerUseCase({
        name: v.name.trim(),
        email: v.email.trim(),
        password: v.password,
        password_confirmation: v.password_confirmation,
      });

      router.replace("/(auth)/login");
    } catch (e: any) {
      if (handleLaravel422<RegisterForm>(e, setError, setServerError)) {
        return;
      }

      setServerError(t(I18N.auth.register.errors.registerGeneric));
    }
  });

  return (
    <Background>
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Card>
            <Text className="border-b-[0.25px] border-white/10 p-4 pb-3 text-2xl font-bold text-text">
              {t(I18N.auth.register.title)}
            </Text>

            <View className="gap-4 p-4 pt-4">
              <Input<RegisterForm>
                control={control}
                name="name"
                label={t(I18N.auth.register.name)}
                placeholder="Adam"
                errors={errors}
                rules={{
                  required: t(I18N.auth.register.errors.nameRequired),
                  minLength: { value: 2, message: t(I18N.auth.register.errors.nameMin) },
                  maxLength: { value: 255, message: t(I18N.auth.register.errors.nameMax) },
                }}
              />

              <Input<RegisterForm>
                control={control}
                name="email"
                label={t(I18N.auth.email)}
                placeholder="you@example.com"
                errors={errors}
                rules={{
                  required: t(I18N.auth.errors.emailRequired),
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: t(I18N.auth.errors.emailInvalid),
                  },
                }}
              />

              <Input<RegisterForm>
                control={control}
                name="password"
                label={t(I18N.auth.password)}
                placeholder={t(I18N.auth.register.passwordHint)}
                password
                errors={errors}
                rules={{
                  required: t(I18N.auth.errors.passwordRequired),
                  minLength: { value: 8, message: t(I18N.auth.register.errors.passwordMin) },
                  maxLength: { value: 255, message: t(I18N.auth.register.errors.passwordMax) },
                }}
              />

              <Input<RegisterForm>
                control={control}
                name="password_confirmation"
                label={t(I18N.auth.register.passwordConfirm)}
                placeholder="••••••••"
                password
                errors={errors}
                rules={{
                  required: t(I18N.auth.register.errors.passwordConfirmRequired),
                  validate: (v: string) =>
                    v === password || t(I18N.auth.register.errors.passwordsNotMatch),
                }}
              />

              {serverError ? (
                <Text className="text-center text-sm text-red-400">{serverError}</Text>
              ) : null}

              <Button
                title={t(I18N.auth.register.haveAccount)}
                onPress={() => router.replace("/(auth)/login")}
              />

              <PrimaryButton
                title={t(I18N.auth.register.submit)}
                onPress={onSubmit}
                loading={isSubmitting}
              />
            </View>
          </Card>
        </View>
      </Screen>
    </Background>
  );
}
