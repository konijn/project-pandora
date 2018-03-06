PP.mouse = {

  listening : false,

  listen : function()
  {
    if(!PP.mouse.listening)
    {
      document.getElementsByTagName("canvas")[0].addEventListener("click", function(e)
      {
        var x = Math.floor(  ( e.x - this.offsetLeft ) /  (  this.width / PP.width  )  );
        var y = Math.floor(  ( e.y - this.offsetTop ) /  (  this.height / PP.height  )  );
        log(DEBUG, "Clicked: (" , x , "," , y , ")" );
        if( PP.mouse.next )
        {
          PP.mouse.next( x , y , e );
        }
      });
      PP.mouse.listening = true;
    }
  }
};



