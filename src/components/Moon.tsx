import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Memory } from "../data/types";
import { getMoonMemory } from "../data/storage";
import { LinearGradient } from "expo-linear-gradient";

export default function Moon() {
  const router = useRouter();
  const [moon, setMoon] = useState<Memory | null>(null);

  useFocusEffect(
    useCallback(() =>{
      getMoonMemory().then(setMoon);
    }, [])
  );
  
  const handlePress = () => {
    if(moon) {
      router.push("/(modals)/ViewMoon");
    } else {
      router.push("/addMoon");
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={{
        position: "absolute",
        top: "15%",
        left: "45%",
        alignItems: "center",
      }}
    >
      <View className="relative w-20 h-20">
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "white",
            shadowColor: "#fff",
            shadowOpacity: 0.6,
            shadowRadius: 30,
            shadowOffset: { width: 0, height: 0 },
            elevation: 15,
          }}
        />

        <LinearGradient
          colors={["#131029", "#2d1b69"]}
          style={{
            position: "absolute",
            top: -4,
            left: -8,
            width: 80,
            height: 80,
            borderRadius: 40,
          }}
        />
      </View>

      {moon && (
        <Text className="absolute -bottom-10 tracking-widest text-xs font-light uppercase text-white/60">
          Moon
        </Text>
      )}
    </TouchableOpacity>
  );
}
