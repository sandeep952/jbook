import React, { useEffect, useRef } from "react";
import { INITAL_IFRAME_HTML } from "../constants/initalIframeHTML";
import './Preview.css'
interface PreviewProps {
  code: string;
}
const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = INITAL_IFRAME_HTML
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*')
    }, 100)
  }, [code]);


  return (
    <div className="preview-wrapper">
      <iframe
        style={{ width: '100%', minWidth: '300px', backgroundColor: 'white' }}
        ref={iframeRef}
        srcDoc={INITAL_IFRAME_HTML}
        title="executionFrame"
        sandbox="allow-scripts"
      />
    </div>

  );
}

export default Preview;
