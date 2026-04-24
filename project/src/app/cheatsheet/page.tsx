'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookCopy, Search, Copy, Check, Terminal } from 'lucide-react';
import { cheatSheets } from '@/lib/cheatsheets';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CheatsheetPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = [...new Set(cheatSheets.map(s => s.category))];

  const filteredSheets = cheatSheets.filter(
    (sheet) => {
      const matchesSearch =
        sheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sheet.items.some(item => 
          item.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        sheet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = !selectedCategory || sheet.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }
  );

  const handleCopy = (id: string, command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(id);
    toast({
      title: 'Command copied!',
    });
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight font-headline flex items-center gap-3">
          <BookCopy className="h-10 w-10 text-primary" />
          Cheat Sheets
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Quick reference for essential commands and patterns.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search commands..."
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
        {filteredSheets.map((sheet) => (
          <Card key={sheet.id}>
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-2xl">{sheet.title}</CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary">{sheet.category}</Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sheet.items.map((item, index) => {
                  const copyId = `${sheet.id}-${index}`;
                  return (
                    <div key={index} className="group flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Terminal className="h-4 w-4 text-primary flex-shrink-0" />
                          <code className="text-sm font-mono bg-muted px-2 py-0.5 rounded text-primary">
                            {item.command}
                          </code>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleCopy(copyId, item.command)}
                          >
                            {copiedCommand === copyId ? (
                              <Check className="h-3 w-3 text-green-500" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground pl-6">{item.description}</p>
                        {item.example && (
                          <ScrollArea className="max-h-[100px] mt-2 pl-6">
                            <code className="text-xs font-mono bg-black/30 px-2 py-1 rounded block">
                              {item.example}
                            </code>
                          </ScrollArea>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                {sheet.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSheets.length === 0 && (
        <div className="text-center text-muted-foreground py-16">
          <p>No cheat sheets found.</p>
        </div>
      )}
    </div>
  );
}
