import * as esbuild from 'esbuild-wasm'
import { useState,useEffect } from 'react';
import './App.css';
import { unpkgPathPlugin } from './components/plugin';

function App() {
  const [code, setCode] = useState("123");
  const [inputValue, setInputValue] = useState("");
  const submitData = async ()=>{
    const transformedCode = await esbuild.build({
      entryPoints:['index.js'],
      bundle:true,
      write:false,
      plugins:[unpkgPathPlugin()]  
    });
    console.log(transformedCode)

  }

  useEffect(()=>{
    startService();
  },[]);

  const startService = async ()=>{
    await esbuild.initialize({
      wasmURL:'/esbuild.wasm'
    });
    console.log("service", esbuild)
  }
  return (
    <div className="App m-1">
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
