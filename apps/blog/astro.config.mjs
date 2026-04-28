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
          // prefix: '' so post URLs are /<slug>/ at the route level. With
          // Astro base: '/blog', that becomes /blog/<slug>/ in the public
          // URL — clean, no doubling.
          prefix: "",
          authors: {
            forge: {
              name: "Forge",
              title: "Engineering",
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
