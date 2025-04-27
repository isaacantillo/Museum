import { Button, Text, TextInput, View } from "react-native";
import Search from "@/components/Search";
import { router } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1">
      <View className="top-0 left-0 w-full h-200px bg-primary">
        <Text className="text-white text-2xl font-bold">WELCOME TO</Text>
        <Text className="text-white text-2xl font-bold">THE ART</Text>
        <Text className="text-white text-2xl font-bold">INSTITUTE OF</Text>
        <Text className="text-white text-2xl font-bold">CHICAGO</Text>
      </View>

      <View className="flex-1">
        <Search />
      </View>

      <View className="flex-1 justify-center items-center">
        <Button title="See all artworks" 
        onPress={() => {
          console.log("See all artworks");
          router.push("/artworks");
        }}
        />
      </View>
    </View>
  );
}
