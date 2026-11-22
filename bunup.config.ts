import { defineConfig } from "bunup";

export default defineConfig({
  entry: ["src/index.ts", "src/plugins/index.ts"],
  dts: true,
  clean: true,
});
