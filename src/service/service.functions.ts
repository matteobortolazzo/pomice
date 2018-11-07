import {SPACE_ID, ACCESS_TOKEN} from "./service.keys"
import {Post, DetailFields, ListItemFields} from "./service.models";
const CONTENT_ID = 'post';

export async function getPosts(): Promise<Post[]> {
  const contentType = `content_type=${CONTENT_ID}`;
  const select = `select=sys.id,${ListItemFields.map(f => `fields.${f}`).join(',')}`;
  let collection: CtfCollection<Post> = await get(`entries?${contentType}&${select}`);
  return collection.items.map(item => ({...item.fields, id: item.sys.id}));
}

export async function getPost(id: string): Promise<Post> {
  const select = `select=sys.id,${DetailFields.map(f => `fields.${f}`).join(',')}`;
  let item: CftItem<Post> = await get(`entries/${id}?${select}`);
  return item.fields;
}

function get(path: string): Promise<any> {
  return fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/${path}&access_token=${ACCESS_TOKEN}`)
    .then(response => response.json());
}
