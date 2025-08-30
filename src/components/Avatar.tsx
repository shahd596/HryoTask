import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

type Props = {
  name?: string;
  size?: number;
  style?: any;
};

export default function Avatar({ name = 'User', size = 44, style }: Props) {
  const seed = encodeURIComponent(name || 'user');
  // Dicebear initials avatar (PNG)
  const uri = `https://api.dicebear.com/7.x/initials/png?seed=${seed}&radius=50`;

  return (
    <View style={[styles.container, style, { width: size, height: size, borderRadius: size / 2 }]}>
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6e6e6',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
