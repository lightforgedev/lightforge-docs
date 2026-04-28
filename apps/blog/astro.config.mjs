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
      // Render fenced ```mermaid blocks as SVG client-side. Themed to
      // LightForge tokens (off-white canvas, black ink, coral accent).
      // Build-time render via rehype-mermaid is heavier (playwright dep);
      // we accept a small FOUC for the deps tradeoff.
      head: [
        {
          tag: "script",
          attrs: { type: "module" },
          content: `
            import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
            mermaid.initialize({
              startOnLoad: false,
              theme: "base",
              themeVariables: {
                background: "#F7F7F5",
                primaryColor: "#FFFFFF",
                primaryTextColor: "#111111",
                primaryBorderColor: "#D8D3CA",
                secondaryColor: "#ECE9E3",
                tertiaryColor: "#F7F7F5",
                lineColor: "#606060",
                textColor: "#111111",
                mainBkg: "#FFFFFF",
                edgeLabelBackground: "#F7F7F5",
                clusterBkg: "#ECE9E3",
                clusterBorder: "#D8D3CA",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "14px",
              },
              flowchart: { curve: "linear", padding: 16, useMaxWidth: true },
            });
            const render = async () => {
              const blocks = document.querySelectorAll('pre[data-language="mermaid"]');
              for (let i = 0; i < blocks.length; i++) {
                const pre = blocks[i];
                const code = (pre.querySelector("code") || pre).textContent;
                const id = "mmd-" + i;
                try {
                  const { svg } = await mermaid.render(id, code);
                  const wrapper = document.createElement("figure");
                  wrapper.className = "mermaid-figure";
                  wrapper.innerHTML = svg;
                  const target = pre.closest("figure.frame, .expressive-code") || pre;
                  target.replaceWith(wrapper);
                } catch (err) {
                  console.error("mermaid render failed", err);
                }
              }
            };
            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", render);
            } else {
              render();
            }
          `,
        },
      ],
    }),
  ],
});
