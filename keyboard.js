PP.kb = { 
  
  listening : false,

  listen : function()
  {
    if( !PP.kb.listening )
    {
      document.addEventListener("keydown", function(e) 
      {
        var code = e.keyCode;
        var vk = "?"; /* find the corresponding constant */
        e.stopPropagation();
        e.preventDefault();
        for (var name in ROT) 
        {
          if (ROT[name] == code && name.indexOf("VK_") == 0) { vk = name; }
        }
        log(DEBUG, "Keydown: code is " + code + "(  " + String.fromCharCode(code) + "  ) , (" + vk + ")" );
        if(!PP.controller.handled(code, String.fromCharCode(code), vk, e) && PP.kb.next)
        {
          PP.kb.next(code, String.fromCharCode(code), vk, e);
        }
      });
      PP.kb.listening = true;
    }
  }
}
