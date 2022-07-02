export const INITAL_CODE_EDITOR_CONTENT = `
import React from 'react'
import ReactDOM from "react-dom/client";
const App = ()=>(<div>hello</div>)

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App name="Saeloun blog" callback={() => console.log("Blog rendered")} />);
`