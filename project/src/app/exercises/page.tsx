'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Search, Lightbulb, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { exercises } from '@/lib/exercises';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const difficultyColors = {
  beginner: 'bg-green-500/10 text-green-500 border-green-500',
  intermediate: 'bg-yellow-500/10 text-yellow-500 border-yellow-500',
  advanced: 'bg-red-500/10 text-red-500 border-red-500',
};

export default function ExercisesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [revealedHints, setRevealedHints] = useState<Record<string, number>>({});
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});

  const filteredExercises = exercises.filter(
    (exercise) => {
      const matchesSearch =
        exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.statement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDifficulty = !selectedDifficulty || exercise.difficulty === selectedDifficulty;
      return matchesSearch && matchesDifficulty;
    }
  );

  const toggleHint = (exerciseId: string, hintIndex: number) => {
    setRevealedHints(prev => ({
      ...prev,
      [exerciseId]: prev[exerciseId] !== undefined ? Math.max(prev[exerciseId], hintIndex + 1) : 1
    }));
  };

  const toggleSolution = (exerciseId: string) => {
    setShowSolution(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight font-headline flex items-center gap-3">
          <Dumbbell className="h-10 w-10 text-primary" />
          Exercises & Challenges
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Practice your skills with hands-on exercises and challenges.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            placeholder="Search exercises..."
            className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!selectedDifficulty ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDifficulty(null)}
          >
            All
          </Button>
          {(['beginner', 'intermediate', 'advanced'] as const).map((difficulty) => (
            <Button
              key={difficulty}
              variant={selectedDifficulty === difficulty ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(difficulty)}
              className={selectedDifficulty === difficulty ? difficultyColors[difficulty] : ''}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-2xl">{exercise.title}</CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary">{exercise.category}</Badge>
                    <Badge className={difficultyColors[exercise.difficulty]} variant="outline">
                      {exercise.difficulty}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Challenge</h4>
                <p className="text-muted-foreground">{exercise.statement}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Hints
                </h4>
                <div className="space-y-2">
                  {exercise.hints.map((hint, index) => {
                    const isRevealed = (revealedHints[exercise.id] || 0) > index;
                    return (
                      <div key={index} className="flex items-start gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleHint(exercise.id, index)}
                          disabled={isRevealed}
                          className="h-auto p-1"
                        >
                          {isRevealed ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <span className={isRevealed ? '' : 'blur-sm select-none'}>
                          {isRevealed ? hint : 'Click to reveal hint'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <Button
                  variant="outline"
                  onClick={() => toggleSolution(exercise.id)}
                  className="gap-2"
                >
                  {showSolution[exercise.id] ? (
                    <>
                      <EyeOff className="h-4 w-4" />
                      Hide Solution
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      Show Solution
                    </>
                  )}
                </Button>
              </div>

              {showSolution[exercise.id] && (
                <>
                  <div>
                    <h4 className="font-semibold mb-2">Solution</h4>
                    <div className="relative rounded-md bg-black/50">
                      <ScrollArea className="max-h-[400px]">
                        <SyntaxHighlighter
                          language={exercise.category.toLowerCase().includes('react') ? 'typescript' : exercise.category.toLowerCase().includes('java') ? 'java' : exercise.category.toLowerCase().includes('git') || exercise.category.toLowerCase().includes('linux') ? 'bash' : 'plaintext'}
                          style={atomDark}
                          customStyle={{ background: 'transparent', padding: '1rem', margin: 0 }}
                          codeTagProps={{ className: 'text-sm font-code' }}
                        >
                          {exercise.solution}
                        </SyntaxHighlighter>
                      </ScrollArea>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Explanation</h4>
                    <p className="text-muted-foreground">{exercise.explanation}</p>
                  </div>
                </>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {exercise.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center text-muted-foreground py-16">
          <p>No exercises found.</p>
        </div>
      )}
    </div>
  );
}
