import * as esbuild from "esbuild-wasm";
const BASE_URL = "https://unpkg.com";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /^index\.js$/ }, async (args: any) => {
        const { path } = args;
        return {
          path,
          namespace: "a",
        };
      });

      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        const { path, resolveDir } = args;
        const newPath = new URL(path, `${BASE_URL}${resolveDir}/`).href;

        return {
          path: newPath,
          namespace: "a",
        };
      });

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // if its a absolute path
        return {
          path: `${BASE_URL}/${args.path}`,
          namespace: "a",
        };
      });
    },
  };
};
