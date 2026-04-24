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

export type GlossaryTerm = {
  id: string;
  term: string;
  category: string;
  definition: string;
  example: string;
  antiPatterns: string[];
  bestPractices: string[];
  relatedPages: { title: string; slug: string }[];
};

export type Exercise = {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  statement: string;
  hints: string[];
  solution: string;
  explanation: string;
  tags: string[];
};

export type Playbook = {
  id: string;
  title: string;
  symptoms: string[];
  probableCauses: string[];
  commands: string[];
  solutions: string[];
  finalChecks: string[];
  relatedPages: { title: string; slug: string }[];
  tags: string[];
};

export type CheatSheet = {
  id: string;
  title: string;
  category: string;
  items: { command: string; description: string; example?: string }[];
  tags: string[];
};
