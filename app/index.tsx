import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Search from "@/components/Search";
import ArtCarousel from "@/components/ArtCorousel";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="bg-black p-6">
          <Text className="text-white text-2xl font-bold">WELCOME TO</Text>
          <Text className="text-white text-2xl font-bold">THE ART</Text>
          <Text className="text-white text-2xl font-bold">INSTITUTE OF</Text>
          <Text className="text-white text-2xl font-bold">CHICAGO</Text>
        </View>

        <View className="p-4">
          <Search />
        </View>

        <View className="p-4 mt-3 items-center">
          <ArtCarousel />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
