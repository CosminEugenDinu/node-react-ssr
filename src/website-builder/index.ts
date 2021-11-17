import path from "path";
import fs from "fs/promises";
import {msgs} from "../logs";

export async function renderHtml(staticPath: string) {
  const staticPathAbs = path.resolve(staticPath);
  const createdDirs = await fs.mkdir(staticPathAbs, { recursive: true })
  if (createdDirs)
    msgs.push(`Created directories ${createdDirs}`);
  const index = require("./html/index.html");
  await index.render(staticPath);
}