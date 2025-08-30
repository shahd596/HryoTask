import { Post } from '../services/api';

export type RootStackParamList = {
  Home: undefined;
  // We pass the whole post object so details screen can render immediately
  PostDetails: { post: Post };
};
