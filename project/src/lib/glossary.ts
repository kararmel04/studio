import type { GlossaryTerm } from '@/types';

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: '1',
    term: 'Component',
    category: 'React',
    definition: 'A reusable building block of a React application. Components can be functional or class-based and return JSX to render UI elements.',
    example: `function Button({ label }) {
  return <button>{label}</button>;
}`,
    antiPatterns: ['Creating components inside other components (causes re-mounts)', 'Using too many props (consider composition)'],
    bestPractices: ['Keep components small and focused on a single responsibility', 'Use functional components with hooks for state logic'],
    relatedPages: [{ title: 'React Hooks Guide', slug: 'react/hooks' }],
  },
  {
    id: '2',
    term: 'useState',
    category: 'React',
    definition: 'A React Hook that lets you add state to functional components. Returns an array with the current state value and a function to update it.',
    example: `const [count, setCount] = useState(0);`,
    antiPatterns: ['Storing derived values in state instead of computing them', 'Updating state based on previous state without using the callback form'],
    bestPractices: ['Use the callback form setState(prev => ...) when new state depends on previous state', 'Group related state variables together'],
    relatedPages: [{ title: 'React Hooks Guide', slug: 'react/hooks' }],
  },
  {
    id: '3',
    term: 'NullPointerException',
    category: 'Java',
    definition: 'An exception thrown when attempting to use an object reference that is null. Common in Java applications when objects are not properly initialized.',
    example: `String str = null;
int length = str.length(); // Throws NullPointerException`,
    antiPatterns: ['Not checking for null before accessing object methods', 'Returning null from methods instead of Optional or empty collections'],
    bestPractices: ['Use Optional<T> for nullable return values', 'Validate inputs at method boundaries', 'Use Objects.requireNonNull() for explicit null checks'],
    relatedPages: [],
  },
  {
    id: '4',
    term: 'Gradle',
    category: 'Build Tools',
    definition: 'A build automation tool that uses a Groovy or Kotlin-based DSL. Widely used for Java, Kotlin, and Android projects.',
    example: `plugins {
    id 'java'
}

dependencies {
    implementation 'com.google.guava:guava:31.0-jre'
}`,
    antiPatterns: ['Putting all logic in build.gradle instead of using convention plugins', 'Hardcoding versions instead of using version catalogs'],
    bestPractices: ['Use Gradle Kotlin DSL for type safety', 'Leverage version catalogs for dependency management', 'Cache dependencies effectively'],
    relatedPages: [],
  },
  {
    id: '5',
    term: 'CSS Flexbox',
    category: 'CSS',
    definition: 'A one-dimensional layout model for arranging items in rows or columns with powerful alignment and distribution capabilities.',
    example: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}`,
    antiPatterns: ['Using flexbox for complex 2D layouts (use Grid instead)', 'Forgetting to set flex-wrap for responsive designs'],
    bestPractices: ['Use flex shorthand property', 'Combine with Grid for complex layouts', 'Use gap instead of margins between flex items'],
    relatedPages: [],
  },
  {
    id: '6',
    term: 'Docker Container',
    category: 'DevOps',
    definition: 'A lightweight, standalone executable package that includes everything needed to run software: code, runtime, system tools, libraries, and settings.',
    example: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`,
    antiPatterns: ['Running multiple processes in a single container', 'Using latest tag in production', 'Storing data inside containers'],
    bestPractices: ['Use multi-stage builds to reduce image size', 'Run as non-root user', 'Use specific version tags', 'Leverage .dockerignore'],
    relatedPages: [],
  },
  {
    id: '7',
    term: 'Git Rebase',
    category: 'Git',
    definition: 'A Git command that integrates changes from one branch onto another by rewriting commit history. Creates a linear history.',
    example: `# Rebase feature branch onto main
git checkout feature
git rebase main`,
    antiPatterns: ['Rebasing shared/public branches (rewrites history)', 'Using rebase when merge would preserve important context'],
    bestPractices: ['Use interactive rebase (git rebase -i) to clean up commits', 'Only rebase local, unpushed commits', 'Use merge for integrating public branches'],
    relatedPages: [],
  },
  {
    id: '8',
    term: 'REST API',
    category: 'Backend',
    definition: 'An architectural style for designing networked applications using HTTP requests to perform CRUD operations on resources.',
    example: `GET    /users       # List users
POST   /users       # Create user
GET    /users/:id   # Get user
PUT    /users/:id   # Update user
DELETE /users/:id   # Delete user`,
    antiPatterns: ['Using GET requests for state-changing operations', 'Returning HTML instead of JSON', 'Not using proper HTTP status codes'],
    bestPractices: ['Use proper HTTP methods (GET, POST, PUT, DELETE)', 'Return appropriate status codes (200, 201, 400, 404, 500)', 'Version your APIs (/api/v1/)'],
    relatedPages: [],
  },
];
