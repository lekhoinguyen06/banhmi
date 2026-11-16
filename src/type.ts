type StringContent = string;
type TableContent = string[][];

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
  domains: BanhMiDomain;
  views: BanhMiView;
  artifacts: {
    files: string[];
  };
}

/**
 * Plugin
 */
type BanhMiPlugin = (props: BanhMiLock) => void;

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
  write: () => void;
}
