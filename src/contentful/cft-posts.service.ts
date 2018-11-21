import { DetailFields } from '../contentful/fields/post-detail';
import { ListItemFields } from '../contentful/fields/post-preview';
import { Post } from '../models/post.model';
import { PostsServiceInterface } from '../services/posts.service';
import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } from '../settings';

export const CtfPostService: PostsServiceInterface = {
  async getPostsAsync(): Promise<Post[]> {
    // Generate the list of fields that need to be displayed
    const select = `select=sys.id,${ListItemFields.map(f => `fields.${f}`).join(',')}`;
    // Ask the server
    const collection = await get<CtfCollection<Post>>(`entries?content_type=post&${select}`);
    // Generate the post list from the response
    const posts = collection.items.map(item => ({ ...item.fields, id: item.sys.id }));
    // Sort by date descending
    posts.sort((post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime());
    return posts;
  },
  async getPostAsync(id: string): Promise<Post> {
    // Generate the list of fields that need to be displayed
    const select = `select=sys.id,${DetailFields.map(f => `fields.${f}`).join(',')}`;
    // Ask the server
    const item = await get<CftItem<Post>>(`entries/${id}?${select}`);
    return item.fields;
  }
};

function get<T>(path: string): Promise<T> {
  if (!CONTENTFUL_SPACE_ID) {
    throw new Error('SPACE_ID not set.');
  }
  if (!CONTENTFUL_ACCESS_TOKEN) {
    throw new Error('ACCESS_TOKEN not set.');
  }
  return fetch(`https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/master/${path}&access_token=${CONTENTFUL_ACCESS_TOKEN}`)
    .then(response => response.json());
}
