import { CtfPostService } from '../contentful/cft-posts.service';
import { Post } from '../models/post.model';

export interface PostsServiceInterface {
  getPostsAsync: () => Promise<Post[]>;
  getPostAsync: (id: string) => Promise<Post>;
}

export const PostsService: PostsServiceInterface = CtfPostService;
