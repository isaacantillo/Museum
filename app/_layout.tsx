import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import "./globals.css"


export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1">
      <Stack
        screenOptions={{
          headerShown: false
        }} />
    </SafeAreaView>
  );
}
