import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Button,
  Modal,
  Pressable
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { Artwork } from '@/interfaces/interfaces';
import { getArtworkImageUrl } from '@/services/utils';
import ImageZoom from 'react-native-image-pan-zoom';

const { width, height } = Dimensions.get('window');

const ArtworkDetails = () => {
  const { id } = useLocalSearchParams();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchArtwork = async () => {
    try {
      setLoading(true);
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
    <>
      <ScrollView className="flex-1 mt-4 px-4">
        <View className="flex-1 bg-white rounded-lg overflow-hidden">
          <View style={{ position: 'relative' }}>
            <Image
              source={{ uri: imageUrl ?? 'https://via.placeholder.com/400' }}
              style={{
                width: '100%',
                aspectRatio: 1,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            />

            <Pressable
              onPress={() => setModalVisible(true)}
              style={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 9999,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>View Full Image</Text>
            </Pressable>
          </View>


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

      {/* 🔍 Modal for Fullscreen Zoom */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          {imageUrl && (
            <ImageZoom
              cropWidth={width}
              cropHeight={height}
              imageWidth={width}
              imageHeight={height}
              panToMove={true}
              pinchToZoom={true}
            >
              <Image
                source={{ uri: imageUrl }}
                style={{ width, height, resizeMode: 'contain' }}
              />
            </ImageZoom>
          )}
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{
              position: 'absolute',
              top: 50,
              right: 20,
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 50,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>✕</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default ArtworkDetails;
