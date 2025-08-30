import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Avatar from './Avatar';
import { Comment } from '../services/api';

type Props = { comment: Comment };

export default function CommentCard({ comment }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Avatar name={comment.name} size={36} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.name} numberOfLines={1}>{comment.name}</Text>
          <Text style={styles.email} numberOfLines={1}>{comment.email}</Text>
        </View>
      </View>
      <Text style={styles.body}>{comment.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  name: { fontWeight: '600', color: '#111827' },
  email: { fontSize: 12, color: '#6b7280' },
  body: { marginTop: 8, color: '#374151', lineHeight: 18 }
});
