import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post } from '@/types';

const contentDirectory = path.join(process.cwd(), 'src/content');

async function getFilePaths(dir: string): Promise<string[]> {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFilePaths(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

export async function getPosts(): Promise<Post[]> {
  try {
    const filePaths = (await getFilePaths(contentDirectory)).filter((file) => file.endsWith('.md'));

    const posts = filePaths.map((filePath) => {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      const slug = path
        .relative(contentDirectory, filePath)
        .replace(/\.md$/, '')
        .split(path.sep)
        .join('/');

      return {
        slug,
        title: data.title || 'Untitled',
        category: data.category || path.dirname(slug).split('/')[0] || 'General',
        tags: data.tags || [],
        content,
      };
    });

    return posts.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    // If the content directory doesn't exist, return an empty array
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      console.warn("`src/content` directory not found. Wiki will be empty.");
      return [];
    }
    throw error;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export async function getCategoriesAndTags(): Promise<{ categories: string[]; tags: string[] }> {
  const posts = await getPosts();
  const categories = [...new Set(posts.map((post) => post.category))];
  const tags = [...new Set(posts.flatMap((post) => post.tags))];
  return {
    categories: categories.sort(),
    tags: tags.sort(),
  };
}
