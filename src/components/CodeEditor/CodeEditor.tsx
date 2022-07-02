import MonacoEditor, { OnMount } from '@monaco-editor/react'
import React from 'react'

interface CodeEditorProps {
    initValue: string,
    onUpdate: any
}
const CodeEditor: React.FC<CodeEditorProps> = ({ initValue, onUpdate }) => {
    return (
        <MonacoEditor
            onChange={(updatedCode) => onUpdate(updatedCode)}
            value={initValue}
            theme="vs-dark"
            height={500}
            language='javascript'
            options={{
                wordWrap: 'on',
                minimap: { enabled: false },
                folding: false,
                lineNumbersMinChars: 3,
                fontSize: 16,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                formatOnType:true
            }}
        />
    )
}

export default CodeEditor