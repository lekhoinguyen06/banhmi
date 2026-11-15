import { Effect, FileSystem, Console, Path } from "effect";
import type { BanhMiProps } from "./type";

export const loader = Effect.fn("loader")(function* (props: BanhMiProps) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const files = yield* fs.readDirectory(props.srcDir, { recursive: true });
  for (const file of files.filter((f) => f.endsWith(".mi.ts"))) {
    const content = yield* fs.readFileString(path.join(props.srcDir, file));
    yield* Console.log(content);
  }
});
