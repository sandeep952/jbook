import * as esbuild from "esbuild-wasm";
import { fetchModulePlugin } from "./plugins/fetchModulePlugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

export const bundle = async (inputCode: string) => {
  const transformedCode = await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchModulePlugin(inputCode)],
    define: {
      global: "window",
    },
  });
  const stringifiedCode = transformedCode.outputFiles[0].text;

  return stringifiedCode;
};
