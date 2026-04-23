import { getPostBySlug, getPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

type Props = {
  params: {
    slug: string[];
  };
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: Props) {
    const slug = params.slug.join('/');
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Not Found'
        }
    }

    return {
        title: `${post.title} | DevFlow Wiki`,
        description: `DevFlow wiki page for ${post.title}`,
    };
}


export default async function WikiPage({ params }: Props) {
  const slug = params.slug.join('/');
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-5xl font-bold tracking-tighter font-headline mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Badge variant="secondary">{post.category}</Badge>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </header>
      
      <MarkdownRenderer content={post.content} />

    </article>
  );
}
