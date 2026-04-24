import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Bot, Code, FileText, ArrowRight, BookOpen, Dumbbell, ClipboardList } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight font-headline">Welcome to DevFlow Wiki</h1>
        <p className="mt-2 text-lg text-muted-foreground">Your personal hub for technical knowledge and developer tools.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="text-primary" />
              <span>Knowledge Base</span>
            </CardTitle>
            <CardDescription>
              Explore your organized markdown documents.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>Browse through your categories and tags to quickly find the information you need. Your personal wiki is at your fingertips.</p>
          </CardContent>
          <div className="p-6 pt-0">
             <Link href="/wiki/guides/getting-started" passHref>
               <Button variant="ghost" className="text-primary hover:text-primary">Explore Wiki <ArrowRight className="ml-2 h-4 w-4" /></Button>
             </Link>
          </div>
        </Card>

        <Card className="flex flex-col bg-primary/10 border-primary/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="text-accent"/>
              <span>Error Analyzer</span>
            </CardTitle>
            <CardDescription>
              Instantly analyze stack traces and error messages.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>Paste in your errors to get AI-powered insights, potential causes, and links to relevant documentation in your wiki.</p>
          </CardContent>
           <div className="p-6 pt-0">
            <Link href="/analyzer" passHref>
              <Button>
                <span>Launch Analyzer</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="text-primary" />
              <span>Snippet Library</span>
            </CardTitle>
            <CardDescription>
              Access your reusable code snippets.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>A smart library for all your essential code snippets. Organized, tagged, and ready to be copied with a single click.</p>
          </CardContent>
           <div className="p-6 pt-0">
            <Link href="/snippets" passHref>
              <Button variant="secondary">
                <span>Go to Snippets</span>
                 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="text-primary" />
              <span>Glossary</span>
            </CardTitle>
            <CardDescription>
              Technical definitions and best practices.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>Explore technical terms with definitions, examples, anti-patterns, and best practices.</p>
          </CardContent>
           <div className="p-6 pt-0">
            <Link href="/glossary" passHref>
              <Button variant="outline">
                <span>Browse Glossary</span>
                 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="text-primary" />
              <span>Exercises</span>
            </CardTitle>
            <CardDescription>
              Practice with hands-on challenges.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>Test your skills with interactive exercises featuring hints, solutions, and detailed explanations.</p>
          </CardContent>
           <div className="p-6 pt-0">
            <Link href="/exercises" passHref>
              <Button variant="outline">
                <span>Start Exercising</span>
                 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="text-primary" />
              <span>Troubleshooting</span>
            </CardTitle>
            <CardDescription>
              Step-by-step diagnostic guides.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>Follow structured playbooks to diagnose and resolve common development issues.</p>
          </CardContent>
           <div className="p-6 pt-0">
            <Link href="/troubleshooting" passHref>
              <Button variant="outline">
                <span>View Playbooks</span>
                 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookCopy className="text-primary" />
              <span>Cheat Sheets</span>
            </CardTitle>
            <CardDescription>
              Quick reference commands.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>Essential commands and patterns for Linux, Git, Gradle, React, Docker and more.</p>
          </CardContent>
           <div className="p-6 pt-0">
            <Link href="/cheatsheet" passHref>
              <Button variant="outline">
                <span>View Cheat Sheets</span>
                 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <section>
        <h2 className="text-2xl font-bold tracking-tight font-headline">Getting Started</h2>
        <p className="mt-2 text-muted-foreground">New to DevFlow Wiki? Here are some tips:</p>
        <ul className="mt-4 list-disc list-inside space-y-2">
          <li>Use the sidebar to navigate through your wiki content.</li>
          <li>Add your own Markdown files to the `src/content` directory.</li>
          <li>Organize your files into folders to create categories.</li>
          <li>Use YAML frontmatter in your files for titles, tags, and categories.</li>
        </ul>
      </section>
    </div>
  )
}
