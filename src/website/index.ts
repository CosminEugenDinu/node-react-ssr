import path from "path";
import fs from "fs/promises";
import {msgs} from "../logs";

export async function renderHtml(staticPath: string) {
  const staticPathAbs = path.resolve(staticPath);
  const createdDirs = await fs.mkdir(staticPathAbs, { recursive: true })
  if (createdDirs)
    msgs.push(`Created directories ${createdDirs}`);
  await require("./html/main-page/index.html").render(staticPath);
}