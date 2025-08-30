import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Post } from '../services/api';
import { useUser } from '../hooks/useUser';
import Avatar from './Avatar';

type Props = {
  post: Post;
  onPress?: () => void;
};

export default function PostCard({ post, onPress }: Props) {
  const { user } = useUser(post.user_id);
  const displayName = user?.name ?? `User ${post.user_id}`;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.row}>
        <Avatar name={displayName} size={48} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.username} numberOfLines={1}>{displayName}</Text>
          <Text style={styles.title} numberOfLines={2}>{post.title}</Text>
        </View>
      </View>
      <Text style={styles.body} numberOfLines={3}>{post.body}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  pressed: { opacity: 0.85 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  username: { fontSize: 13, color: '#374151' },
  title: { fontSize: 16, fontWeight: '600', color: '#111827' },
  body: { marginTop: 6, color: '#4b5563', lineHeight: 20 }
});
