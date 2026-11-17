import type { Effect } from "effect";

export type StringContent = string;
export type TableContent = string[][];

export interface BlockOptions<D extends string, V extends string> {
  domain: D;
  views: V[];
}

interface TextBlock {
  type: "text";
  content: StringContent;
}

interface CodeBlock {
  type: "code";
  content: StringContent;
}

interface TableBlock {
  type: "table";
  content: TableContent;
}

// Primatives
export type BanhMiBlock = TextBlock | CodeBlock | TableBlock;
export type BanhMiDomain = BanhMiBlock[];
export type BanhMiView = BanhMiBlock[];

/**
 * Lock file structure
 */
export interface BanhMiLock {
  project: {
    name: string;
    description: string;
  };
  blocks: (BanhMiBlock & BlockOptions<string, string>)[];
  domains: Record<string, BanhMiDomain>;
  views: Record<string, BanhMiView>;
  artifacts: {
    files: string[];
  };
}

/**
 * Plugin
 */
export type BanhMiPlugin = (props: {
  props: BanhMiProps;
  lock: BanhMiLock;
}) => Effect.Effect<void, never, never>;

export interface BanhMiProps {
  srcDir: string;
  outDir: string;
  domains: readonly string[];
  views: readonly string[];
  plugins: BanhMiPlugin[];
}

export interface BanhMiInstance<D extends string, V extends string> {
  TEXT: (content: StringContent, options: BlockOptions<D, V>) => void;
  CODE: (
    content: StringContent,
    options: BlockOptions<D, V> & { language: string },
  ) => void;
  TABLE: (content: TableContent, options: BlockOptions<D, V>) => void;
  write: () => void;
}
