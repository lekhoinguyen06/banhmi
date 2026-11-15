import type { BanhMiInstance, BanhMiProps, BaseBlock } from "./type";
import { Effect } from "effect";

export function bake<D extends string, V extends string>(
  props: BanhMiProps,
): BanhMiInstance<D, V> {
  return {
    TEXT(content: string, options: BaseBlock<D, V>) {},
    CODE(content: string, options: BaseBlock<D, V>) {},
    write() {
      Effect.runSync(
        Effect.gen(function* () {
          // Run loader to load *.mi.ts files

          // Create lock file structure

          // Run plugins to perform side effects base on the lock file

          // Write lock file to disk
        }),
      );
    },
  };
}
