'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, FileText, Lightbulb, Loader, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { analyzeError } from '@/lib/ai';
import { useToast } from '@/hooks/use-toast';

type AnalysisResult = {
  errorType: string;
  technology: string;
  suggestions: string[];
  relatedDocs: { title: string; slug: string }[];
};

export default function AnalyzerPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!input.trim()) {
      toast({
        title: 'Input required',
        description: 'Please paste an error message or stack trace.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setResult(null);
    try {
      const analysis = await analyzeError(input);
      setResult(analysis);
    } catch (error) {
      toast({
        title: 'Analysis Failed',
        description: 'An unexpected error occurred while analyzing.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline flex items-center justify-center gap-3">
          <Bot className="h-10 w-10 text-primary" />
          Error Analyzer
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Paste your stack trace or error message to get AI-powered insights and solutions.
        </p>
      </header>

      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4">
            <Textarea
              placeholder="Paste your error message or stack trace here..."
              className="min-h-[200px] font-code text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={handleAnalyze} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Loader className="h-5 w-5 animate-spin" />
          <span>Thinking...</span>
        </div>
      )}

      {result && (
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span>Error Type:</span>
                <span className="font-mono text-primary">{result.errorType}</span>
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold">
                <FileText className="h-5 w-5 text-accent" />
                <span>Technology:</span>
                <span className="font-mono text-primary">{result.technology}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                Suggestions
              </h3>
              <ul className="list-disc list-inside space-y-2 pl-2">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>

            {result.relatedDocs.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                  <LinkIcon className="h-5 w-5 text-blue-400" />
                  Related Wiki Pages
                </h3>
                <ul className="space-y-2">
                  {result.relatedDocs.map((doc, index) => (
                    <li key={index}>
                      <Link href={`/wiki/${doc.slug}`} passHref>
                        <Button variant="link" className="p-0 h-auto text-base">
                          {doc.title}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
