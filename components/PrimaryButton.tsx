import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

type Props = { 
  title: string 
  onClick?: () => void;
};

export const PrimaryButton = (({ title, onClick }: Props) => {
  return (
    <Pressable className="rounded-custom transition-transform active:scale-95" onPress={onClick}>
      <LinearGradient
        dither
        start={{ x: 0.2, y: 1 }}
        end={{ x: 0.8, y: 0 }}
        colors={[
          "#7c5cff",
          "#8668ff",
          "#6f97ff",
          "#54e0ff",
          "#4ffaff",
        ]}
        style={{ borderRadius: 18 }}
      >
        <Text className="p-4 text-center text-text text-sm font-bold select-none">
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
});