---
title: "From mini.files and neo-tree to oil.nvim"
description: "Notes from trying nearly every file manager in and around Neovim, and the small oil.nvim tweaks that finally made it stick."
publishDate: "14 Jul 2026"
tags:
  - neovim
  - linux
  - terminal
  - workflow
---


File managers are one of those topics I keep coming back to. Over the last few years I have tried practically every option, both inside Neovim and in the terminal itself. It fascinates me way more than it probably should. So here are my notes on all that trying and switching, and on the small bits of config that finally made [oil.nvim](https://github.com/stevearc/oil.nvim) feel like home.

## Terminal file managers

Standalone terminal file managers are great. [ranger](https://github.com/ranger/ranger) is really powerful. A bit slow to start, but what you can do with it is impressive. [lf](https://github.com/gokcehan/lf) I liked a lot: minimal, fast, very scriptable. It's one of those tools that, after you've tweaked it for a while, ends up feeling like *yours*.

[Yazi](https://github.com/sxyazi/yazi) is a tremendous project. It's like lf with the opposite philosophy: instead of a minimal base you script yourself, it gives you a very functional setup out of the box, the same way [LazyVim](https://www.lazyvim.org/) does for Neovim. It works perfectly, I just never got it to feel as much my own. [vifm](https://vifm.info/) I didn't use that much, it felt a little overwhelming at first, and the same happened to me with [nnn](https://github.com/jarun/nnn).

After all this time my conclusion is that it's good to have one of these around as a reference tool. They're handy when you want to quickly poke around an unfamiliar repository, for example. But I wouldn't bring one into my daily Neovim workflow. Inside the editor they feel foreign, and Neovim already has excellent tools of its own for this.

## File trees: an unfairly demonized tool

I'm not using file trees that much right now, but I think they're fine, and nowhere near as bad for your workflow as parts of the community claim. On Reddit you'll even see people suggesting you replace them with `:!tree`. Come on. A file tree is interactive. For a big repo, crafting a `tree` command that excludes everything irrelevant is a pretty inefficient way to look at a directory structure. And if you've ever worked with monorepos, you know that doing this with `tree` is pure madness.

The ones I know that work perfectly well today:

- [nvim-tree](https://github.com/nvim-tree/nvim-tree.lua): light and comfortable. The project is intentionally frozen (they only fix bugs now) but it more than does its job.
- [neo-tree](https://github.com/nvim-neo-tree/neo-tree.nvim): more feature rich, slightly slower to start. It comes with tree views for git status and open buffers, and you can open it in a float, in the current window, wherever you want. Very good.
- The [snacks.nvim](https://github.com/folke/snacks.nvim) explorer: a very new take, but it already does the job. Really comfortable for searching and for selecting many files at once. For now you can't easily do things like move it around or open it in a float, but it's moving fast.

## mini.files, a tremendous plugin

[mini.files](https://github.com/echasnovski/mini.files) is excellent, extremely fast to operate, I recommend it to everyone. Everything [echasnovski](https://github.com/echasnovski) builds is interesting. He always approaches things from his own angle, and his ideas are easy to steal for your own config. mini.files was never my main file manager for long, but several ideas I now rely on in oil came straight from it. Moving around and previewing files with it is incredibly quick.

If you want to use it long term, though, you'll need to script it a bit. I missed things like a toggle for hidden files or a proper preview setup. None of that is configurable out of the box.

## oil.nvim, my choice for constant use

Oil's approach is the one that finally clicked for me. The idea goes back to Drew Neil's classic [Oil and vinegar - split windows and the project drawer](http://vimcasts.org/blog/2013/01/oil-and-vinegar-split-windows-and-project-drawer/): instead of a project drawer pinned to the side of the screen, you open the *directory itself* as if it were a file. oil.nvim takes that idea all the way. The directory is a regular buffer, so you rename files by editing lines, delete them with `dd`, create them by opening a new line, and then save the buffer to apply everything. Once you've worked this way it's hard to go back.

What I didn't like about oil at first is that I kept losing my sense of the project. Since it opens in the directory of the current file, in a deep tree it's easy to lose track of where you are relative to the project root. mini.files has a shortcut for this, `@`, which jumps to the root of the open project. So I brought the same idea to oil:

```lua
keymaps = {
  ["~"] = "actions.open_cwd",
},
```

This one simple keymap changed the way I work. I open the directory I'm in as a buffer, and from there I can always jump back to the project root in one keystroke.

With the same goal of never losing the reference, I also set up oil's winbar to show where I am relative to the project:

```lua
local detail = false

function _G.get_oil_winbar()
  local bufnr = vim.api.nvim_win_get_buf(vim.g.statusline_winid)
  local dir = require("oil").get_current_dir(bufnr)
  if dir then
    local cwd = vim.fn.getcwd()
    local project_name = vim.fn.fnamemodify(cwd, ":t")
    local rel = vim.fn.fnamemodify(dir, ":.")
    if rel == "." then
      return project_name
    else
      return project_name .. "/" .. rel
    end
  else
    return vim.api.nvim_buf_get_name(0)
  end
end
```

And then I hook it up in the plugin spec (I use [lazy.nvim](https://github.com/folke/lazy.nvim)):

```lua
return {
  "stevearc/oil.nvim",
  dependencies = { "nvim-tree/nvim-web-devicons" },
  opts = {
    win_options = {
      winbar = "%!v:lua.get_oil_winbar()",
    },
  },
}
```

Which gives me this at the top of every oil window:

![Oil winbar showing the current directory relative to the project root](/winbar-oil.png)

So I always have, right above oil, the project name and where I am relative to it. Between the `~` keymap and the winbar, I stopped needing anything else cwd-related.

Finally, for speed and comfort I also have:

```lua
keymaps = {
  ["<C-h>"] = "actions.parent",
  ["<C-l>"] = "actions.select",
},
```

To me this is much faster than the default `-` and `<CR>`, and, just like in mini.files, `h` and `l` stay free for moving around within each file's line.

That's where I've landed, for now at least. If you're in the Neovim file manager rabbit hole yourself, I hope some of these ideas save you a few iterations.
