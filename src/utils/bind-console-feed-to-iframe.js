const hiddenScript = `
   (function(){
        ['log','warn','error','info'].forEach(m=>{
          const o=console[m];
          console[m]=function(...a){
            parent.postMessage({source:'iframe-console',payload:{method:m,data:a}},'*');
            o.apply(console,a);
          };
        });
        window.addEventListener('error',e=>{
          parent.postMessage({source:'iframe-console',payload:{method:'error',data:[e.message]}},'*');
        });
        window.addEventListener('unhandledrejection',e=>{
          parent.postMessage({source:'iframe-console',payload:{method:'error',data:[e.reason]}},'*');
        });
        document.currentScript.remove();
      })();
`;

export const bindConsoleFeedToIframe = `data:text/javascript;base64,${btoa(hiddenScript)}`;
