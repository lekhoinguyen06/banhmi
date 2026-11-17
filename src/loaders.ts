import { Effect, FileSystem, Console, Path } from "effect";
import type { BanhMiProps } from "./type";

const load = (path: string) => Effect.promise(() => import(path));

export const loader = Effect.fn("loader")(function* (props: BanhMiProps) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const files = yield* fs.readDirectory(props.srcDir, { recursive: true });

  yield* Effect.forEach(
    files.filter((f) => f.endsWith(".mi.ts")),
    (file) =>
      Effect.gen(function* () {
        const entryPath = path.resolve(props.srcDir, file);
        yield* load(entryPath);
        yield* Console.log(`Loaded: ${path.join(props.srcDir, file)}`);
      }),
    { concurrency: "unbounded" },
  );
});
