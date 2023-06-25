import cac from "cac";
import { resolve } from "path";
// import createDevServer from "./dev";
import { build } from "./build";
import { resolveConfig } from "./config";

const cli = cac("island").version("0.0.1").help();

cli.command("dev [root]", "start dev server").action(async (root: string) => {
  console.log("build----", root);
  const createServer = async () => {
    const { createDevServer } = await import("./dev.js");
    const server = await createDevServer(root, async () => {
      await server.close();
      await createServer();
    });
    await server.listen();
    server.printUrls();
  };
  await createServer();
});

cli
  .command("build [root]", "build in production")
  .action(async (root: string) => {
    try {
      root = resolve(root);
      const config = await resolveConfig(root, "build", "production");
      console.log("config=======>", config);
      await build(root, config);
    } catch (e) {
      console.log(e);
    }
  });

cli.parse();
