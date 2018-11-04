import {Tutorial, TutorialPreview} from "./service.models";
import {SPACE_ID, ACCESS_TOKEN} from "./service.keys"
const CONTENT_ID = 'tutorial';

export async function getTutorials(): Promise<TutorialPreview[]> {
  let fields = ['title', 'slug', 'description', 'createdAt', 'tags'];
  const contentType = `content_type=${CONTENT_ID}`;
  const select = `select=sys.id,${fields.map(f => `fields.${f}`).join(',')}`;
  let collection: CtfCollection<TutorialPreview> = await get(`entries?${contentType}&${select}`);
  return collection.items.map(item => ({...item.fields, id: item.sys.id}));
}

export async function getTutorial(id: string): Promise<Tutorial> {
  let fields = ['title','slug','description','duration','createdAt','tags','content'];
  const select = `select=sys.id,${fields.map(f => `fields.${f}`).join(',')}`;
  let item: CftItem<Tutorial> = await get(`entries/${id}?${select}`);
  return item.fields;
}

function get(path: string): Promise<any> {
  return fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/${path}&access_token=${ACCESS_TOKEN}`)
    .then(response => response.json());
}
