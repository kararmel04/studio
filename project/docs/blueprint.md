# **App Name**: DevFlow Wiki

## Core Features:

- Markdown Content Management & Indexing: Scan user-defined local directories for Markdown files, extract titles, tags (from front matter or headers), and categories to build a searchable, dynamic index. This acts as the foundation for the personal technical knowledge base.
- Dynamic Navigation & Search: Provide a navigable table of contents based on indexed content and a powerful search engine capable of full-text queries and filtering by tags or categories to quickly locate relevant information.
- Modern UI with Split-View Editor: Offer a clean, responsive user interface with a side-by-side view for editing Markdown files and a live preview of the rendered content, including support for diagrams and code blocks.
- Error Analysis Tool: Allow users to paste stack traces or error messages into the tool. The app will analyze the input, identify the error type and relevant technologies, and suggest potential causes and links to existing wiki pages for solutions.
- Smart Code Snippet Library: Enable users to store, organize with tags, and easily copy reusable code snippets (e.g., JavaFX, Gradle, Linux commands) directly from the application for quick reference.
- Tag and Category Management: Provide a simple interface for users to create, edit, and assign custom tags and categories to their wiki pages and snippets, improving organization and discoverability.
- Local File System Integration (Tauri/Rust): Leverage Tauri's Rust backend to manage local Markdown files and store application data, ensuring direct file system access and offline functionality for the personal wiki.
- Knowledge Packs: Groups of several pages, courses, focusing on one particular subject, allowing user to dive deeply into knowledge.

## Style Guidelines:

- Scheme: Dark. Primary color: A vibrant blue (#3C3CDD) to represent precision and technology. Background color: A very dark, subtle blue-grey (#14141F) for focused work. Accent color: A soft violet (#B37DE8) for interactive elements and highlights, providing clear contrast.
- Headline and Body font: 'Inter' (sans-serif) for its modern, neutral, and highly readable characteristics, suitable for extensive documentation. Code font: 'Source Code Pro' (monospace sans-serif) for clear and distinct display of code snippets and stack traces.
- Utilize a consistent set of crisp, line-based icons relevant to development, documentation, and learning, conveying a professional and contemporary feel without distraction.
- Implement a clean, modular layout prioritizing content readability and easy navigation. Key elements include a dynamic sidebar for index and categories, a central content area, and a split-view mode for editing and previewing Markdown content.
- Incorporate subtle, performant animations for state changes, component transitions, and loading indicators, ensuring a smooth and responsive user experience without causing visual clutter.