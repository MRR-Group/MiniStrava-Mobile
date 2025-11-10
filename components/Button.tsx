import { Pressable, Text } from 'react-native';

type Props = { 
  title: string 
  onClick?: () => void;
};

export const Button = (({ title, onClick }: Props) => {
  return (
    <Pressable 
      className="p-3 rounded-xl border-white/15 bg-transparent border transition-transform active:scale-95" 
      onPress={onClick}
    >
      <Text className="text-center text-text text-sm select-none">{title}</Text>
    </Pressable>
  );
});