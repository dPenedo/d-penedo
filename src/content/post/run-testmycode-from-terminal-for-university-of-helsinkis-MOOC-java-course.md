---
title: "Run TestMyCode from Terminal for University of Helsinki Java MOOC course"
description: "Guide on running TestMyCode from the terminal for the University of Helsinki Java MOOC course."
publishDate: "15 Jan 2025"
tags: ["Java", "TestMyCode", "MOOC"]
---

# Run TestMyCode from Terminal for University of Helsinki Java MOOC course

A while ago, I took the [Java course from the University of Helsinki](https://java-programming.mooc.fi/). It's highly recommended, with great explanations, exercises, and a pedagogical approach. However, I faced several issues with the implementation of the TestMyCode service in different IDEs/text editors. I documented the process, so I'll explain the different methods I tried. Next, I'll explain how to install the CLI version. It requires a workaround for Java versions, but it works well in the end. I'll also share some snippets I created to make the process more pleasant.

I tried the following ways:

- [NetBeans](https://github.com/testmycode/tmc-netbeans): It's the method provided by the MOOC, and they have a [step-by-step page](https://www.mooc.fi/en/installation/netbeans/). I followed the instructions, though I had never used NetBeans before. It felt like a retro, Windows 95-like experience. However, it didn't work. I installed the plugin, but when I restarted it, the "TMC settings" didn't work, and I couldn't figure out how to fix the error. Additionally, the process froze four or five times, requiring me to force kill it.
- [IntelliJ IDEA](https://github.com/testmycode/tmc-intellij): This is an IDE I like, but the TMC plugin has been unmaintained since February 2019. I found some comments from people who got it working by installing older versions of the IDE, but I didn't try it myself, and I think it's a pretty annoying method.
- [Visual Studio Code](https://github.com/rage/tmc-vscode): The plugin works and seems maintained. I was able to complete parts 1, 2, and 3 of the Java Programming I course. It has a nice implementation, with indicators of completed parts, shortcuts, and easy setup. I recommend it. However, when I started part 4, I couldn't test my exercises. There were some errors I couldn't resolve, and I found some unresolved issues on GitHub from a couple of years ago. Since VS Code isn't an editor I love, I didn't try further.

Finally, I installed the [CLI client](https://github.com/testmycode/tmc-cli) and it worked flawlessly!

### The CLI client

First, you'll need to have openjdk-11-jdk installed. On Linux Mint, it's just:

```bash
sudo apt install openjdk-11-jdk
```

But for example, for my case, Debian, it's not in the apt repositories, so I had to install it from [the jdk.java's website](https://jdk.java.net/java-se-ri/11-MR2)

The instalation command is already on the tmc-cli github, and worked perfectly. In my case, I installed it on bash, and not on zsh, so I first enterd bash.

```bash
curl -0 https://raw.githubusercontent.com/testmycode/tmc-cli/master/scripts/install.sh | bash
```

Then source .bashrc:

```bash
source ~/.bashrc
```

Then login:

```bash
tmx login
```

And introduce the username (remember that it's the email and password)

### Making it work with Neovim

There is only one problem with it: Java version. It needs JDK 11. In my case, I use Neovim and the plugin called [JDTLS](https://github.com/mfussenegger/nvim-jdtls) that extends the Java language server of Eclipse (it works very very good!), but it needs JDK17 or later. So there was a problem there. I solved it having one in bash and the other on zsh.

So I installed JDK11 and wrote this on my .bashrc:

```bash
export JAVA-HOME=/home/daniel/Descargas/Programas/jdk-11.0.0.1/ # Remember to change the Path! Here its on my Downloads folder because the idea was to don't make it may main Java version, only for the course.
```

And  I already had installed JDK17, so that's what I have on my .zshrc:

```bash
export JAVA-HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

So that way I had different terminal panes or tabs (or in my case tmux windows, it's the same) with different shells. I used bash only for tmc actions.

### Some useful aliases and more

I used some aliases on my `.bashrc` that made it more comfortable.

```bash
alias tt="tmc test && notify-send '✅ Tests Completed!' "
alias tss="tmc submit"
alias te="tmc exercises mooc-java-programming-i"
```

Notice how the `tt` command sends a notification to the system when the tests are done. Which it's pretty usuful to keep reading the course while the tests pass and makes you feel like a real absolute hacker.

Etiquetas: #Java #Blog
