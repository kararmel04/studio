import type { Snippet } from '@/types';

export const snippets: Snippet[] = [
  {
    id: '1',
    title: 'JavaFX Boilerplate',
    description: 'A minimal boilerplate for a JavaFX application.',
    language: 'java',
    code: `import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

public class HelloWorld extends Application {
    @Override
    public void start(Stage stage) {
        String javaVersion = System.getProperty("java.version");
        String javafxVersion = System.getProperty("javafx.version");
        Label l = new Label("Hello, JavaFX " + javafxVersion + ", running on Java " + javaVersion + ".");
        Scene scene = new Scene(new StackPane(l), 640, 480);
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}`,
    tags: ['javafx', 'gui', 'java'],
  },
  {
    id: '2',
    title: 'Gradle Kotlin DSL Plugin',
    description: 'Applying a plugin using Gradle Kotlin DSL.',
    language: 'kotlin',
    code: `plugins {
    id("java")
    application
}`,
    tags: ['gradle', 'build', 'kotlin'],
  },
  {
    id: '3',
    title: 'Find files with grep',
    description: 'Find all files containing a specific string recursively.',
    language: 'bash',
    code: `grep -r "search_string" .`,
    tags: ['linux', 'cli', 'search'],
  },
  {
    id: '4',
    title: 'React Functional Component',
    description: 'A basic functional component in React with TypeScript.',
    language: 'typescript',
    code: `import React from 'react';

interface MyComponentProps {
  title: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default MyComponent;`,
    tags: ['react', 'typescript', 'frontend'],
  },
  {
    id: '5',
    title: 'Python FastAPI Endpoint',
    description: 'A simple GET endpoint using the FastAPI framework.',
    language: 'python',
    code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}`,
    tags: ['python', 'fastapi', 'backend', 'api'],
  },
    {
    id: '6',
    title: 'Docker Compose for Node.js',
    description: 'A simple docker-compose file for a Node.js app with a Postgres DB.',
    language: 'yaml',
    code: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`,
    tags: ['docker', 'nodejs', 'postgres'],
  },
];
