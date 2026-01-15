import React, { useMemo, useRef } from "react";
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
  label?: string;
  rules?: RegisterOptions<T>;
};

export function CodeInput<T extends FieldValues>({
  control,
  name,
  errors,
  placeholder = "123456",
  label,
  rules,
}: Props<T>) {
  const inputs = useRef<Array<TextInput | null>>([]);
  const indexes = useMemo(() => Array.from({ length: 6 }, (_, i) => i), []);

  const fieldError = errors?.[name];
  const message = (fieldError as any)?.message as string | undefined;

  return (
    <View className="gap-2">
      <Text className="text-xs text-muted">{label ?? String(name)}</Text>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => {
          const code = typeof value === "string" ? value : "";
          const chars = code.padEnd(6, "").slice(0, 6).split("");

          const setChar = (index: number, char: string) => {
            if (!/^\d?$/.test(char)) {
              return;
            }

            const next = chars.slice();
            next[index] = char;

            const nextCode = next.join("").replace(/\s+$/g, "").trimEnd();
            onChange(nextCode);

            if (char && index < 5) {
              inputs.current[index + 1]?.focus();
            }
          };

          const onKey = (index: number, key: string) => {
            if (key !== "Backspace") {
              return;
            }

            if (chars[index]) {
              setChar(index, "");
              return;
            }

            if (index > 0) inputs.current[index - 1]?.focus();
          };

          return (
            <View className="flex-row gap-2">
              {indexes.map((i) => (
                <TextInput
                  key={i}
                  ref={(r) => (inputs.current[i] = r) as any}
                  value={chars[i] ?? ""}
                  onChangeText={(t) => setChar(i, t)}
                  onKeyPress={({ nativeEvent }) => onKey(i, nativeEvent.key)}
                  keyboardType="number-pad"
                  maxLength={1}
                  autoCapitalize="none"
                  placeholderTextColor="#9aa3b2"
                  placeholder={placeholder[i] ?? ""}
                  className="flex-1 rounded-xl border border-white/15 bg-transparent px-3 py-2.5 text-white text-center"
                />
              ))}
            </View>
          );
        }}
      />

      {message ? (
        <Text className="pt-1 text-red-400 text-sm">{message}</Text>
      ) : null}
    </View>
  );
}
