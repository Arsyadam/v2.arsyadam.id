import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const nextDir = path.join(root, ".next");
const buildIdPath = path.join(nextDir, "BUILD_ID");

// Production `next build` leaves BUILD_ID in .next; mixing with `next dev` causes
// _buildManifest.js.tmp ENOENT races on Windows/Turbopack.
if (fs.existsSync(buildIdPath)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
}
