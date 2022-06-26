import * as esbuild from "esbuild-wasm";
import axios from "axios";
export const unpkgPathPlugin = (entryPointCode:string) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);
        const BASE_URL = "https://unpkg.com";
        const { path,resolveDir } = args;

        if (path === "index.js") {
          return {
            path,
            namespace: "a",
          };
        }
        // if its a relative path
        if (path.includes("./") || path.includes("../")) {
          const newPath = new URL(path, `${BASE_URL}${resolveDir}/`).href;

          return {
            path: newPath,
            namespace: "a",
          };
        }
        // if its a absolute path
        return {
          path: `${BASE_URL}/${args.path}`,
          namespace: "a",
        };
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: entryPointCode
          };
        }

        const { data, request } = await axios.get(args.path);
        
        return {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
      });
    },
  };
};
