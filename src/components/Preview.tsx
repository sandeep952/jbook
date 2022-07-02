import React, { useEffect, useRef } from "react";
import { INITAL_IFRAME_HTML } from "../constants/initalIframeHTML";

interface PreviewProps {
  code: string;
}
const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = INITAL_IFRAME_HTML
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*')
    },100)
  }, [code]);


  return (
    <iframe
      ref={iframeRef}
      srcDoc={INITAL_IFRAME_HTML}
      title="executionFrame"
      sandbox="allow-scripts"
    />
  );
}

export default Preview;
