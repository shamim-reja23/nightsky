import { Stack } from "expo-router";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import "./globals.css";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#131022" }}>
      <StatusBar hidden />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#131022",
          },
        }}
      >
        <Stack.Screen name="(tabs)/index" />

        <Stack.Screen
          name="(modal)/Memory"
          options={{
            presentation: "transparentModal",
          }}
        />
      </Stack>
    </View>
  );
}
