//`Namespace`
PP.save = {};
//Create save game list
PP.save.list = function()
{
  var count  = 5;
  var list = [];
  for( var i = 0 ; i < count ; i++ )
  {
    var s = localStorage["save"+i]
    if(!s)
    {
      list.push( (i+1) + ") New Game")
    }
    else
    {
      list.push( (i+1) + ") " + JSON.parse( s ).description )
    }
  }
  return list;
}
//Load a game, or start a game
//This is expected to be called by a key handler, by the way ;)
PP.load = function( code , char , vk )
{
  if(!vk)
    return;
  //Derive the key press, either numpad or top key
  var n = vk.substr(-1) * 1;
  //Between 1 and 5?
  if( !( n > 0 && n < 6  ) )
    return;
  //Get it
  var s = localStorage["save"+(n-1)]
  if(!s)
    PP.newGame();
  else
    console.log( "No loading possible at this point" );
}


