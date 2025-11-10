import { Image, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Background } from '@/components/Background';
import { Input } from '@/components/Input';
import { useForm } from "react-hook-form"
import "global.css"

export default function Home() {
  const { control, handleSubmit, formState: { errors }} = useForm({defaultValues: { email: "", password: ""}})
  const onSubmit = (data: any) => console.log(data)
  
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

            <PrimaryButton title="Login" onClick={handleSubmit(onSubmit)} />
            <Button title="Nie pamiętasz hasła?" />
          </View>
        
          <Text className='text-center text-muted pb-4'>
            Nie masz konta? <Text className='font-bold'>Zarejestruj się</Text>
          </Text>
        </Card>
      </View> 
    </Background>
  );
}