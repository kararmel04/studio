---
title: 'Getting Started with DevFlow Wiki'
category: 'Guides'
tags: ['guide', 'setup']
---

# Welcome to DevFlow Wiki

DevFlow Wiki is your personal command center for technical knowledge. Here's how to get started and make the most of it.

## How It Works

This application scans a local `src/content` directory for Markdown (`.md`) files. It then uses the file structure and frontmatter to build the navigation and make your content searchable.

### 1. Adding Content

To add new pages to your wiki, simply create new `.md` files inside `src/content`.

You can organize your content by creating subdirectories. These directory names will be used as **categories** in the sidebar.

For example, the file at `src/content/react/components.md` will appear under the "react" category.

### 2. Using Frontmatter

For better organization, you can add YAML frontmatter to the top of your Markdown files.

```yaml
---
title: 'My Awesome React Component'
category: 'React'
tags: ['react', 'components', 'frontend']
---
```

-   **title**: The display title of the page. If omitted, the filename is used.
-   **category**: Overrides the category determined by the folder structure.
-   **tags**: A list of tags for filtering and searching.

### 3. Writing Content

You can use standard GitHub Flavored Markdown (GFM). This includes:

-   Headings, lists, bold, italics, etc.
-   Tables
-   Code blocks with syntax highlighting

````markdown
```javascript
function hello() {
  console.log("Hello, World!");
}
```
````

Enjoy building your personal knowledge base!
