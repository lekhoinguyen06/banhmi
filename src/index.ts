import { loader } from "./loaders";
import type {
  BanhMiBlock,
  BanhMiDomain,
  BanhMiInstance,
  BanhMiLock,
  BanhMiProps,
  BanhMiView,
  BlockOptions,
  StringContent,
  TableContent,
} from "./type";
import { writer } from "./writers";

const verifyKey = (key: string, set: Set<string>): string => {
  if (!set.has(key)) {
    throw new Error(`Invalid key: ${key}`);
  }
  return key;
};

const verifyKeys = (keys: readonly string[], set: Set<string>): string[] =>
  keys.map((key) => verifyKey(key, set));

function processBlock({
  block,
  options,
  domainKeys,
  viewKeys,
  blocks,
  domains,
  views,
}: {
  block: BanhMiBlock;
  options: BlockOptions<string, string>;
  domainKeys: Set<string>;
  viewKeys: Set<string>;
  blocks: Map<string, (BanhMiBlock & BlockOptions<string, string>)[]>;
  domains: Map<string, BanhMiDomain>;
  views: Map<string, BanhMiView>;
}) {
  const verifiedDomainKey = verifyKey(options.domain, domainKeys);
  const verifiedViewKeys = verifyKeys(options.views, viewKeys);

  blocks.set(verifiedDomainKey, [
    ...(blocks.get(verifiedDomainKey) ?? []),
    {
      ...block,
      ...options,
    },
  ]);

  domains.set(verifiedDomainKey, [
    ...(domains.get(verifiedDomainKey) ?? []),
    block,
  ]);

  for (const key of verifiedViewKeys) {
    views.set(key, [...(views.get(key) ?? []), block]);
  }
}

export function bake<D extends string, V extends string>(
  props: BanhMiProps,
): BanhMiInstance<D, V> {
  const domainKeys = new Set(props.domains);
  const viewKeys = new Set(props.views);
  const blocks = new Map<
    string,
    (BanhMiBlock & BlockOptions<string, string>)[]
  >();
  const domains = new Map<string, BanhMiDomain>();
  const views = new Map<string, BanhMiView>();

  return {
    TEXT(content: StringContent, options: BlockOptions<D, V>) {
      processBlock({
        block: { type: "text", content },
        options,
        domainKeys,
        viewKeys,
        blocks,
        domains,
        views,
      });
    },
    CODE(content: string, options: BlockOptions<D, V> & { language?: string }) {
      processBlock({
        block: {
          type: "code",
          content: "```" + options.language + "\n" + content + "\n```",
        },
        options,
        domainKeys,
        viewKeys,
        blocks,
        domains,
        views,
      });
    },
    TABLE(content: TableContent, options: BlockOptions<D, V>) {
      processBlock({
        block: { type: "table", content },
        options,
        domainKeys,
        viewKeys,
        blocks,
        domains,
        views,
      });
    },
    async write() {
      const start = performance.now();

      // Run loader to load *.mi.ts files
      await loader(props);

      // Create lock object
      const state: BanhMiLock = {
        project: {
          name: "My Project",
          description: "My Project Description",
        },
        blocks: Array.from(blocks.values()).flat(),
        domains: Object.fromEntries(domains.entries()),
        views: Object.fromEntries(views.entries()),
        artifacts: {
          files: [],
        },
      };

      // Run plugins to perform side effects or transform lock file
      for (const plugin of props.plugins) {
        await plugin({ props, lock: state });
      }

      // Write lock to disk
      await writer(props, "banhmi.lock.json", JSON.stringify(state, null, 2));

      console.log(`🍞 in: ${performance.now() - start}ms`);
    },
  };
}
