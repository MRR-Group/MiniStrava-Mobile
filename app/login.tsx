import { Image, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton';
import { Card } from '@/components/Card';
import { Background } from '@/components/Background';
import { Input } from '@/components/Input';
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";

import "global.css"
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';

type LoginForm = {
  email: string,
  password: string,
}

export default function Login() {
  const { control, handleSubmit, formState: { errors }} = useForm<LoginForm>({defaultValues: { email: "", password: ""}})
  const { login, loading, error, clearError } = useAuthStore();

  const router = useRouter();

  const onSubmit = async ({ email, password }: LoginForm) => {
    console.log("Submit")

    try {
      clearError();
      await login(email, password);
      router.replace("/");             
    } catch(e) {
      console.log(e);
    }
  };
  
  return (
    <Background>
      <View className='flex flex-1 justify-center items-center m-3.5'>
        <Card>
          <View className='flex justify-center px-4 pt-16 pb-2 items-center h-96'>
            <Image 
              resizeMode="contain"
              style={{ width: "100%" } as any}
              source={require("@/assets/logo.png")} 
            />
          </View>

          <Text className='text-center text-muted'>
            Witaj ponownie! Zaloguj się, aby kontynuować.
          </Text>

          <View className='p-4 pt-8 flex gap-4'>
            <Input control={control} label='E-mail' name='email' errors={errors} placeholder='Email' /> 
            <Input control={control} label='Hasło' name='password' errors={errors} placeholder='Password' password /> 

            {!!error && (<Text className="text-center text-red-400 mt-3">{error}</Text>)}

            <Button title="Nie pamiętasz hasła?" />
            <PrimaryButton title="Submit" onPress={handleSubmit(onSubmit)} loading={loading} />
          </View>

          <Text className='text-center text-muted pb-4'>
            Nie masz konta? <Text className='font-bold'>Zarejestruj się</Text>
          </Text>
        </Card>
      </View> 
    </Background>
  );
}