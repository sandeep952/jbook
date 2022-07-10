import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import { INITAL_CODE_EDITOR_CONTENT } from '../constants/initalCodeEditorValue';
import Preview from './Preview/Preview';
import { bundle } from "../bundler/bundler";
import Resizeable from './Resizeable/Resizeable';
function CodeCell() {
    const [code, setCode] = useState("");
    const [inputValue, setInputValue] = useState(INITAL_CODE_EDITOR_CONTENT);
    const [err,setErr] = useState('') 
    
    useEffect(() => {
        const executeCode = async () => {
            const bundlerResponse = await bundle(inputValue)
            setCode(bundlerResponse.code);
            setErr(bundlerResponse.error);
        }
        
        const timer = setTimeout(executeCode,800);
        return ()=>{
            clearTimeout(timer)
        }
    }, [inputValue]);

    return (
        <div className="CodeCell m-1">
            <h1 className='text-white text-center'> Jbook </h1>
            {/* <button className='btn btn-primary m-1' onClick={executeCode}> Run </button> */}
            <Resizeable direction='vertical'>
                <div className='d-flex h-100'>
                    <Resizeable direction='horizontal'>
                        <div className="editor-wrapper">
                            <CodeEditor
                                initValue={inputValue}
                                onUpdate={setInputValue}
                            />
                        </div>
                    </Resizeable>
                    <Preview
                        err={err}
                        code={code}
                    />
                </div>

            </Resizeable>
        </div>
    );
}

export default CodeCell;
