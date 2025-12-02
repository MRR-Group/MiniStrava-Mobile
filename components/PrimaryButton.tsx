import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity } from 'react-native';
import { clsx } from 'clsx';

type Props = { 
  title: string 
  loading?: boolean
  onPress?: () => void
};

export const PrimaryButton = (({ title, loading, onPress }: Props) => {
  return (
    <TouchableOpacity className={clsx(`rounded-custom transition-transform`, !loading &&  "active:scale-95", loading && "cursor-not-allowed")} disabled={loading} onPress={onPress}>
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
          {loading ? "Loading..." : title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
});