import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Memory } from "../data/types";
import { getMoonMemory } from "../data/storage";

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
      className="absolute top-16 self-center"
      onPress={handlePress}
    >
      <View 
        className="w-32 h-32 rounded-full bg-slate-200 items-center justify-center"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.8,
          shadowRadius: 20,
        }}
      >
        <Text className="text-slate-700 text-xs text-center px-2">
          {moon ? "Your Special Memory" : "Add a special memory to the moon"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
