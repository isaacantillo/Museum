import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useRouter } from 'expo-router';
import Search from "@/components/Search";
import ArtCarousel from "@/components/ArtCorousel";

export default function Index() {
  const router = useRouter();

  const handleSearch = (params: { query: string; category: string; style: string; timePeriod: string }) => {
    router.navigate({
      pathname: '/(tabs)/explore',
      params: { query: params.query },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="bg-museum-gray p-6">
          <Text className="text-white text-2xl font-bold">WELCOME TO</Text>
          <Text className="text-white text-2xl font-bold">THE ART</Text>
          <Text className="text-white text-2xl font-bold">INSTITUTE OF</Text>
          <Text className="text-white text-2xl font-bold">CHICAGO</Text>
        </View>

        <View className="p-4">
          <Search onSearch={handleSearch} />
        </View>

        <View className="p-4 items-center">
          <ArtCarousel />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
