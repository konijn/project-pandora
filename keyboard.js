PP.kb = {
  
  listening : false,

  listen : function()
  {
    //Create reverse lookup for performance
    PP.kb.codes = {};
    Object.keys(ROT).filter(key => !key.indexOf("VK_")).each(key => (PP.kb.codes[ROT[key]] = key));
    if( !PP.kb.listening )
    {
      document.addEventListener("keydown", function(e)
      {
        let arg = {code: e.keyCode, stringCode: String.fromCharCode(e.keyCode), c: e.key,e};
        log(arg);
        if(e.ctrlKey && e.shiftKey && e.key == 'I'){
          return true;
        }
        e.stopPropagation();
        e.preventDefault();
        arg.vk = PP.kb.codes[arg.code] || '?';
        if(!PP.controller.handled(arg) && PP.kb.next)
        {
          PP.kb.next(arg);
        }
      });
      PP.kb.listening = true;
    }
  }
};
