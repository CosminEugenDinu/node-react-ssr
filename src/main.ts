import { setSetting, getSetting } from "./settings";
import { msgs } from "./logs";
import { renderHtml } from "./website-builder";
import { startServer } from "./service";

async function main(args: string[]) {
  const buildWebsiteFlag = args.indexOf("--build-website");
  const pathFlag = args.indexOf("--path");
  const customPath = args[pathFlag + 1];
  if (buildWebsiteFlag !== -1 && pathFlag !== -1 && customPath)
    setSetting("websiteStaticPath", customPath);
  if (buildWebsiteFlag !== -1) {
    await renderHtml(getSetting("websiteStaticPath") as string);
  }
  if (args.includes("--serve")) startServer();
  console.log(msgs.join("\n"));
}



if (require.main === module) {
  main(process.argv);
}
