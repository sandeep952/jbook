import * as esbuild from "esbuild-wasm";

import { useState, useEffect } from 'react';
import CodeEditor from './components/CodeEditor/CodeEditor';
import { INITAL_CODE_EDITOR_CONTENT } from './constants/initalCodeEditorValue';
import Preview from './components/Preview';
import { bundle } from "./bundler/bundler";
function App() {
  const [code, setCode] = useState("");
  const [inputValue, setInputValue] = useState(INITAL_CODE_EDITOR_CONTENT);

  const submitData = async () => {
    const stringifiedCode = await bundle(inputValue)
    setCode(stringifiedCode)
  }

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
    <div className="App m-1">
      <h1> Jbook </h1>
      <button className='btn btn-primary m-1' onClick={submitData}> Run </button>
      <CodeEditor initValue={inputValue}
        onUpdate={setInputValue} />
      <Preview
        code={code}
      />
    </div>
  );
}

export default App;
