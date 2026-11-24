import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { BanhMiProps } from "./type";

export const writer = async (
  props: BanhMiProps,
  filePath: string,
  data: string,
): Promise<void> => {
  const fullPath = path.join(props.outDir, filePath);
  console.log(`Writing file: ${fullPath}`);
  await mkdir(path.dirname(fullPath), { recursive: true });
  await writeFile(fullPath, data);
};
