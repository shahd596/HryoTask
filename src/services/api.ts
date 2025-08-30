import axios from 'axios';

export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export type Comment = {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
};

export type User = {
  id: number;
  name: string;
  email?: string;
  // other optional fields from gorest
  gender?: string;
  status?: string;
};

export const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v2',
  timeout: 15000,
});

// Fetch posts (supports pagination)
export async function getPosts(page = 1, per_page = 20): Promise<Post[]> {
  const res = await api.get<Post[]>('/posts', { params: { page, per_page } });
  return res.data;
}

// Fetch comments for a given post id
export async function getCommentsByPostId(postId: number): Promise<Comment[]> {
  const res = await api.get<Comment[]>('/comments', { params: { post_id: postId } });
  return res.data;
}

// Fetch user by id (used to get user name for posts)
export async function getUserById(userId: number): Promise<User | null> {
  try {
    const res = await api.get<User>(`/users/${userId}`);
    return res.data;
  } catch (e) {
    // If user is not found or request fails, return null
    return null;
  }
}
