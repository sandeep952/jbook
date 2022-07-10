import { useState } from 'react';
import CodeEditor from './CodeEditor';
import { INITAL_CODE_EDITOR_CONTENT } from '../constants/initalCodeEditorValue';
import Preview from './Preview';
import { bundle } from "../bundler/bundler";
import Resizeable from './Resizeable';
function CodeCell() {
    const [code, setCode] = useState("");
    const [inputValue, setInputValue] = useState(INITAL_CODE_EDITOR_CONTENT);

    const submitData = async () => {
        const stringifiedCode = await bundle(inputValue)
        setCode(stringifiedCode)
    }

    return (
        <div className="CodeCell m-1">
            <h1 className='text-white text-center'> Jbook </h1>
            <button className='btn btn-primary m-1' onClick={submitData}> Run </button>
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
                        code={code}
                    />
                </div>

            </Resizeable>
        </div>
    );
}

export default CodeCell;
