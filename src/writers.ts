import { Console, Effect, FileSystem, Path } from "effect";
import type { BanhMiProps } from "./type";

export const writer = Effect.fn(function* (
  props: BanhMiProps,
  filePath: string,
  data: string,
) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const fullPath = path.join(props.outDir, filePath);
  yield* Console.log(`Writing lock file: ${path.join(props.outDir, filePath)}`);
  yield* fs.makeDirectory(path.dirname(fullPath), { recursive: true });
  yield* fs.writeFileString(path.join(props.outDir, filePath), data);
});
