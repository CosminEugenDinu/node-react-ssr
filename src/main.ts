import { setSetting, getSetting } from "./settings";
import { msgs } from "./logs";
import { renderHtml } from "./website";
import { startServer } from "./service";

async function main(args: string[]) {
  const buildHtmlFlag = args.indexOf("--build-html");
  const pathFlag = args.indexOf("--path");
  const customPath = args[pathFlag + 1];
  if (buildHtmlFlag !== -1 && pathFlag !== -1 && customPath)
    setSetting("websiteStaticPath", customPath);
  if (buildHtmlFlag !== -1) {
    await renderHtml(getSetting("websiteStaticPath") as string);
  }
  if (args.includes("--serve")) startServer();
  console.log(msgs.join("\n"));
}

if (require.main === module) {
  main(process.argv);
}
