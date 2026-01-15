import React, { useState } from "react";
import { Image, Text, View, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { router } from "expo-router";

import { Card } from "@/ui/components/card";
import { Input } from "@/ui/components/input";
import { Button } from "@/ui/components/button";
import { PrimaryButton } from "@/ui/components/primary-button";

import { login as loginUseCase } from "@/application/usecases/auth/login";
import { handleLaravel422 } from "@/infrastructure/api/handle-laravel-errors";

import { useT } from "@/core/i18n/use-t";
import { setAppLanguage } from "@/core/i18n/i18n";
import { I18N } from "@/core/i18n/keys";
import { Background } from "@ui/components/background";
import { Screen } from "@ui/components/screen";

type LoginForm = {
  email: string;
  password: string;
};

export function LoginScreen() {
  const { t, lang } = useT();
  const currentLang = (lang?.startsWith("pl") ? "pl" : "en") as "pl" | "en";

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ defaultValues: { email: "", password: "" } });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      setServerError(null);

      await loginUseCase(email.trim(), password);

      router.replace("/(tabs)");
    } catch (e: any) {
      if (handleLaravel422<LoginForm>(e, setError, setServerError)) {
        return;
      }

      const status = e?.response?.status;

      if (status === 403) {
        setError("password", {
          type: "server",
          message: t(I18N.auth.errors.invalidCredentials),
        });
        return;
      }

      setServerError(t(I18N.auth.errors.loginGeneric));
    }
  });

  return (
    <Background>
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Card>
            <View className="absolute right-4 top-4 z-10 flex-row gap-2">
              {(["pl", "en"] as const).map((l) => (
                <Pressable
                  key={l}
                  onPress={() => setAppLanguage(l)}
                  className={`rounded-xl border border-white/15 px-3 py-1.5 ${
                    currentLang === l ? "bg-white/10" : "bg-transparent"
                  }`}
                >
                  <Text className="font-bold text-text">{l.toUpperCase()}</Text>
                </Pressable>
              ))}
            </View>

            <View className="h-96 items-center justify-center px-4 pb-2 pt-16">
              <Image
                resizeMode="contain"
                style={{ width: "100%" } as any}
                source={require("@/assets/logo.png")}
              />
            </View>

            <Text className="text-center text-muted">{t(I18N.auth.login.subtitle)}</Text>

            <View className="gap-4 p-4 pt-8">
              <Input<LoginForm>
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

              <Input<LoginForm>
                control={control}
                name="password"
                label={t(I18N.auth.password)}
                placeholder="••••••••"
                errors={errors}
                password
                rules={{
                  required: t(I18N.auth.errors.passwordRequired),
                }}
              />

              {serverError ? (
                <Text className="text-center text-sm text-red-400">{serverError}</Text>
              ) : null}

              <Button
                title={t(I18N.auth.login.forgot)}
                onPress={() => router.push("/(auth)/reset-password")}
              />

              <PrimaryButton
                title={t(I18N.auth.login.submit)}
                onPress={onSubmit}
                loading={isSubmitting}
              />
            </View>

            <Text className="pb-4 text-center text-muted">
              {t(I18N.auth.login.noAccount)}{" "}
              <Text className="font-bold text-text" onPress={() => router.push("/(auth)/register")}>
                {t(I18N.auth.login.register)}
              </Text>
            </Text>
          </Card>
        </View>
      </Screen>
    </Background>
  );
}
