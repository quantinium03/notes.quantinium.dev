import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
    configuration: {
        pageTitle: "Quantinium",
        pageTitleSuffix: "",
        enableSPA: true,
        enablePopovers: true,
        analytics: {
            provider: "plausible",
        },
        locale: "en-US",
        baseUrl: "notes.quantinium.dev",
        ignorePatterns: ["private", "templates", ".obsidian"],
        defaultDateType: "created",
        generateSocialImages: false,
        theme: {
            fontOrigin: "googleFonts",
            cdnCaching: true,
            typography: {
                header: "Schibsted Grotesk",
                body: "IBM Plex Mono",
                code: "IBM Plex Mono",
            },
            /* colors: {
              lightMode: {
                light: "#faf8f8",
                lightgray: "#e5e5e5",
                gray: "#b8b8b8",
                darkgray: "#4e4e4e",
                dark: "#2b2b2b",
                secondary: "#284b63",
                tertiary: "#84a59d",
                highlight: "rgba(143, 159, 169, 0.15)",
                textHighlight: "#fff23688",
              },
              darkMode: {
                light: "#161618",
                lightgray: "#393639",
                gray: "#646464",
                darkgray: "#d4d4d4",
                dark: "#ebebec",
                secondary: "#7b97aa",
                tertiary: "#84a59d",
                highlight: "rgba(143, 159, 169, 0.15)",
                textHighlight: "#b3aa0288",
              },
            }, */

            colors: {
                lightMode: {
                    light: "#fbf1c7",
                    lightgray: "#ebdbb2",
                    gray: "#928374",
                    darkgray: "#7c6f64",
                    dark: "#3c3836",
                    secondary: "#b57614",
                    tertiary: "#79740e",
                    highlight: "rgba(d65d0e, 0.15)",
                    textHighlight: "#fabd2f33",
                },
                darkMode: {
                    light: "#282828",         // Gruvbox dark background
                    lightgray: "#3c3836",     // Gruvbox dark0_soft
                    gray: "#928374",          // Lightened gray
                    darkgray: "#a89984",      // Lightened darkgray
                    dark: "#fbf1c7",          // Gruvbox lightest (even lighter text)
                    secondary: "#fabd2f",     // Brighter yellow
                    tertiary: "#b8bb26",      // Brighter green
                    highlight: "rgba(fe8019, 0.15)",  // Gruvbox bright orange
                    textHighlight: "#fabd2f33",       // Gruvbox bright yellow
                },
            },
        },
    },
    plugins: {
        transformers: [
            Plugin.FrontMatter(),
            Plugin.CreatedModifiedDate({
                priority: ["frontmatter", "filesystem"],
            }),
            Plugin.SyntaxHighlighting({
                theme: {
                    light: "github-light",
                    dark: "github-dark",
                },
                keepBackground: false,
            }),
            Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
            Plugin.GitHubFlavoredMarkdown(),
            Plugin.TableOfContents(),
            Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
            Plugin.Description(),
            Plugin.Latex({ renderEngine: "katex" }),
        ],
        filters: [Plugin.RemoveDrafts()],
        emitters: [
            Plugin.AliasRedirects(),
            Plugin.ComponentResources(),
            Plugin.ContentPage(),
            Plugin.FolderPage(),
            Plugin.TagPage(),
            Plugin.ContentIndex({
                enableSiteMap: true,
                enableRSS: true,
            }),
            Plugin.Assets(),
            Plugin.Static(),
            Plugin.NotFoundPage(),
        ],
    },
}

export default config
