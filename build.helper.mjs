import {execSync} from "child_process";
import fs from "node:fs";

//TODO: move to vite
const addCommitToServiceWorker = () => {
    const gitHash = execSync("git rev-parse HEAD").toString().trim();
    let serviceWorkerData = fs.readFileSync("dist/service-worker.js", "utf8");
    serviceWorkerData = serviceWorkerData.replace("{GIT_VERSION}", gitHash);
    fs.writeFileSync("dist/service-worker.js", serviceWorkerData, "utf8");
}

const addFilesToServiceWorker = () => {
    const viteManifest = JSON.parse(fs.readFileSync("dist/.vite/manifest.json", "utf8"));
    let staticCacheUrls = ["/", "index.html", "favicon.svg"];
    staticCacheUrls.push(viteManifest["index.html"].file);
    staticCacheUrls.push(...viteManifest["index.html"].css);
    staticCacheUrls = staticCacheUrls.map(elem => `"${elem}"`);
    let serviceWorkerData = fs.readFileSync("dist/service-worker.js", "utf8");
    serviceWorkerData = serviceWorkerData.replace("\"{STATIC_CACHE_URLS}\"", staticCacheUrls.join(", "));
    fs.writeFileSync("dist/service-worker.js", serviceWorkerData, "utf8");
}

addCommitToServiceWorker();
addFilesToServiceWorker();