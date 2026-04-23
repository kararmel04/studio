'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Code, Search, Copy, Check } from 'lucide-react';
import { snippets as allSnippets } from '@/lib/snippets';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SnippetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredSnippets = allSnippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    toast({
      title: 'Copied to clipboard!',
    });
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight font-headline flex items-center gap-3">
          <Code className="h-10 w-10 text-primary" />
          Snippet Library
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your personal collection of reusable code snippets.
        </p>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search snippets..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredSnippets.map((snippet) => (
          <Card key={snippet.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div>
                    <CardTitle>{snippet.title}</CardTitle>
                    <CardDescription className="mt-1">{snippet.description}</CardDescription>
                </div>
                 <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleCopy(snippet.id, snippet.code)}
                 >
                    {copiedSnippet === snippet.id ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                 </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <div className="relative flex-grow rounded-md bg-black/50">
                <ScrollArea className="absolute inset-0">
                  <SyntaxHighlighter
                    language={snippet.language}
                    style={atomDark}
                    customStyle={{ background: 'transparent', padding: '1rem', margin: 0 }}
                    codeTagProps={{ className: 'text-sm font-code' }}
                  >
                    {snippet.code}
                  </SyntaxHighlighter>
                </ScrollArea>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary">{snippet.language}</Badge>
                {snippet.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
       {filteredSnippets.length === 0 && (
          <div className="text-center text-muted-foreground py-16">
            <p>No snippets found.</p>
          </div>
        )}
    </div>
  );
}
