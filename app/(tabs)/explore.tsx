import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

import Search from '@/components/Search';
import ArtworkResultCard from '@/components/ArtworkResultCard';

import api from '@/services/api';
import type { Artwork } from '@/interfaces/interfaces';
import { buildSearchParams, getArtworkImageUrl } from '@/services/utils';

const ArtworksResults = () => {
  const searchParams = useLocalSearchParams();

  const [params, setParams] = useState({
    query: typeof searchParams.query === 'string' ? searchParams.query : '',
    category: typeof searchParams.category === 'string' ? searchParams.category : 'all',
    style: typeof searchParams.style === 'string' ? searchParams.style : 'all',
    timePeriod: typeof searchParams.timePeriod === 'string' ? searchParams.timePeriod : 'all',
  });

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchArtworks = async (searchParams: typeof params) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = buildSearchParams(searchParams);
      const response = await api.artworks.search(queryParams);
      setArtworks(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks(params);
  }, [params]);

  const handleSearch = (newParams: typeof params) => {
    setParams(newParams);
    fetchArtworks(newParams);
  };

  return (
    <View className="flex-1 mt-4">
      <Search
        onSearch={handleSearch}
        initialQuery={params.query}
        initialCategory={params.category}
        initialStyle={params.style}
        initialTimePeriod={params.timePeriod}
      />
      {loading ? (
        <Text className="text-center mt-4">Loading...</Text>
      ) : error ? (
        <Text className="text-center mt-4 text-red-500">{error.message}</Text>
      ) : (
        <FlatList
          data={artworks || []}
          renderItem={({ item }) => (
            <View className="px-4">
              <ArtworkResultCard
                id={item.id.toString()}
                title={item.title}
                subtitle={item.artist_title ?? ''}
                imageUrl={
                  item.image_id
                    ? getArtworkImageUrl(item.image_id) ?? 'https://via.placeholder.com/300x200.png?text=No+Image'
                    : 'https://via.placeholder.com/300x200.png?text=No+Image'
                }
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      )}
    </View>
  );
};

export default ArtworksResults;
