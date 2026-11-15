type StringContent = string;
type TableContent = string[][];

export interface BaseBlock<D extends string, V extends string> {
  domain: D;
  views: V[];
}

interface TextBlock<D extends string, V extends string> extends BaseBlock<
  D,
  V
> {
  type: "text";
  content: StringContent;
}

interface CodeBlock<D extends string, V extends string> extends BaseBlock<
  D,
  V
> {
  type: "code";
  content: StringContent;
}

interface TableBlock<D extends string, V extends string> extends BaseBlock<
  D,
  V
> {
  type: "table";
  content: TableContent;
}

// Primatives
type BanhMiBlock<D extends string, V extends string> =
  TextBlock<D, V> | CodeBlock<D, V> | TableBlock<D, V>;
export type BanhMiDomain = {
  key: string;
  name: string;
  description: string;
  blocks: BanhMiBlock<string, string>[];
};
export type BanhMiView = {
  key: string;
  name: string;
  description: string;
  blocks: BanhMiBlock<string, string>[];
};

/**
 * Lock file structure
 */
export interface BanhMiLock {
  project: {
    name: string;
    description: string;
  };
  blocks: BanhMiBlock<string, string>[];
  domains: BanhMiDomain[];
  views: BanhMiView[];
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
  TEXT: (content: StringContent, options: BaseBlock<D, V>) => void;
  CODE: (
    content: StringContent,
    options: BaseBlock<D, V> & { language: string },
  ) => void;
  write: () => void;
}
