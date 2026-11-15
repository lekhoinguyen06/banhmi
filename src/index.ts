import { loader } from "./loader";
import type {
  BanhMiDomain,
  BanhMiInstance,
  BanhMiProps,
  BanhMiView,
  BaseBlock,
} from "./type";
import { Effect } from "effect";
import { NodeFileSystem, NodePath } from "@effect/platform-node";

export function bake<D extends string, V extends string>(
  props: BanhMiProps,
): BanhMiInstance<D, V> {
  const domainKeys = new Set(props.domains);
  const viewKeys = new Set(props.views);
  const domains = new Map<string, BanhMiDomain>();
  const views = new Map<string, BanhMiView>();

  return {
    TEXT(content: string, options: BaseBlock<D, V>) {},
    CODE(content: string, options: BaseBlock<D, V>) {},
    write() {
      Effect.runPromise(
        Effect.gen(function* () {
          // Run loader to load *.mi.ts files
          yield* loader(props).pipe(
            Effect.provide(NodeFileSystem.layer),
            Effect.provide(NodePath.layer),
          );
          // Create lock file structure

          // Run plugins to perform side effects base on the lock file

          // Write lock file to disk
        }),
      );
    },
  };
}
