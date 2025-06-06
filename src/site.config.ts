import type { SiteConfig } from "@/types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";

export const siteConfig: SiteConfig = {
  // Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
  author: "Daniel Penedo Lázaro",
  // Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
  title: "Daniel Penedo Lázaro | Full-Stack Developer",
  // Meta property used as the default description meta property
  description: "I'm Daniel Penedo Lázaro, a web developer specializing in building modern websites and applications using Django, React, Astro, and TypeScript. With a passion for Linux, open-source technologies, and efficient programming, I share insights and projects that combine innovation and best practices in web development.",
  // HTML lang property, found in src/layouts/Base.astro L:18
  lang: "en-GB",
  // Meta property, found in src/components/BaseHead.astro L:42
  ogLocale: "en_GB",
  // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
  date: {
    locale: "en-GB",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  },
  webmentions: {
    link: "https://dpenedo.com",
  },
};

// Used to generate links in both the Header & Footer.
export const menuLinks: Array<{ title: string; path: string }> = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About Me",
    path: "/about-me/",
  },
  {
    title: "Blog",
    path: "/posts/",
  },
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
  // One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
  themes: ["github-dark"],
  themeCssSelector(theme, { styleVariants }) {
    // If one dark and one light theme are available
    // generate theme CSS selectors compatible with cactus-theme dark mode switch
    if (styleVariants.length >= 2) {
      const baseTheme = styleVariants[0]?.theme;
      const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
      if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
    }
    // return default selector
    return `[data-theme="${theme.name}"]`;
  },
  useThemedScrollbars: false,
  styleOverrides: {
    frames: {
      frameBoxShadowCssValue: "none",
    },
    uiLineHeight: "inherit",
    codeFontSize: "0.875rem",
    codeLineHeight: "1.7142857rem",
    borderRadius: "4px",
    codePaddingInline: "1rem",
    codeFontFamily:
      'Hack Nerd Font, FiraCode Nerd Font, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
  },
};
