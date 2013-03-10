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
        for (var name in ROT) 
        {
          if (ROT[name] == code && name.indexOf("VK_") == 0) { vk = name; }
        }
        console.log( "Keydown: code is " + code + "(  " + String.fromCharCode(code) + "  ) , (" + vk + ")" );
        if( PP.kb.next )
        {
          PP.kb.next( code , String.fromCharCode(code) , vk );
        }
      });
      PP.kb.listening = true;
    }
  }
}
