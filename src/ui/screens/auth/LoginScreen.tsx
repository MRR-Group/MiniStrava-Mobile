import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import { login } from "@/application/usecases/auth/login";

type Form = { email: string; password: string };

export function LoginScreen() {
  const { control, handleSubmit, formState } = useForm<Form>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (v) => {
    await login(v.email, v.password);
    router.replace("/(tabs)");
  });

  return (
    <View className="flex-1 bg-bg px-5 pt-14">
      <View className="rounded-[18px] border border-white/10 bg-card shadow-custom">
        <View className="border-b border-white/10 px-4 py-4">
          <Text className="text-text text-lg font-extrabold">Zaloguj się</Text>
        </View>

        <View className="px-4 py-5 gap-4">
          <View className="items-center gap-2">
            <View className="px-3 py-2 rounded-full border border-white/10 bg-white/5">
              <Text className="text-text font-extrabold">🚴‍♂️ Trackify</Text>
            </View>
            <Text className="text-muted text-xs text-center">
              Witaj ponownie! Zaloguj się, aby kontynuować.
            </Text>
          </View>

          <View className="gap-3">
            <Text className="text-muted text-xs">E-mail</Text>
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="you@example.com"
                  placeholderTextColor="#9aa3b2"
                  className="text-text border border-white/15 rounded-xl px-3 py-3"
                />
              )}
            />

            <Text className="text-muted text-xs">Hasło</Text>
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  placeholder="••••••••"
                  placeholderTextColor="#9aa3b2"
                  className="text-text border border-white/15 rounded-xl px-3 py-3"
                />
              )}
            />
          </View>

          {formState.isSubmitSuccessful ? null : null}

          <Pressable
            onPress={onSubmit}
            disabled={formState.isSubmitting}
            className="rounded-xl border border-white/15 overflow-hidden"
            style={{
              backgroundColor: "#7c5cff",
            }}
          >
            <View className="py-4 items-center">
              <Text className="text-white font-extrabold">Zaloguj</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => router.push("/(auth)/reset-password")} className="py-2">
            <Text className="text-text text-center">Nie pamiętasz hasła?</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/(auth)/register")} className="py-2">
            <Text className="text-muted text-center">
              Nie masz konta? <Text className="text-text font-bold">Zarejestruj się</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}