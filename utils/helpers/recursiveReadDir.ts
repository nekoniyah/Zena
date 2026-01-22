import { readdirSync } from "fs";
import path from "path";

export default function recursiveReadDir(dirPath: string) {
  const entries = readdirSync(dirPath, { withFileTypes: true });
  let files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(recursiveReadDir(fullPath));
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".ts") || entry.name.endsWith(".js"))
    ) {
      files.push(fullPath);
    }
  }
  return files;
}
