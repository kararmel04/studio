import type { Exercise } from '@/types';

export const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Create a Counter Component',
    category: 'React',
    difficulty: 'beginner',
    statement: `Create a React functional component that displays a counter with increment and decrement buttons. The counter should start at 0 and update when the buttons are clicked.`,
    hints: [
      'Use the useState hook to manage the counter state',
      'Create two button handlers: one for incrementing and one for decrementing',
      'Display the current count value between the buttons',
    ],
    solution: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

export default Counter;`,
    explanation: `This solution uses the useState hook to create a stateful counter. We use the callback form of setCount (prev => ...) to ensure we're working with the latest state value. The component renders two buttons that call increment and decrement functions, with the current count displayed between them.`,
    tags: ['react', 'hooks', 'useState', 'beginner'],
  },
  {
    id: '2',
    title: 'Fix a Gradle Build Error',
    category: 'Gradle',
    difficulty: 'intermediate',
    statement: `Your Gradle build is failing with the error: "Could not resolve all dependencies for configuration ':compileClasspath'". The project uses Java 17 and needs to include the Guava library version 31.0-jre. Fix the build.gradle.kts file.`,
    hints: [
      'Check if the repositories block includes mavenCentral()',
      'Verify the dependency declaration syntax for Kotlin DSL',
      'Ensure Java toolchain is configured for Java 17',
    ],
    solution: `plugins {
    java
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("com.google.guava:guava:31.0-jre")
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(17))
    }
}

application {
    mainClass.set("com.example.Main")
}`,
    explanation: `The solution ensures three key things: 1) The mavenCentral() repository is declared so Gradle can find dependencies, 2) The dependency is correctly declared using Kotlin DSL syntax with parentheses and quotes, and 3) The Java toolchain is properly configured for Java 17. Common mistakes include forgetting the repository, using Groovy syntax in Kotlin DSL, or misconfiguring the Java version.`,
    tags: ['gradle', 'build', 'java', 'debugging'],
  },
  {
    id: '3',
    title: 'Linux File Search Challenge',
    category: 'Linux',
    difficulty: 'beginner',
    statement: `You need to find all JavaScript files in the /var/www directory that contain the string "console.log" and display only the filenames (not the matching lines). Write the command to accomplish this.`,
    hints: [
      'Use grep with the -r flag for recursive search',
      'Use the -l flag to show only filenames',
      'Combine with the directory path and search pattern',
    ],
    solution: `grep -rl "console.log" /var/www --include="*.js"`,
    explanation: `The command uses grep with three important flags: -r for recursive search through subdirectories, -l to list only filenames (not matching lines), and --include="*.js" to filter only JavaScript files. This is more efficient than using find with grep because grep handles both the recursion and filtering in one command.`,
    tags: ['linux', 'grep', 'search', 'cli'],
  },
  {
    id: '4',
    title: 'Design a JavaFX Layout',
    category: 'JavaFX',
    difficulty: 'intermediate',
    statement: `Create a JavaFX layout with a VBox containing a Label at the top, an HBox with two Buttons in the middle, and a TextField at the bottom. The buttons should be centered horizontally, and there should be 10px spacing between all elements.`,
    hints: [
      'Use VBox as the root container',
      'Set spacing on the VBox using setSpacing()',
      'Create an HBox for the buttons and set its alignment to CENTER',
      'Use HBox.setHgrow() or padding if needed for centering',
    ],
    solution: `import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.geometry.Pos;
import javafx.stage.Stage;

public class LayoutExample extends Application {
    @Override
    public void start(Stage stage) {
        Label label = new Label("Welcome!");
        
        Button button1 = new Button("OK");
        Button button2 = new Button("Cancel");
        
        HBox buttonBox = new HBox(10, button1, button2);
        buttonBox.setAlignment(Pos.CENTER);
        
        TextField textField = new TextField();
        textField.setPromptText("Enter text...");
        
        VBox root = new VBox(10, label, buttonBox, textField);
        root.setPadding(new Insets(20));
        
        Scene scene = new Scene(root, 400, 300);
        stage.setScene(scene);
        stage.setTitle("JavaFX Layout Example");
        stage.show();
    }
    
    public static void main(String[] args) {
        launch(args);
    }
}`,
    explanation: `This solution demonstrates proper JavaFX layout composition. The VBox serves as the main container with 10px spacing between children. The HBox groups the two buttons with its own 10px spacing and CENTER alignment. Padding is added to the VBox for better visual appearance. This approach creates a clean, maintainable UI structure.`,
    tags: ['javafx', 'layout', 'ui', 'intermediate'],
  },
  {
    id: '5',
    title: 'Git Branch Recovery',
    category: 'Git',
    difficulty: 'advanced',
    statement: `You accidentally deleted a branch called "feature/payment-system" that had important commits. The branch was merged into main last week, but you need to recover the original branch with its commit history. How do you restore it?`,
    hints: [
      'Use git reflog to find the commit hash where the branch was pointing',
      'Look for entries showing checkout or merge operations related to the branch',
      'Once you find the commit, recreate the branch with git branch <name> <commit>',
    ],
    solution: `# Step 1: View the reflog to find the lost commit
git reflog

# Step 2: Look for an entry like:
# "checkout: moving from feature/payment-system to main"
# or a merge commit message

# Step 3: Note the commit hash (e.g., abc1234)

# Step 4: Recreate the branch
git branch feature/payment-system abc1234

# Step 5: Verify the branch exists
git branch -a

# Step 6: Checkout the recovered branch
git checkout feature/payment-system`,
    explanation: `Git's reflog keeps a record of all reference updates, including deleted branches. By examining the reflog, you can find the last commit hash where your branch was pointing. Once identified, you can recreate the branch at that exact commit. This is a powerful recovery mechanism that works even after git gc hasn't run yet (typically 30-90 days). Always check out the recovered branch to verify the content before continuing work.`,
    tags: ['git', 'recovery', 'branches', 'advanced'],
  },
];
