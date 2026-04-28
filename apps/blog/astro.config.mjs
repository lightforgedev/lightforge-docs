// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
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
        // starlight-blog plugin removed: its prefix:'' support is broken in
        // 0.25 (getStaticPaths returns empty string, the listing renders
        // empty, and its /[...prefix]/[...page] route shadows our custom
        // index.mdx). Replaced with a hand-rolled CardGrid listing in
        // src/content/docs/index.mdx. blogSchema kept in content.config.ts
        // so post frontmatter still validates.
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
                background: "#fafafa",
                primaryColor: "#ffffff",
                primaryTextColor: "#111111",
                primaryBorderColor: "#d4d4d4",
                secondaryColor: "#f5f5f5",
                tertiaryColor: "#fafafa",
                lineColor: "#6b7280",
                textColor: "#111111",
                mainBkg: "#ffffff",
                edgeLabelBackground: "#fafafa",
                clusterBkg: "#f5f5f5",
                clusterBorder: "#d4d4d4",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "14px",
              },
              flowchart: { curve: "linear", padding: 16, useMaxWidth: true },
            });
            const extractCode = (pre) => {
              // expressive-code wraps each source line in <div class="ec-line">.
              // textContent on the parent collapses newlines, so the mermaid
              // parser sees the whole diagram on one line and chokes on
              // tokens like 'subgraph'. Iterate ec-line elements and rejoin
              // with real newlines; fall back to textContent if the wrapper
              // shape changes in a future Starlight version.
              const lines = pre.querySelectorAll(".ec-line .code");
              if (lines.length > 0) {
                return Array.from(lines).map((l) => l.textContent).join("\\n");
              }
              const code = pre.querySelector("code");
              return code ? code.textContent : pre.textContent;
            };
            const render = async () => {
              const blocks = document.querySelectorAll('pre[data-language="mermaid"]');
              for (let i = 0; i < blocks.length; i++) {
                const pre = blocks[i];
                const source = extractCode(pre);
                const id = "mmd-" + i;
                try {
                  const { svg } = await mermaid.render(id, source);
                  const wrapper = document.createElement("figure");
                  wrapper.className = "mermaid-figure";
                  wrapper.innerHTML = svg;
                  const target = pre.closest("figure.frame, .expressive-code") || pre;
                  target.replaceWith(wrapper);
                } catch (err) {
                  console.error("mermaid render failed", err, "source:", source);
                  pre.classList.add("mermaid-failed");
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
