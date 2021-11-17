import path from "path";
import { msgs } from "./logs";

type Settings = {
  allowPathOutsideProject: boolean;
  websiteStaticPath: string;
  projectRootDir: string;
}


const settings: Settings = {
  allowPathOutsideProject: false,
  websiteStaticPath: "./html",
  projectRootDir: path.resolve(module.path, "../"),
};

export function getSetting(key: keyof Settings ) {
  return settings[key];
}
export function setSetting(key: string, value: any) {
  if (key === "websiteStaticPath")
    if (!settings.allowPathOutsideProject) 
      if (path.join(settings.projectRootDir, value).indexOf(settings.projectRootDir) === 0)
        settings.websiteStaticPath = path.join(value, settings.websiteStaticPath);
      else msgs.push(`Output path: ${value} not allowed outside project`);
    else settings[key] = value;
}
