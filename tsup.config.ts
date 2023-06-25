import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/node/cli.ts", "src/node/index.ts", "src/node/dev.ts"],
  bundle: true,
  splitting: true,
  minify: process.env.NODE_ENV === "production",
  outDir: "dist",
  format: ["cjs", "esm"],
  dts: true,
  shims: true, // 开启打包esm时混入node全局变量
  clean: true
});
