import { CtfPostService } from '../contentful/cft-posts.service';
import { Post } from '../models/post.model';

export interface PostsServiceInterface {
  /**
   * Get all the posts.
   */
  getPostsAsync(): Promise<Post[]>;
  /**
   * Get a specific post.
   * @param id - The post id.
   */
  getPostAsync(id: string): Promise<Post>;
}

export const PostsService: PostsServiceInterface = CtfPostService;
