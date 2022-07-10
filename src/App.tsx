import * as esbuild from "esbuild-wasm";
import { useEffect, useState } from 'react';
import CodeCell from "./components/CodeCell";
import './App.css'
function App() {

  const [isEsbuildInitialized,setIsEsbuildInitialized] = useState(false);
  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    try {
      await esbuild.initialize({
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.46/esbuild.wasm'
      });
      setIsEsbuildInitialized(true);
      console.log("service", esbuild)
    }
    catch (err) {
      console.log("---")
    }
  }


  return (
    <div className="mb-2 bg bg-dark">
      {isEsbuildInitialized && <CodeCell />}
    </div>
  );
}

export default App;
