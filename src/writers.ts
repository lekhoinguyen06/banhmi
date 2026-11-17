import { Console, Effect, FileSystem, Path } from "effect";
import type { BanhMiProps } from "./type";

export const writer = Effect.fn(function* (
  props: BanhMiProps,
  filePath: string,
  data: string,
) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  yield* Console.log(`Writing lock file: ${path.join(props.outDir, filePath)}`);
  yield* fs.writeFileString(path.join(props.outDir, filePath), data);
});
