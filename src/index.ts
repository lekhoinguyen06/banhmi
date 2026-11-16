import { loader } from "./loader";
import type {
  BanhMiBlock,
  BanhMiDomain,
  BanhMiInstance,
  BanhMiLock,
  BanhMiProps,
  BanhMiView,
  BlockOptions,
} from "./type";
import { Effect, Console } from "effect";
import { NodeFileSystem, NodePath } from "@effect/platform-node";

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
    TEXT(content: string, options: BlockOptions<D, V>) {
      Effect.runSync(
        Effect.gen(function* () {
          const verifiedDomainKey = yield* verifyKey(
            options.domain,
            domainKeys,
          );
          const verifiedViewKeys = yield* verifyKeys(options.views, viewKeys);

          blocks.set(verifiedDomainKey, [
            ...(blocks.get(verifiedDomainKey) ?? []),
            {
              type: "text",
              content,
              domain: verifiedDomainKey,
              views: verifiedViewKeys,
            },
          ]);

          domains.set(verifiedDomainKey, [
            ...(domains.get(verifiedDomainKey) ?? []),
            {
              type: "text",
              content,
            },
          ]);

          yield* Effect.forEach(
            verifiedViewKeys,
            (key) =>
              Effect.sync(() => {
                views.set(key, [
                  ...(views.get(key) ?? []),
                  {
                    type: "text",
                    content,
                  },
                ]);
              }),
            { concurrency: "unbounded" },
          );
        }),
      );
    },
    CODE(content: string, options: BlockOptions<D, V>) {},
    write() {
      Effect.runPromise(
        Effect.gen(function* () {
          // Run loader to load *.mi.ts files
          yield* loader(props).pipe(
            Effect.provide(NodeFileSystem.layer),
            Effect.provide(NodePath.layer),
          );
          // Create lock file structure
          const lockFile: BanhMiLock = {
            project: {
              name: "My Project",
              description: "My Project Description",
            },
            blocks: Array.from(blocks.values()).flat(),
            domains: Array.from(domains.values()).flat(),
            views: Array.from(views.values()).flat(),
            artifacts: {
              files: [],
            },
          };

          yield* Console.log(
            "Lock file structure:",
            JSON.stringify(lockFile, null, 2),
          );

          // Run plugins to perform side effects or transform lock file

          // Write lock file to disk
        }),
      );
    },
  };
}
