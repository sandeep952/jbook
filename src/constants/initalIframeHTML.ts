export const INITAL_IFRAME_HTML = `
<div id="root"></div>
<script>
  function handleError(err){
      const errorElement = document.querySelector('#root');
      errorElement.innerHTML = '<div style="color:red"  > <h2>Runtime error:</h2>' + err  + '</div>'
      console.error(err);
  }

  window.addEventListener('error',(event)=>{
    handleError(event.error);
  })
  window.addEventListener('message',(event)=>{
    try{
      eval(event.data)
    }
    catch(err){
      handleError(err)
    }
  },false)
</script>
`;
