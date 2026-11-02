import fs from "fs";
import path from "path";

interface BanhMiProps {
  srcDir: string;
  outDir?: string;
  prefix?: string;
  extension?: string;
}

interface PageType<D extends string, V extends string> {
  content: string;
  metadata?: BaseMetadata<D, V>;
}

interface BaseMetadata<D extends string, V extends string> {
  domainRefs?: D[];
  viewRefs?: V[];
}

function appendBlockToPage({
  pages,
  currentDomain,
  content,
  metadata,
}: {
  pages: Map<string, PageType>;
  currentDomain?: string;
  content?: string;
  metadata?: BaseMetadata;
}) {
  if (!currentDomain) {
    throw new Error(
      "Current domain is not defined. Please use PAGE at the top of your file module.",
    );
  }

  if (!content) {
    return;
  }

  const existingPage = pages.get(currentDomain);

  if (existingPage) {
    pages.set(currentDomain, {
      content: existingPage.content.concat(content),
      metadata: { ...existingPage.metadata, ...metadata },
    });
  }
}

export function getBanhMi<D extends string, V extends string>({
  srcDir,
  outDir = "./banhmi/generated",
  prefix = "b::",
  extension = ".mi.ts",
}: BanhMiProps) {
  const pages: Map<string, PageType<D, V>> = new Map();
  let currentDomain: D | undefined = undefined;
  return {
    PAGE(domain: D, metadata: BaseMetadata<D, V>) {
      pages.set(domain, { content: "", metadata });
      currentDomain = domain;
    },
    TEXT(text: string, metadata?: BaseMetadata<D, V>) {
      appendBlockToPage({ pages, currentDomain, content: text, metadata });
    },
    CODE(code: string, metadata?: BaseMetadata<D, V> & { language?: string }) {
      const codeContent = `\`\`\`${metadata?.language}\n${code}\n\`\`\``;
      appendBlockToPage({
        pages,
        currentDomain,
        content: codeContent,
        metadata,
      });
    },
    TABLE(
      table: { columns: string[]; rows: string[][] },
      metadata?: BaseMetadata<D, V>,
    ) {
      const tableHeader = `| ${table.columns.join(" | ")} |\n| ${table.columns.map(() => "---").join(" | ")} |\n`;
      const tableRows = table.rows
        .map((row) => `| ${row.join(" | ")} |`)
        .join("\n");
      const tableContent = `${tableHeader}${tableRows}\n`;
      appendBlockToPage({
        pages,
        currentDomain,
        content: tableContent,
        metadata,
      });
    },
    FRONTMATTER(
      frontmatter: Record<string, string>,
      metadata?: BaseMetadata<D, V>,
    ) {
      const fontmatterContent = `---\n${Object.entries(frontmatter)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")}\n---\n`;
      appendBlockToPage({
        pages,
        currentDomain,
        content: fontmatterContent,
        metadata,
      });
    },
    async write() {
      console.log(`Baking...`);
      // Traverse all files with the extension & load the module to inject the content
      async function load(srcDir: string, extension: string) {
        const files = fs
          .readdirSync(srcDir)
          .filter((file) => file.endsWith(extension));
        for (const file of files) {
          const filePath = path.join(srcDir, file);
          await import(filePath);
          console.log(`Loaded: ${filePath}`);
        }
      }

      await load(srcDir, extension);

      // Write the pages keys to the output directory
      for (const [domain, page] of pages.entries()) {
        const outputFileName = `${prefix}${domain}.md`;
        const outputFilePath = path.join(outDir, outputFileName);
        const outputContent = page.content;
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(outputFilePath, outputContent);
        console.log(`Written: ${outputFilePath}`);
      }

      console.log(`Baked! ${pages.size} files written to ${outDir}`);
    },
  };
}
