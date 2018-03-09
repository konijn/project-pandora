PP.kb = {
  
  listening : false,

  listen : function() {
    //Create reverse lookup for performance
    PP.kb.codes = {};
    Object.keys(ROT).filter(key => !key.indexOf("VK_")).each(key => (PP.kb.codes[ROT[key]] = key));
    if( !PP.kb.listening ) {
      document.addEventListener("keydown", function(e) {
        let arg = {code: e.keyCode, stringCode: String.fromCharCode(e.keyCode), c: e.key,e};
        log(DEBUG, arg);
        if(e.ctrlKey && e.shiftKey && e.key == 'I'){
          return true;
        }
        e.stopPropagation();
        e.preventDefault();
        arg.vk = PP.kb.codes[arg.code] || '?';
        if(PP.controller.handled(arg)){
          PP.drawGame();
        }else if(PP.kb.next){
          if(PP.kb.next(arg)!==false)
            PP.drawGame();
        }
      });
      PP.kb.listening = true;
    }
  }
};
