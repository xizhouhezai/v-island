import { join } from "path";

export const PACKAGE_ROOT = join(__dirname, "..");

export const SERVER_ENTRY_PATH = join(
  PACKAGE_ROOT,
  "src",
  "runtime",
  "ssr-entry.ts"
);

export const CLIENT_ENTRY_PATH = join(
  PACKAGE_ROOT,
  "src",
  "runtime",
  "client-entry.ts"
);

export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, "template.html");
