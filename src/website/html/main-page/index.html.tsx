import path from "path";
import { msgs } from "../../../logs";
import fs from "fs/promises";
import { parse } from "node-html-parser";
import prettier from "prettier";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Header } from "../common/header.html";

export async function render(staticPath: string) {
  const outputFile = "out.index.html";
  const renderedHtml = ReactDOMServer.renderToStaticMarkup(<MainPage />);
  console.log(renderedHtml)
  const htmlTemplatePath = path.join(module.path, "../../../../static/website/main.template.html");
  const buffer = await fs.readFile(htmlTemplatePath);
  const document = parse(buffer.toString());
  const rootDiv = document.querySelector("div#root");
  if (rootDiv)
    rootDiv.insertAdjacentHTML("beforeend", renderedHtml)
  else
    throw new Error("Main div not found in template")
  const prettyHtml = prettier.format(document.toString(), { parser: "html" });
  const outputFileAbs = path.resolve(path.join(staticPath, outputFile));
  const createdDirs = await fs.mkdir(path.dirname(outputFileAbs), { recursive: true })
  if (createdDirs)
    msgs.push(`Created directories ${createdDirs}`);
  await fs.writeFile(outputFileAbs, prettyHtml);
  msgs.push(`Wrote ${outputFileAbs}`);
}


function MainPage() {
  const contact = {
    email: "ema@il.com",
    tel: "+4007000888"
  }
  return (
    <div>
      <Header contact={contact}></Header>
      <h1>Hello world</h1>
    </div>
  );
}
