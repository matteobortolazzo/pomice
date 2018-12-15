import {CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID} from "../../settings";

export function get<T>(path: string): Promise<T> {
  if (!CONTENTFUL_SPACE_ID) {
    throw new Error('SPACE_ID not set.');
  }
  if (!CONTENTFUL_ACCESS_TOKEN) {
    throw new Error('ACCESS_TOKEN not set.');
  }
  return fetch(`https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/master/${path}&access_token=${CONTENTFUL_ACCESS_TOKEN}`)
    .then(response => response.json());
}
