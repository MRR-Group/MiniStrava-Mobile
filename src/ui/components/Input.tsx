import { Control, Controller, FieldErrors  } from "react-hook-form"
import { Text, TextInput, View } from "react-native"

type Props = {
  control: Control<any>,
  placeholder?: string,
  name: string
  errors?: FieldErrors,
  password?: boolean,
  label?: string
}

export const Input = ({ placeholder, control, errors, name, label, password }: Props) => (
  <View>
    <Text className="pb-2 text-xs text-muted">{label ?? name}</Text>

    <Controller
      control={control}
      rules={{required: true}}
      name={name}
      render={({ field: { onChange, onBlur, value }}) => (
        <TextInput
          placeholderTextColor="#9aa3b2"
          className="border border-white/15 focus:border-white px-3 py-2.5 rounded-xl text-white bg-transparent outline-none transition-colors"
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          secureTextEntry={password}
        />
      )}
    />
    
    {errors && errors[name] && (
      <Text className="text-red-600 pt-2">{errors[name] as any}</Text>
    )}
  </View>
)