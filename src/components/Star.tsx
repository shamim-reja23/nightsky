import { TouchableOpacity, Animated } from "react-native";
import { useEffect, useRef } from "react";

type StarProps = {
  top: string;
  left: string;
  filled?: boolean;
  onPress?: () => void;
};

export default function Star({ top, left, filled = false, onPress }: StarProps) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.3,
          duration: 1500,
          useNativeDriver: true,
        }),

        Animated.timing(scale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="absolute"
      style={{ top, left }}
      onPress={onPress}
      hitSlop={20}
    >
      <Animated.View className={`rounded-full ${ filled ? "w-3 h-3 bg-white opacity-100" : "w-3 h-3 bg-white opacity-30"
      }`}  style={{transform: [{scale}]}}/>
    </TouchableOpacity>
  );
}
