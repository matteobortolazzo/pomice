export interface Post {
  id: string;
  heading: string;
  description: string;
  slug: string;
  date: Date;
  duration: number;
  tags: string;
  content: string;
}

export const ListItemFields  = [
  'heading', 'description', 'slug', 'date', 'tags'
];

export const DetailFields  = [
  'heading', 'description', 'slug', 'date', 'duration', 'tags', 'content'
];
