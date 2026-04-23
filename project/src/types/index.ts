export type Post = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  content: string;
};

export type Snippet = {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  tags: string[];
};
