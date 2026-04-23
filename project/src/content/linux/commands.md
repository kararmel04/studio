---
title: 'Linux Basic Commands'
category: 'Linux'
tags: ['cli', 'bash', 'terminal']
---

# Linux Basic Commands Cheat Sheet

A quick reference for some of the most common Linux commands.

## File & Directory Management

| Command | Description |
|---|---|
| `ls` | List files and directories. |
| `cd [dir]` | Change directory. |
| `pwd` | Print working directory. |
| `mkdir [dir]` | Create a new directory. |
| `rm [file]` | Remove a file. |
| `rm -r [dir]`| Remove a directory and its contents. |
| `cp [src] [dest]` | Copy files or directories. |
| `mv [src] [dest]` | Move or rename files or directories. |
| `touch [file]`| Create an empty file or update timestamp. |

## File Content

| Command | Description |
|---|---|
| `cat [file]` | Display file content. |
| `less [file]`| View file content page by page. |
| `head [file]`| Display the first few lines of a file. |
| `tail [file]`| Display the last few lines of a file. |
| `grep [pattern] [file]` | Search for a pattern in a file. |

## System Information

| Command | Description |
|---|---|
| `df -h` | Display disk space usage. |
| `free -h` | Display memory usage. |
| `top` | Display running processes. |
| `uname -a` | Show system and kernel information. |

## Searching

```bash
# Find files by name
find . -name "*.js"

# Find files containing specific text
grep -r "myFunction" ./src
```
