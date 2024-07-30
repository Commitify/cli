import dts from "bun-plugin-dts";
import { $ } from "bun";

// Delete existing build
await $`rm -Rf ./dist`
console.log("🗑️ Removed Artifacts");

// Global
await Bun.build({
  target: "node",
  plugins: [dts()],
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
});
console.log("✅ Global Builded");