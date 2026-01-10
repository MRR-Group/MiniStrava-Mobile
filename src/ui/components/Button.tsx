import { Text, TouchableOpacity } from 'react-native';

type Props = { 
  title: string 
  onPress?: () => void;
};

export const Button = (({ title, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="p-3 rounded-xl border-white/15 bg-transparent border transition-transform active:scale-95" 
      onPress={onPress}
    >
      <Text className="text-center text-text text-sm select-none">{title}</Text>
    </TouchableOpacity>
  );
});