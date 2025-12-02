import { Image, Text, View } from 'react-native';
import { Card } from '@/components/Card';
import { Background } from '@/components/Background';
import "global.css"

export default function Home() {
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
            Witaj!!!!
          </Text>
        </Card>
      </View> 
    </Background>
  );
}