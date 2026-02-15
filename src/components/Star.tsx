import { TouchableOpacity, View, Image } from "react-native";


type StarProps = {
  top: string;
  left: string;
  filled?: boolean;
  sizeClass: string;
  onPress?: () => void;
};

export default function Star({ top, left, filled = false, sizeClass, onPress }: StarProps) {


  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="absolute"
      style={{ top, left }}
      onPress={onPress}
      hitSlop={20}
    >
      {filled ? (
        <View
          style={{
            shadowColor: "#ffffff",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.7,
            shadowRadius: 10,
            elevation: 10,
          }}
        >
          <Image
            source={require('@/assets/images/star.png')}
            style={{
              width: sizeClass.includes('w-2') ? 16 : 12,
              height: sizeClass.includes('h-2') ? 16 : 12,
            }}
            resizeMode="contain"
          />

        </View>
      ) : (
        <View
          style={[
            {
              width: sizeClass.includes('w-1.5') 
                ? 6 
                : sizeClass.includes('w-2') 
                ? 8 
                : 4,
              height: sizeClass.includes('h-1.5') 
                ? 6 
                : sizeClass.includes('h-2') 
                ? 8
                : 4,
              borderRadius: 999,
              backgroundColor: "rgba(255, 255, 255, 0.35)",
            },
            {
              shadowColor: "#ffffff",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
              elevation: 3,
              transform: [{ scale: 1.2 }]
            }
          ]}
        >

        </View>
      )}
      {/* <View 
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
      /> */}
    </TouchableOpacity>
  );
}
