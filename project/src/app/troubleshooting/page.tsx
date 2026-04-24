'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ClipboardList, Search, Terminal, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { playbooks } from '@/lib/playbooks';
import Link from 'next/link';

export default function TroubleshootingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlaybook, setSelectedPlaybook] = useState<string | null>(null);

  const filteredPlaybooks = playbooks.filter(
    (playbook) => {
      const matchesSearch =
        playbook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        playbook.symptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        playbook.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    }
  );

  const currentPlaybook = selectedPlaybook ? playbooks.find(p => p.id === selectedPlaybook) : null;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight font-headline flex items-center gap-3">
          <ClipboardList className="h-10 w-10 text-primary" />
          Troubleshooting Playbooks
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Step-by-step guides for diagnosing and resolving common issues.
        </p>
      </header>

      {!currentPlaybook ? (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search playbooks by symptom, title, or tag..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredPlaybooks.map((playbook) => (
              <Card key={playbook.id} className="flex flex-col cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setSelectedPlaybook(playbook.id)}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    {playbook.title}
                  </CardTitle>
                  <CardDescription>
                    {playbook.symptoms.slice(0, 2).join(', ')}
                    {playbook.symptoms.length > 2 && '...'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {playbook.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="secondary" className="w-full">
                    View Playbook
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPlaybooks.length === 0 && (
            <div className="text-center text-muted-foreground py-16">
              <p>No playbooks found.</p>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-6">
          <Button variant="outline" onClick={() => setSelectedPlaybook(null)} className="gap-2">
            ← Back to Playbooks
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                {currentPlaybook.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Symptoms
                </h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {currentPlaybook.symptoms.map((symptom, i) => (
                    <li key={i}>{symptom}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Probable Causes</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {currentPlaybook.probableCauses.map((cause, i) => (
                    <li key={i}>{cause}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-blue-500" />
                  Diagnostic Commands
                </h3>
                <div className="space-y-2">
                  {currentPlaybook.commands.map((cmd, i) => (
                    <div key={i} className="bg-muted p-3 rounded-md font-mono text-sm">
                      {cmd}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Solutions
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  {currentPlaybook.solutions.map((solution, i) => (
                    <li key={i} className="pl-2">{solution}</li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Final Checks</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {currentPlaybook.finalChecks.map((check, i) => (
                    <li key={i}>{check}</li>
                  ))}
                </ul>
              </div>

              {currentPlaybook.relatedPages.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Related Documentation</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentPlaybook.relatedPages.map((page, i) => (
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

              <div className="flex flex-wrap gap-2 pt-4 border-t">
                {currentPlaybook.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
