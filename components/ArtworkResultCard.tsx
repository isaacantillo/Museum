import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

type ArtworkResultCardProps = {
  title: string;
  subtitle?: string;
  imageUrl: string;
};

const ArtworkResultCard = ({ title, subtitle, imageUrl }: ArtworkResultCardProps) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>{title}</Text>
          {subtitle && <Text numberOfLines={1} ellipsizeMode="tail" style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    aspectRatio: 2.5,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    marginBottom: 16,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  imageStyle: {
    // opacity: 0.5,
    borderRadius: 16,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#eee',
    fontSize: 14,
  },
});

export default ArtworkResultCard;
