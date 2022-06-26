import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

export const fetchModulePlugin = (entryPointCode: string) => {
  return {
    name: "fetchModulePlugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /^index\.js$/ }, async (args: any) => {
        return {
          loader: "jsx",
          contents: entryPointCode,
        };
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        let escapedData = data
          .replace(/\n/g, "")
          .replace(/"/, '\\"')
          .replace(/'/, "\\'");
        const onLoadResult: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: `
          let styleElement = document.createElement('style');
          styleElement.innerText = '${escapedData}'
          document.head.appendChild(styleElement);
          `,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        localforage.setItem(args.path, onLoadResult);
        return onLoadResult;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // check in IndexedDB
        const cachedData = await localforage.getItem<esbuild.OnLoadResult>(
          args.path
        );
        cachedData && console.log(`FOUND ${args.path} in cache`);
        return cachedData ? cachedData : null;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const onLoadResult: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        localforage.setItem(args.path, onLoadResult);
        return onLoadResult;
      });
    },
  };
};
