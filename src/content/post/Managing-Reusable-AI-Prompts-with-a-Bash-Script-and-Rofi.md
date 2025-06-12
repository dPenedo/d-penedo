---
title: "Managing Reusable AI Prompts with a Bash Script and Rofi"
description: "Use a bash script and Rofi to quickly select and paste reusable AI prompts stored as Markdown files."
publishDate: "2025-06-11"
tags:
  - rofi
  - linux
  - AI
  - prompt-engineering
  - scripting
---

# Managing Reusable AI Prompts with a Bash Script and Rofi

## Why Use It

Working with Generative Artificial Intelligence (like ChatGPT, Gemini, DeepSeek, or Copilot) requires not just writing the task itself, but also giving proper context, specifying the format, and often including examples or references. This gets repetitive fast.

Although these tools can "learn" from previous conversations, that also means losing some control over how context is handled. Personally, I work as a teacher in very different contexts, and I need to be explicit about _who_ is asking and _how_ the answer should be shaped.

That’s why I created this simple system. I wear different hats throughout the day—programmer, teacher, content creator—and each of them requires a different tone and purpose when writing prompts. For instance:

- As a teacher, I teach AI to professionals,
- I give private saxophone and guitar lessons,
- I help elderly people learn how to use their phones,
- I also teach basic computer literacy to people in prison.

So, when I ask an AI tool for examples or explanations, I have to be very specific about the audience and context. Rewriting the same context over and over became tiring.

While this system could be useful for other things—like storing and reusing helpful references—right now I use it mostly to quickly paste role-specific prompts without repeating myself.

## Why Rofi

[Rofi](https://github.com/davatorium/rofi) is a popular application launcher and window switcher for Linux and macOS. It's a highly scriptable replacement for `dmenu`.

I use Rofi for this task because it can display a list of options and return the one the user selects—perfect for picking a prompt. But you could achieve something similar with other tools too, like a scratchpad terminal running `fzf`.

For example, I also use Rofi as a power menu—each option (shutdown, reboot, etc.) runs a specific script.

## The Script

The script below lists all files in a directory (`$PROMPTS_DIR`) and presents the filenames (without extensions) as selectable options in Rofi. In my case, the files are Markdown (`.md`), but you could use any file format.

When you select a file, the script copies its content to the clipboard. It detects whether you're using X11 or Wayland and uses the appropriate tool (`xclip` or `wl-copy`). On X11, it also uses `xdotool` to simulate `Ctrl+Shift+V` to paste automatically—this can be disabled by commenting that line.

There’s also an Markdown icon added to each entry. It use use other format or if you prefer a minimal look, feel free to remove it.

```bash
#!/bin/bash

PROMPTS_DIR="$HOME/Documentos/Dropbox/Notas/Prompts"
ICON=""

PROMPT_FILE=$(ls "$PROMPTS_DIR" | while read -r file; do
    name="${file%.*}"
    echo -e "$ICON\t$name"  # Format: icon + clean file name
done | rofi -dmenu -p "🤖 Choose a prompt:" -markup-rows)

# Extract the ORIGINAL file name (with extension) to find the file
if [ -n "$PROMPT_FILE" ]; then
    SELECTED_NAME=$(echo "$PROMPT_FILE" | awk -F'\t' '{print $2}')
    ORIGINAL_FILE=$(ls "$PROMPTS_DIR" | grep -F "$SELECTED_NAME." | head -1)  # Find exact match

    if [ -n "$ORIGINAL_FILE" ]; then
        PROMPT_CONTENT=$(cat "$PROMPTS_DIR/$ORIGINAL_FILE")

        # Copy to clipboard depending on X11 or Wayland
        if [ "$XDG_SESSION_TYPE" = "wayland" ]; then
            echo "$PROMPT_CONTENT" | wl-copy
            # notify-send "Prompt copied" "$SELECTED_NAME" -i edit-paste
        else
            echo "$PROMPT_CONTENT" | xclip -selection clipboard
            xdotool key Ctrl+Shift+v
        fi
    fi
fi
```
