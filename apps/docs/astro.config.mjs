// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLlmsTxt from "starlight-llms-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.lightforge.dev",
  integrations: [
    starlight({
      title: "Lightforge Docs",
      description:
        "Documentation for Saathi, AEGIS Platform, API references, and governance.",
      social: { github: "https://github.com/lightforgedev" },
      sidebar: [
        {
          label: "Start here",
          items: [
            { label: "Introduction", slug: "index" },
          ],
        },
        {
          label: "Saathi",
          autogenerate: { directory: "saathi" },
        },
        {
          label: "AEGIS Platform",
          autogenerate: { directory: "platform" },
        },
        {
          label: "API Reference",
          autogenerate: { directory: "api" },
        },
        {
          label: "Governance",
          autogenerate: { directory: "governance" },
        },
      ],
      plugins: [
        starlightLlmsTxt({
          projectName: "Lightforge",
          description:
            "Lightforge.dev — Saathi voice agent and AEGIS agent platform. This site is the canonical documentation surface; agents may consume any page as raw Markdown by appending `.md` to the URL.",
        }),
      ],
      customCss: ["./src/styles/tokens.css"],
    }),
  ],
});
