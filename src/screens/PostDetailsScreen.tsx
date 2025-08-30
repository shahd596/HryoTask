import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getCommentsByPostId, Comment } from '../services/api';
import { useUser } from '../hooks/useUser';
import CommentCard from '../components/CommentCard';

type Props = NativeStackScreenProps<RootStackParamList, 'PostDetails'>;

export default function PostDetailsScreen({ route }: Props) {
  const { post } = route.params;
  const { user } = useUser(post.user_id);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getCommentsByPostId(post.id);
        if (!mounted) return;
        setComments(data);
      } catch (e) {
        console.error('Failed to load comments:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [post.id]);

  const avatarUri = `https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(user?.name ?? 'User')}`;

  return (
    <FlatList
      data={comments}
      keyExtractor={(c) => String(c.id)}
      renderItem={({ item }) => <CommentCard comment={item} />}
      ListHeaderComponent={
        <>
          <View style={styles.header}>
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.username}>{user?.name ?? 'Unknown User'}</Text>
              <Text style={styles.title}>{post.title}</Text>
            </View>
          </View>

          <Text style={styles.body}>{post.body}</Text>
          <Text style={styles.sectionTitle}>Comments</Text>
        </>
      }
      ListEmptyComponent={
        loading ? <ActivityIndicator style={{ marginTop: 16 }} /> :
          <Text style={{ padding: 16, color: '#6b7280' }}>No comments yet.</Text>
      }
      contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
    />
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, backgroundColor: '#fff', padding: 8, borderRadius: 10 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#eee' },
  username: { fontSize: 14, color: '#374151' },
  title: { fontSize: 18, fontWeight: '700', color: '#111827', marginTop: 2 },
  body: { color: '#374151', marginVertical: 12, lineHeight: 20 },
  sectionTitle: { marginTop: 12, marginBottom: 8, fontWeight: '700', fontSize: 16, color: '#111827' }
});
