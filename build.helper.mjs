//TODO: move to vite

import { execSync } from "child_process";
import fs from "node:fs";

const addCommitToServiceWorker = () => {
  let gitHash = process.env.SOURCE_COMMIT; //TODO: env var not works coolify do not contain .git folder, so https://coolify.io/docs/knowledge-base/environment-variables/
  console.log("SOURCE_COMMIT:", gitHash);
  if (!gitHash) {
    gitHash = execSync("git rev-parse HEAD").toString().trim();
  }
  console.log("gitHash:", gitHash);
  let serviceWorkerData = fs.readFileSync("dist/service-worker.js", "utf8");
  serviceWorkerData = serviceWorkerData.replace("{GIT_VERSION}", gitHash);
  fs.writeFileSync("dist/service-worker.js", serviceWorkerData, "utf8");
};

const addFilesToServiceWorker = () => {
  const viteManifest = JSON.parse(
    fs.readFileSync("dist/.vite/manifest.json", "utf8"),
  );
  let staticCacheUrls = ["/", "index.html", "icon.png"];
  staticCacheUrls.push(viteManifest["index.html"].file);
  staticCacheUrls.push(...viteManifest["index.html"].css);
  staticCacheUrls.push(...viteManifest["index.html"].assets);
  staticCacheUrls = staticCacheUrls.map((elem) => `"${elem}"`);

  let serviceWorkerData = fs.readFileSync("dist/service-worker.js", "utf8");
  serviceWorkerData = serviceWorkerData.replace(
    '"{STATIC_CACHE_URLS}"',
    staticCacheUrls.join(", "),
  );
  fs.writeFileSync("dist/service-worker.js", serviceWorkerData, "utf8");
};

addCommitToServiceWorker();
addFilesToServiceWorker();
