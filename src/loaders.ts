import { readdir } from "node:fs/promises";
import path from "node:path";
import type { BanhMiProps } from "./type";

export const loader = async (props: BanhMiProps): Promise<void> => {
  const files = await readdir(props.srcDir, { recursive: true });

  for (const file of files.filter((f) => f.endsWith(".mi.ts"))) {
    const entryPath = path.resolve(props.srcDir, file);
    await import(entryPath);
    console.log(`Loaded: ${path.join(props.srcDir, file)}`);
  }
};
