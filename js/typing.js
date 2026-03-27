import { typingTexts } from './data.js';

export function initTyping() {
  let ti=0, ci=0, del=false;
  const el = document.getElementById('typed-text');
  
  function type(){
    const t = typingTexts[ti];
    if(!del){ 
      el.textContent = t.slice(0,++ci); 
      if(ci===t.length){ 
        del=true; 
        setTimeout(type,2000); 
        return; 
      } 
    }
    else { 
      el.textContent = t.slice(0,--ci); 
      if(ci===0){ 
        del=false; 
        ti=(ti+1)%typingTexts.length; 
      } 
    }
    setTimeout(type, del?40:60);
  }
  type();
}
