import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react';
import { fetchModulePlugin } from './components/plugins/fetchModulePlugin';
import { unpkgPathPlugin } from './components/plugins/unpkg-path-plugin';

function App() {
  const [inputValue, setInputValue] = useState("");
  const iframeRef = useRef<any>();
  const submitData = async () => {
    iframeRef.current.srcdoc = initalIframeHTML
    const transformedCode = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchModulePlugin(inputValue)]
    });
    const stringifiedCode = transformedCode.outputFiles[0].text;
    iframeRef.current.contentWindow.postMessage(stringifiedCode, '*')
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

  const initalIframeHTML = `
  <div id="root"></div>
  <script>
    window.addEventListener('message',(event)=>{
      try{
        eval(event.data)
      }
      catch(err){
        const errorElement = document.querySelector('#root');
        errorElement.innerHTML = '<div style="color:red"  > <h2>Runtime error:</h2>' + err  + '</div>'
        console.error(err);
      }
    },false)
  </script>
  `

  return (
    <div className="App m-1">
      <h1> Jbook </h1>
      <div>
        <div>
          <textarea
            value={inputValue}
            cols={50}
            rows={10}
            onChange={(event) => setInputValue(event?.target.value)}>
          </textarea>
        </div>
        <button className='btn btn-primary m-1' onClick={submitData}> Submit </button>
      </div>
      <iframe ref={iframeRef} srcDoc={initalIframeHTML} title='executionFrame' sandbox='allow-scripts' />
    </div>
  );
}

export default App;
