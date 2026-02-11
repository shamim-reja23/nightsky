import { TouchableOpacity, View } from "react-native";


type StarProps = {
  top: string;
  left: string;
  filled?: boolean;
  sizeClass: string;
  onPress?: () => void;
};

export default function Star({ top, left, filled = false, sizeClass, onPress }: StarProps) {

  const glowRadius = filled ? 8 : 3;
  const glowOpacity = filled ? 0.9 : 0.3;
  const starColor = filled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.35)";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="absolute"
      style={{ top, left }}
      onPress={onPress}
      hitSlop={20}
    >
      <View 
        style={[
          {
            width: sizeClass.includes('w-1.5') ? 6 : sizeClass.includes('w-2') ? 8 : 4,
            height: sizeClass.includes('h-1.5') ? 6 : sizeClass.includes('h-2') ? 8 : 4,
            borderRadius: 999,
            backgroundColor: starColor,
            borderWidth: filled ? 0.5 : 0,
            borderColor: "rgba(255, 255, 255, 0.6)",
          },
          {
            shadowColor: "#ffffff",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: glowOpacity,
            shadowRadius: glowRadius,
            elevation: filled ? 8 : 3,
          },
        ]}
      />
    </TouchableOpacity>
  );
}
