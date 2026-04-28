// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightBlog from "starlight-blog";
import starlightLlmsTxt from "starlight-llms-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://lightforge.dev",
  base: "/blog",
  integrations: [
    starlight({
      title: "Lightforge Blog",
      description:
        "Engineering, product, and research writing from the Lightforge team.",
      plugins: [
        starlightBlog({
          title: "Blog",
          // Default prefix='blog'. URLs are doubled (/blog/blog/<slug>/)
          // because Astro base='/blog' is also applied. Acceptable for v1;
          // tracked in a follow-up bead to upgrade starlight-blog and
          // resolve cleanly with prefix=''.
          authors: {
            forge: {
              name: "Forge",
              title: "Elixir Architect",
              picture: "/blog/authors/forge.png",
            },
          },
        }),
        starlightLlmsTxt({
          projectName: "Lightforge Blog",
          description:
            "Lightforge.dev blog — engineering, product, and research posts. Append `.md` to any post URL for raw Markdown.",
        }),
      ],
      customCss: ["./src/styles/tokens.css"],
    }),
  ],
});
