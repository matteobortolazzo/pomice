export interface TutorialPreview {
  id: string;
  title: string;
  slug: string;
  createdAt: Date;
  description: string;
  tags: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  duration: number;
  content: string;
  tags: string;
}
