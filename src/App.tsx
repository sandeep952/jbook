import * as esbuild from 'esbuild-wasm'
import { useState,useEffect } from 'react';
import './App.css';
import { unpkgPathPlugin } from './components/plugin';

function App() {
  const [code, setCode] = useState("");
  const [inputValue, setInputValue] = useState("");
  const submitData = async ()=>{
    const transformedCode = await esbuild.build({
      entryPoints:['index.js'],
      bundle:true,
      write:false,
      plugins:[unpkgPathPlugin(inputValue)]  
    });
    const textCode = transformedCode.outputFiles[0].text;
    console.log(transformedCode.outputFiles[0].text)
    setCode(textCode)
  }

  useEffect(()=>{
    startService();
  },[]);

  const startService = async ()=>{
    try{
      await esbuild.initialize({
        wasmURL:'/esbuild.wasm'
      });
      console.log("service", esbuild)
    }
    catch(err){
      console.log("---")
    }
  }
  return (
    <div className="App m-1">
      <h1> Jbook </h1>
      <div>
        <textarea
          value={inputValue}
          cols={30}
          rows={10}
          onChange={(event)=>setInputValue(event?.target.value)}>
        </textarea>
      </div>
      <button className='btn btn-primary m-1' onClick={submitData}> Submit </button>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
