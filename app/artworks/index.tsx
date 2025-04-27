import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import Search from '@/components/Search'
import api from '@/services/api'
import type { Artwork } from '@/interfaces/interfaces'
import useFetch from '@/services/useFetch'

const ArtworksResults = () => {
  const [params, setParams] = useState({
    query: '',
    category: 'all', 
    style: 'all',
    timePeriod: 'all'
  });

  const { data: artworks, loading, error, refetch } = useFetch<{data: Artwork[]}>(
    () => params.query ? api.artworks.search(params.query) : api.artworks.getAll(),
    false
  );

  const handleSearch = (searchParams: { query: string; category: string; style: string; timePeriod: string }) => {
    setParams(searchParams);
    refetch();
  };

  return (
    <View className='flex-1'>
      <Search onSearch={handleSearch} />
      {loading ? (
        <Text className="text-center mt-4">Loading...</Text>
      ) : error ? (
        <Text className="text-center mt-4 text-red-500">{error.message}</Text>
      ) : (
        <FlatList
          data={artworks?.data || []}
          renderItem={({ item }) => (
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-bold">{item.title}</Text>
              {item.artist_title && <Text className="text-gray-600">{item.artist_title}</Text>}
              {item.date_display && <Text className="text-gray-500">{item.date_display}</Text>}
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          className="flex-1"
        />
      )}
    </View>
  )
}

export default ArtworksResults