import path from "path";
import { msgs } from "../../logs";
import fs from "fs/promises";
import { parse } from "node-html-parser";
import prettier from "prettier";
import React from "react";
import ReactDOMServer from "react-dom/server";


export async function render(staticPath: string) {
  const outputFile = "public_html/out.index.html";
  const renderedHtml = ReactDOMServer.renderToStaticMarkup(<HelloWorldPage />);
  const htmlTemplatePath = path.join(module.path, "../../../static/main.template.html");
  const buffer = await fs.readFile(htmlTemplatePath);
  const document = parse(buffer.toString());
  const mainDiv = document.querySelector("div#main");
  if (mainDiv)
    mainDiv.insertAdjacentHTML("beforeend", renderedHtml)
  else
    throw new Error("Main div not found in template!")
  const prettyHtml = prettier.format(document.toString(), { parser: "html" });
  const outputFileAbs = path.resolve(path.join(staticPath, outputFile));
  const createdDirs = await fs.mkdir(path.dirname(outputFileAbs), { recursive: true })
  if (createdDirs)
    msgs.push(`Created directories ${createdDirs}`);
  await fs.writeFile(outputFileAbs, prettyHtml);
  console.log(`Wrote ${outputFileAbs}`);
}

function HelloWorldPage() {
  return (
    <h1>Hello world</h1>
  );
}