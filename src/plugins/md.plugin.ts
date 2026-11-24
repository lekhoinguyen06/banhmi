import type { BanhMiBlock, BanhMiLock, BanhMiPlugin } from "../type";
import { writer } from "../writers";

export interface MDPluginOptions {
  /** Overrides the bake() outDir for this plugin only. */
  outDir?: string;

  /** Base URL path */
  basePath?: string;
}

function renderIndex({
  basePath,
  lock,
}: {
  basePath: string;
  lock: BanhMiLock;
}) {
  return `<!doctype html>
  <html lang="en">
      <head>
          <meta charset="utf-8" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width" />
          <meta name="generator" content="static HTML" />
          <title>🍞</title>
      </head>
      <body>
          <h1>🍞 bánh mì</h1>${
            Object.entries(lock.domains)
              .map(
                ([name]) =>
                  `<div><a href="${basePath}/${name}">Domain: ${name}</a></div>`,
              )
              .join("\n") +
            Object.entries(lock.views)
              .map(
                ([name]) =>
                  `<div><a href="${basePath}/${name}">View: ${name}</a></div>`,
              )
              .join("\n")
          }</body>
</html>`;
}

function render(kind: "Domain" | "View", name: string, blocks: BanhMiBlock[]) {
  const value = blocks.map((b) => b.content).join("\n");
  return ["---", "title: " + name, "---", `${value}`].join("\n");
}

/**
 * # MD Plugin
 *
 * Generates BanhMi resources in Banh Mi markdown structure.
 */
export const MDPlugin =
  (options: MDPluginOptions = {}): BanhMiPlugin =>
  async ({ props, lock }) => {
    const $domainWrites = Object.entries(lock.domains).map(([name, blocks]) =>
      writer(
        { ...props, outDir: options.outDir ?? props.outDir },
        name + ".md",
        render("Domain", name, blocks),
      ),
    );
    const $viewWrites = Object.entries(lock.views).map(([name, blocks]) =>
      writer(
        { ...props, outDir: options.outDir ?? props.outDir },
        name + ".md",
        render("View", name, blocks),
      ),
    );
    const $indexWrite = writer(
      { ...props, outDir: options.outDir ?? props.outDir },
      "index.html",
      renderIndex({
        basePath: options.basePath ?? "",
        lock,
      }),
    );

    try {
      await Promise.all([...$domainWrites, ...$viewWrites]);
    } catch (e) {
      console.error(e);
    }
  };
