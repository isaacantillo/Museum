import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Artwork } from '@/interfaces/interfaces';
import useFetch from '@/services/useFetch';
import api from '@/services/api';
import { getArtworkImageUrl } from '@/services/utils';
const { width: screenWidth } = Dimensions.get('window');

const ArtCarousel = () => {
    const [randomArtworks, setRandomArtworks] = useState<Artwork[]>([]);
    const randomPage = Math.floor(Math.random() * 5) + 1;

    const { data: artworks, loading, error } = useFetch<{ data: Artwork[] }>(
        () => api.artworks.getAll(randomPage, 10),
        true
    );

    useEffect(() => {
        if (artworks?.data) {
            // Shuffle array and take first 5 items
            const shuffled = [...artworks.data]
                .sort(() => Math.random() - 0.5)
                .slice(0, 5);
            setRandomArtworks(shuffled);
        }
    }, [artworks]);

    const renderItem = ({ item }: { item: Artwork }) => {
        const imageUrl = getArtworkImageUrl(item.image_id);

        return (
            <View style={styles.item}>
                {imageUrl ? (
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.noImage}>
                        <Text>No Image Available</Text>
                    </View>
                )}
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{item.title}</Text>
                {item.artist_title && <Text style={styles.artist}>{item.artist_title}</Text>}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text>{error.message}</Text>
            ) : (
                <Carousel
                    width={screenWidth * 0.8}
                    height={screenWidth * 0.8 + 80}
                    data={randomArtworks}
                    renderItem={renderItem}
                    loop
                    autoPlay
                    autoPlayInterval={3000}
                />
            )}
        </View>
    );
};

export default ArtCarousel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    item: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        paddingBottom: 10,
        marginVertical: 10,
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
      },
    image: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    noImage: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
    },
    artist: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});
