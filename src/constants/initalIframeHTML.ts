export const INITAL_IFRAME_HTML = `
<div id="root">hl</div>
<script>
  window.addEventListener('message',(event)=>{
    try{
    console.log("message")

      eval(event.data)
    }
    catch(err){
      const errorElement = document.querySelector('#root');
      errorElement.innerHTML = '<div style="color:red"  > <h2>Runtime error:</h2>' + err  + '</div>'
      console.error(err);
    }
  },false)
</script>
`;
