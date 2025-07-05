// src/components/ImageCard.tsx
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

const ImageCard = ({ source }: { source: ImageSourcePropType }) => {
  return (
    <View style={styles.card}>
      <Image source={source} style={styles.image} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: '#fff',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: 220,
  },
});

export default ImageCard;
