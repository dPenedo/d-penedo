---
title: "Check Git Status Across Your Projects with This Bash Script"
description: "This bash script iterates git status on all the repositories and gives an easy reading output"
publishDate: "30 May 2025"
tags:
  - "git"
  - "scripting"
---

# Check Git Status Across All Your Projects with This Bash Script

I usually work across multiple computers for both personal and professional projects, so I keep (almost) everything on GitHub. There, I store not only software projects but also my notes (organized using the Zettelkasten method — more on that in a future post!). I also host various personal files, such as music sheets that I edit with MuseScore. Another key repository is a directory with all my configuration files (`dotfiles`) for tools I use daily — Neovim, tiling window managers, bash, zsh, terminals, and more. I manage these using the legendary GNU tool `stow`.

Keeping all my repositories up-to-date is essential for my daily workflow. If I forget to push changes, I risk running into annoying merge conflicts. That’s why I wrote this bash script to automatically check the status of all my git repositories.

## How it checks the specified directories

I usually keep my projects inside a directory called `repos/`. However, some repositories live elsewhere. For instance, I store my configuration files in `~/.dotfiles`, and when I fork Neovim plugins, I place them in `~/.local/share/nvim/lazy/` — the directory used by Neovim’s lazy.nvim. One such example is my fork of the [kanagawa colorscheme](https://github.com/rebelot/kanagawa.nvim).

That’s why I declare several directory variables at the beginning of the script. The `base_dir` is iterated over, while the others are individual repositories assumed to contain a `.git/` directory.

Here’s how those directories are declared:

```sh
base_dir="/home/daniel/Documentos/repos"
dotfiles="/home/daniel/.dotfiles/"
notas="/home/daniel/Documentos/Notas/"
kanagawa="/home/daniel/.local/share/nvim/lazy/kanagawa.nvim"
```

## Styles

There are a couple of things that I used for making it clean and readable. I have two variables for having **bold** and **normal** fonts using `tput`:

```sh
# Font Styles
bold=$(tput bold)
normal=$(tput sgr0)
```

I also used separators:

```sh
echo "--------------------------------------------------------------------------"
```

And two emojis: ✅ and ⚠️.

## The logic

The script is pretty simple. It includes a function that checks each repository's status and prints a friendly summary:

```sh
check_git_status() {
  local dir="$1"
  local label="$2"

  if ! git -C "$dir" rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    printf "%-40s %-30s\n" "${bold}$label:${normal}" "${bold}❌ That's not a Git repository${normal}"
    return
  fi

  local status=$(git -C "$dir" status)
  local shortstatus=$(git -C "$dir" status --short)

  if [[ $status =~ "nothing to commit, working tree clean" ]]; then
    printf "%-40s %-30s\n" "${bold}$label:${normal}" "${bold}✅ Updated${normal}"
  else
    printf "%-40s %-30s\n" "${bold}$label:${normal}" "${bold}⚠️  Pending changes${normal}"
    echo "$shortstatus"
  fi
}
```

Note: If your system’s default language isn’t English, you’ll need to modify the condition that matches git status output. For example, in Spanish:

```sh
  # Spanish
if [[ $status =~ "nada para hacer commit, el árbol de trabajo está limpio" ]]; then
```

The following loop iterates over all directories inside base_dir:

```sh
# Iteration in the base_dir
for dir in "$base_dir"/*; do
  dir_name=$(basename "$dir")
  if [ -d "$dir" ]; then
    check_git_status "$dir" "$dir_name"
  fi
done
```

Then, the script checks each of the individually declared directories:

```sh
echo "--------------------------------------------------------------------------"

if [ -d "$dotfiles" ]; then
  check_git_status "$dotfiles" "Configuration files"
fi

echo "--------------------------------------------------------------------------"

if [ -d "$notas" ]; then
  check_git_status "$notas" "Notas"
fi

echo "--------------------------------------------------------------------------"

if [ -d "$kanagawa" ]; then
  check_git_status "$kanagawa" "kanagawa"
fi
```

## The complete script

So here is the full script:

```sh
#!/bin/bash

# Defines directories that are going to be used
base_dir="/home/daniel/Documentos/repos"
dotfiles="/home/daniel/.dotfiles/"
notas="/home/daniel/Documentos/Notas/"
kanagawa="/home/daniel/.local/share/nvim/lazy/kanagawa.nvim"

# Font Styles
bold=$(tput bold)
normal=$(tput sgr0)


check_git_status() {
  local dir="$1"
  local label="$2"

  if ! git -C "$dir" rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    printf "%-40s %-30s\n" "${bold}$label:${normal}" "${bold}❌ That's not a Git repository${normal}"
    return
  fi

  local status=$(git -C "$dir" status)
  local shortstatus=$(git -C "$dir" status --short)

  if [[ $status =~ "nothing to commit, working tree clean" ]]; then
    printf "%-40s %-30s\n" "${bold}$label:${normal}" "${bold}✅ Updated${normal}"
  else
    printf "%-40s %-30s\n" "${bold}$label:${normal}" "${bold}⚠️  Pending changes${normal}"
    echo "$shortstatus"
  fi
}


# Iteration in the base_dir
for dir in "$base_dir"/*; do
  dir_name=$(basename "$dir")
  if [ -d "$dir" ]; then
    check_git_status "$dir" "$dir_name"
  fi
done

echo "--------------------------------------------------------------------------"

if [ -d "$dotfiles" ]; then
  check_git_status "$dotfiles" "Configuration files"
fi

echo "--------------------------------------------------------------------------"

if [ -d "$notas" ]; then
  check_git_status "$notas" "Notas"
fi

echo "--------------------------------------------------------------------------"

if [ -d "$kanagawa" ]; then
  check_git_status "$kanagawa" "kanagawa"
fi
```

And this would be the output of it!

```sh
backend-fullstack-open:          ✅ Updated
clothing-store-api-rest:         ✅ Updated
d-penedo:                        ✅ Updated
empleo:                          ✅ Updated
escuela-de-columna:              ✅ Updated
fullstackopen:                   ✅ Updated
generadorDeComprobantes:         ✅ Updated
jolastoki:                       ✅ Updated
lista-tareas-sqlite:             ✅ Updated
matafuegos-mar-del-plata:        ✅ Updated
Mooc-Java:                       ✅ Updated
pomodb:                          ✅ Updated
tutoriales:                      ✅ Updated
--------------------------------------------------------------------------
Configuration files:             ⚠️  Pending changes
 M bin/.local/bin/estatus
 M kitty/.config/kitty/current-theme.conf
--------------------------------------------------------------------------
Notas:                           ⚠️  Pending changes
 M Proyectos/dPenedo-blog/Posts/Template.md
?? Proyectos/dPenedo-blog/Posts/Check-the-status-on-all-your-repositories-by-this-bash-script.md
--------------------------------------------------------------------------
kanagawa:                        ⚠️  Pending changes
 M lua/kanagawa/colors.lua
 M lua/kanagawa/highlights/editor.lua
```
