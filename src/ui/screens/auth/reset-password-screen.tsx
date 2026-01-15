import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { router } from "expo-router";

import { Background } from "@/ui/components/background";
import { Card } from "@/ui/components/card";
import { Screen } from "@/ui/components/screen";
import { Input } from "@/ui/components/input";
import { Button } from "@/ui/components/button";
import { PrimaryButton } from "@/ui/components/primary-button";
import { CodeInput } from "@/ui/components/code-input";

import { forgotPassword } from "@/application/usecases/auth/forgot-password";
import { resetPassword } from "@/application/usecases/auth/reset-password";
import { handleLaravel422 } from "@/infrastructure/api/handle-laravel-errors";

import { useT } from "@/core/i18n/use-t";
import { I18N } from "@/core/i18n/keys";

type Step1Form = {
  email: string;
};

type Step2Form = {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
};

export function ResetPasswordScreen() {
  const { t } = useT();

  const [serverError, setServerError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const step1 = useForm<Step1Form>({
    defaultValues: { email: "" },
  });

  const step2 = useForm<Step2Form>({
    defaultValues: { email: "", token: "", password: "", password_confirmation: "" },
  });

  const password = step2.watch("password");

  const title = useMemo(
    () => (step === 1 ? t(I18N.auth.reset.titleStep1) : t(I18N.auth.reset.titleStep2)),
    [step, t]
  );

  const onSendCode = step1.handleSubmit(async ({ email }) => {
    try {
      setServerError(null);

      const clean = email.trim();
      await forgotPassword(clean);

      setSentTo(clean);
      setStep(2);

      step2.setValue("email", clean);
    } catch (e: any) {
      if (handleLaravel422<Step1Form>(e, step1.setError, setServerError)) {
        return;
      }

      setServerError(t(I18N.auth.reset.errors.sendCodeGeneric));
    }
  });

  const onReset = step2.handleSubmit(async (v) => {
    try {
      setServerError(null);

      await resetPassword({
        email: v.email.trim(),
        token: v.token.trim(),
        password: v.password,
        password_confirmation: v.password_confirmation,
      });

      router.replace("/(auth)/login");
    } catch (e: any) {
      if (handleLaravel422<Step2Form>(e, step2.setError, setServerError)) return;

      const status = e?.response?.status;

      if (status === 400) {
        setServerError(t(I18N.auth.reset.errors.reset400));
        return;
      }

      setServerError(t(I18N.auth.reset.errors.resetGeneric));
    }
  });

  return (
    <Background>
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Card>
            <Text className="border-b-[0.25px] border-white/10 p-4 pb-3 text-2xl font-bold text-text">
              {title}
            </Text>

            <View className="gap-4 p-4 pt-4">
              {step === 1 ? (
                <>
                  <Text className="text-muted text-sm">{t(I18N.auth.reset.hintStep1)}</Text>

                  <Input<Step1Form>
                    control={step1.control}
                    name="email"
                    label={t(I18N.auth.email)}
                    placeholder="you@example.com"
                    errors={step1.formState.errors}
                    rules={{
                      required: t(I18N.auth.errors.emailRequired),
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: t(I18N.auth.errors.emailInvalid),
                      },
                    }}
                  />

                  {serverError ? (
                    <Text className="text-center text-sm text-red-400">{serverError}</Text>
                  ) : null}

                  <Button
                    title={t(I18N.common.backToLogin)}
                    onPress={() => router.replace("/(auth)/login")}
                  />

                  <PrimaryButton
                    title={t(I18N.auth.reset.sendCode)}
                    onPress={onSendCode}
                    loading={step1.formState.isSubmitting}
                  />
                </>
              ) : (
                <>
                  <Text className="text-muted text-sm">
                    {t(I18N.auth.reset.codeSentTo)}{" "}
                    <Text className="text-text font-bold">{sentTo}</Text>
                  </Text>

                  <Input<Step2Form>
                    control={step2.control}
                    name="email"
                    label={t(I18N.auth.email)}
                    placeholder="you@example.com"
                    errors={step2.formState.errors}
                    rules={{
                      required: t(I18N.auth.errors.emailRequired),
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: t(I18N.auth.errors.emailInvalid),
                      },
                    }}
                  />

                  <CodeInput<Step2Form>
                    control={step2.control}
                    name="token"
                    label={t(I18N.auth.reset.code6)}
                    placeholder="123456"
                    errors={step2.formState.errors}
                    rules={{
                      required: t(I18N.auth.reset.errors.codeRequired),
                      minLength: { value: 6, message: t(I18N.auth.reset.errors.codeInvalid) },
                      maxLength: { value: 6, message: t(I18N.auth.reset.errors.codeInvalid) },
                      pattern: { value: /^\d{6}$/, message: t(I18N.auth.reset.errors.codeInvalid) },
                    }}
                  />

                  <Input<Step2Form>
                    control={step2.control}
                    name="password"
                    label={t(I18N.auth.reset.passwordNew)}
                    placeholder={t(I18N.auth.reset.passwordHint)}
                    password
                    errors={step2.formState.errors}
                    rules={{
                      required: t(I18N.auth.errors.passwordRequired),
                      minLength: { value: 8, message: t(I18N.auth.reset.errors.passwordMin) },
                      maxLength: { value: 255, message: t(I18N.auth.reset.errors.passwordMax) },
                    }}
                  />

                  <Input<Step2Form>
                    control={step2.control}
                    name="password_confirmation"
                    label={t(I18N.auth.reset.passwordConfirm)}
                    placeholder="••••••••"
                    password
                    errors={step2.formState.errors}
                    rules={{
                      required: t(I18N.auth.reset.errors.passwordConfirmRequired),
                      validate: (v: string) =>
                        v === password || t(I18N.auth.reset.errors.passwordsNotMatch),
                    }}
                  />

                  {serverError ? (
                    <Text className="text-center text-sm text-red-400">{serverError}</Text>
                  ) : null}

                  <View className="flex-row gap-3">
                    <View className="flex-1">
                      <Button
                        title={t(I18N.common.resendCode)}
                        onPress={() => {
                          setServerError(null);
                          setStep(1);
                          step1.setValue("email", step2.getValues("email"));
                        }}
                      />
                    </View>

                    <View className="flex-1">
                      <Button title={t(I18N.common.back)} onPress={() => setStep(1)} />
                    </View>
                  </View>

                  <PrimaryButton
                    title={t(I18N.auth.reset.setNewPassword)}
                    onPress={onReset}
                    loading={step2.formState.isSubmitting}
                  />
                </>
              )}
            </View>
          </Card>
        </View>
      </Screen>
    </Background>
  );
}
