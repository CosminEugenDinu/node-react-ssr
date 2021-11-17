import { readFile } from "fs/promises";
import { parse } from "node-html-parser";
import {getSetting} from "../settings";
import path from "path";
import express, {Request, Response} from "express";



export function startServer() {
  const app = express();
  app.use("/", express.static(path.join(module.path, "../../static/website/public")));
  app.use("/", express.static(getSetting("websiteStaticPath") as string));
  app.get("/", sendMainPage);
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`This App Server listening on port ${port}.`);
  });
}

async function sendMainPage(req: Request, res: Response) {
  const htmlTemplatePath = path.join(
    module.path, 
    "../../static/main.template.html"
    );
  const buffer = await readFile(htmlTemplatePath);
  const document = parse(buffer.toString());
  res.send(document.toString());
}
