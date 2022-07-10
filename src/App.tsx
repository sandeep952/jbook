import * as esbuild from "esbuild-wasm";
import { useEffect } from 'react';
import CodeCell from "./components/CodeCell";
import './App.css'
function App() {

  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    try {
      await esbuild.initialize({
        wasmURL: '/esbuild.wasm'
      });
      console.log("service", esbuild)
    }
    catch (err) {
      console.log("---")
    }
  }


  return (
    <div className="mb-2 bg bg-dark">
      <CodeCell />
    </div>
  );
}

export default App;
