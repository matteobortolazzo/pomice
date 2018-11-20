import {CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN} from "../settings"
import {Post, DetailFields, ListItemFields} from "./service.models";

export async function getPosts(): Promise<Post[]> {
  const select = `select=sys.id,${ListItemFields.map(f => `fields.${f}`).join(',')}`;
  let collection = await get<CtfCollection<Post>>(`entries?content_type=post&${select}`);
  const posts = collection.items.map(item => ({...item.fields, id: item.sys.id}));
  posts.sort((post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime());
  return posts;
}

export async function getPost(id: string): Promise<Post> {
  const select = `select=sys.id,${DetailFields.map(f => `fields.${f}`).join(',')}`;
  let item = await get<CftItem<Post>>(`entries/${id}?${select}`);
  return item.fields;
}

function get<T>(path: string): Promise<T> {
  if (!CONTENTFUL_SPACE_ID) {
    throw 'SPACE_ID not set.';
  }
  if (!CONTENTFUL_ACCESS_TOKEN) {
    throw 'ACCESS_TOKEN not set.';
  }
  return fetch(`https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/master/${path}&access_token=${CONTENTFUL_ACCESS_TOKEN}`)
    .then(response => response.json());
}
