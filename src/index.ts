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
import { Effect, Console, Duration } from "effect";
import { NodeFileSystem, NodePath } from "@effect/platform-node";
import { writer } from "./writers";

const verifyKey = (key: string, set: Set<string>) =>
  Effect.try({
    try: () => {
      if (!set.has(key)) {
        throw new Error(`Invalid key: ${key}`);
      }
      return key;
    },
    catch: (error) => {
      Console.error(error);
    },
  });

const verifyKeys = (keys: ReadonlyArray<string>, set: Set<string>) =>
  Effect.forEach(keys, (key) => verifyKey(key, set), {
    concurrency: "unbounded",
  });

const processBlock = Effect.fn(function* ({
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
  const verifiedDomainKey = yield* verifyKey(options.domain, domainKeys);
  const verifiedViewKeys = yield* verifyKeys(options.views, viewKeys);

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

  yield* Effect.forEach(
    verifiedViewKeys,
    (key) =>
      Effect.sync(() => {
        views.set(key, [...(views.get(key) ?? []), block]);
      }),
    { concurrency: "unbounded" },
  );
});

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
      Effect.runSync(
        processBlock({
          block: { type: "text", content },
          options,
          domainKeys,
          viewKeys,
          blocks,
          domains,
          views,
        }),
      );
    },
    CODE(content: string, options: BlockOptions<D, V>) {
      Effect.runSync(
        processBlock({
          block: { type: "code", content },
          options,
          domainKeys,
          viewKeys,
          blocks,
          domains,
          views,
        }),
      );
    },
    TABLE(content: TableContent, options: BlockOptions<D, V>) {
      Effect.runSync(
        processBlock({
          block: { type: "table", content },
          options,
          domainKeys,
          viewKeys,
          blocks,
          domains,
          views,
        }),
      );
    },
    write() {
      Effect.runPromise(
        Effect.gen(function* () {
          const [elapsed, _] = yield* Effect.timed(
            Effect.gen(function* () {
              // Run loader to load *.mi.ts files
              yield* loader(props);
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
              yield* Effect.forEach(props.plugins, (plugin) =>
                plugin({ props, lock: state }),
              );

              // Write lock to disk
              yield* writer(
                props,
                "banhmi.lock.json",
                JSON.stringify(state, null, 2),
              );
            }),
          );
          yield* Console.log(`🍞 in: ${Duration.toMillis(elapsed)}ms`);
        }).pipe(
          Effect.provide(NodeFileSystem.layer),
          Effect.provide(NodePath.layer),
        ),
      );
    },
  };
}
