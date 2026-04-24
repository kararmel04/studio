'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Copy, Check, ExternalLink } from 'lucide-react';
import { glossaryTerms } from '@/lib/glossary';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from 'next/link';

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = [...new Set(glossaryTerms.map(t => t.category))];

  const filteredTerms = glossaryTerms.filter(
    (term) => {
      const matchesSearch = 
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = !selectedCategory || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }
  );

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTerm(id);
    toast({
      title: 'Copied to clipboard!',
    });
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight font-headline flex items-center gap-3">
          <BookOpen className="h-10 w-10 text-primary" />
          Technical Glossary
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Definitions, examples, and best practices for technical concepts.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search terms..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!selectedCategory ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredTerms.map((term) => (
          <Card key={term.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-2xl">{term.term}</CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary">{term.category}</Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Definition</h4>
                <p className="text-muted-foreground">{term.definition}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Example</h4>
                <div className="relative rounded-md bg-black/50">
                  <ScrollArea className="max-h-[200px]">
                    <SyntaxHighlighter
                      language={term.category.toLowerCase().includes('react') ? 'typescript' : term.category.toLowerCase().includes('java') ? 'java' : term.category.toLowerCase().includes('git') ? 'bash' : 'plaintext'}
                      style={atomDark}
                      customStyle={{ background: 'transparent', padding: '1rem', margin: 0 }}
                      codeTagProps={{ className: 'text-sm font-code' }}
                    >
                      {term.example}
                    </SyntaxHighlighter>
                  </ScrollArea>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => handleCopy(term.id, term.example)}
                  >
                    {copiedTerm === term.id ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-destructive/10 p-4 rounded-md">
                  <h4 className="font-semibold mb-2 text-destructive">Anti-Patterns</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {term.antiPatterns.map((pattern, i) => (
                      <li key={i}>{pattern}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-500/10 p-4 rounded-md">
                  <h4 className="font-semibold mb-2 text-green-500">Best Practices</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {term.bestPractices.map((practice, i) => (
                      <li key={i}>{practice}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {term.relatedPages.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Related Pages</h4>
                  <div className="flex flex-wrap gap-2">
                    {term.relatedPages.map((page, i) => (
                      <Link key={i} href={`/wiki/${page.slug}`} passHref>
                        <Button variant="outline" size="sm" className="gap-2">
                          <ExternalLink className="h-3 w-3" />
                          {page.title}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {term.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center text-muted-foreground py-16">
          <p>No terms found.</p>
        </div>
      )}
    </div>
  );
}
