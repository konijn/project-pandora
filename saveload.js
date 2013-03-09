//`Namespace`
PP.save = {
  //Create save game list
  list : function()
  {
    var count  = 5;
    var list = [];
    for( var i = 0 ; i < count ; i++ )
    {
      var s = localStorage[ PP.save.key( i ) ];
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
  //Store the game in progress,
  //Should be done when the game starts and when a new level is reached
  //Highly save scummable in other words
  store : function()
  {
    s = JSON.stringify( PP.game );
    localStorage[ PP.save.key( PP.game.n -  1 ) ] = s;  
  }

  key : function( n )
  {
    return "save" + n; 
  }

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
  var s = localStorage[ PP.save.key( n - 1 ) ];
  if(!s)
  {
    return PP.newGame();
  }
  else
  {
    PP.game = JSON.parse( s );
    PP.playGame();
  }
}
