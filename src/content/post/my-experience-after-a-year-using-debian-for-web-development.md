---
title: "My Experience After a Year Using Debian for Web Development"
description: "Reflecting on a year of using Debian for web development, including its challenges, advantages, and why I'm switching back to Fedora."
publishDate: "11 December 2024"
tags: ["linux", "web development", "Debian", "Fedora"]
---

# My Experience After a Year Using Debian for Web Development

For the past year, I've been using **Debian (stable)** on my computer for web development, and I have some thoughts about it. I've learned a lot and can totally understand why some people absolutely love Debian. However, from now on, I'm going back to **Fedora**.

## My Experience With Other Distros Before

Here's my chronological order of Linux distros:

1. **Ubuntu**
   I used it for a long time, but I wasn’t into development yet. I learned basic Linux commands during this time.

2. **Linux Mint**
   When I started using Linux Mint, I was already doing some web development but at a less advanced level. I used tools like **LibreOffice**, **VS Code**, **PyCharm**, **GIMP**, **Chromium**, and others available in the **Ubuntu repositories**. The experience was smooth since the software was well-maintained and updated.

3. **Fedora**
   Upon switching to Fedora, I transitioned to more terminal-based tools: **NeoVim** as my main editor, **Kitty** as a terminal emulator, **LazyGit**, **tmux**, etc. This was very comfortable because Fedora provides frequent updates, and I enjoyed having updated tools without the potential instability of Arch.

After that, I decided to try **Debian** because it’s the foundation of many distros I've used. I wanted to learn what parts of them originated from Debian.

## Changing From Fedora to Debian

When I switched to Debian, version 12 (Bookworm) had been released a few months earlier, so it wasn’t too outdated. Additionally, this version included support for **non-free firmware**, which made installation easier. I installed the **XFCE** version as a base to experiment with **BSPWM** and **AwesomeWM**, while keeping XFCE as a backup. Debian’s desktop environments are very vanilla, which I found similar to Fedora.

## My General Evaluation of the Experience

### Installation

The installation process is straightforward and not particularly difficult. However, the **Debian website** is unintuitive. While they have a large "Download" button, it’s unclear what exactly you’re downloading—Is it the latest version? Stable version? GNOME version? Although I eventually found the necessary information, this should be clearer on the website.

### Software

Everything worked but required a bit of extra effort. I had to manually compile most of the terminal tools I used. While Debian is a **super-stable distro**, if you want updated tools like **LazyVim** (a NeoVim distribution), you’ll need to build them from source. For example:

- **LazyGit** couldn’t be installed because Debian’s version of **Go** was too old. I had to reinstall Go from source.
- **Picom** (a Xorg compositor) also needed extra configuration.
- I installed **Node** using **NVM** and used **Flatpak** to get updated GUI software like **Obsidian**.

While the process required more effort, Debian’s active community made it easy to find solutions.

### Update Cycle

Debian’s update cycle is very comfortable if you don’t need the latest software. Security updates are provided, ensuring stability after updates. This makes Debian an excellent choice for secondary computers or servers. However, for my main computer, I prefer a more updated system.

### Strictness

Debian is strict with its decisions. For example, you need superuser privileges for some common commands, which can be annoying for web developers. However, I appreciated their handling of Python’s `pip install`.

When you attempt to globally install packages with `pip`, Debian enforces **Python Enhancement Proposal (PEP) 668**, recommending virtual environments or `apt` instead. This taught me to avoid global Python installations, a practice I now follow even on Fedora.

## General Conclusion

Debian is a great distro for general desktop users. Although many developers use it daily, I think it requires unnecessary extra effort to install updated tools. For web development, I found Fedora more suitable due to its up-to-date software and easier workflows.

Debian’s strengths—stability, security, and strict adherence to best practices—make it an excellent choice for servers or secondary machines. However, for my primary setup, I’ll stick with Fedora for its balance of stability and modernity.
