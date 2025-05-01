import { View, Text, Image, ScrollView, ImageBackground } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { Artwork } from '@/interfaces/interfaces';
import { getArtworkImageUrl } from '@/services/utils';

const ArtworkDetails = () => {
  const { id } = useLocalSearchParams();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fetchArtwork = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.artworks.getById(Array.isArray(id) ? id[0] : id);
      setArtwork(response.data);
      setImageUrl(getArtworkImageUrl(response.data.image_id));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtwork();
  }, [id]);

  return (
    <ScrollView className="flex-1 mt-4 px-4">
      <View className="flex-1 bg-white rounded-lg">
        <Image
          source={{ uri: imageUrl ?? 'https://via.placeholder.com/400' }}
          className="w-full aspect-square rounded-t-lg"
        />
        <View className="p-4">
          <Text className="text-2xl font-bold">{artwork?.title}</Text>
          <Text className="text-sm text-gray-500"><Text className="font-bold">Artist:</Text> {artwork?.artist_title}</Text>
          <Text className="text-sm text-gray-500"><Text className="font-bold">Medium:</Text> {artwork?.medium_display}</Text>
          <Text className="text-sm text-gray-500"><Text className="font-bold">Date:</Text> {artwork?.date_display}</Text>
          <Text className="text-sm text-gray-500"><Text className="font-bold">Dimensions:</Text> {artwork?.dimensions}</Text>
          <Text className="text-sm text-gray-500"><Text className="font-bold">Place of Origin:</Text> {artwork?.place_of_origin}</Text>
        </View>
      </View>

      <View className="flex-1 my-4 bg-white p-4 rounded-lg">
        <Text className="text-lg font-bold">Description:</Text>
        <Text className="text-sm text-gray-500">{artwork?.description?.replace(/<[^>]*>/g, '')}</Text>
        <Text className="text-sm text-gray-500"><Text className="font-bold">Credit Line:</Text> {artwork?.credit_line}</Text>
      </View>

    </ScrollView>
  );
};

export default ArtworkDetails;
