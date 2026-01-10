import React from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";
import { Text, TextInput, View } from "react-native";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
  placeholder?: string;
  password?: boolean;
  label?: string;
  rules?: RegisterOptions<T>;
};

export function Input<T extends FieldValues>({
  control,
  name,
  errors,
  placeholder,
  password,
  label,
  rules,
}: Props<T>) {
  const fieldError = errors?.[name];
  const message = (fieldError as any)?.message as string | undefined;

  return (
    <View className="gap-2">
      <Text className="text-xs text-muted">{label ?? String(name)}</Text>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholderTextColor="#9aa3b2"
            className="rounded-xl border border-white/15 bg-transparent px-3 py-2.5 text-white"
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={(value ?? "") as any}
            secureTextEntry={password}
            autoCapitalize="none"
          />
        )}
      />

      {message ? <Text className="pt-1 text-red-400 text-sm">{message}</Text> : null}
    </View>
  );
}
