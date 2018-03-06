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
        list.push( (i+1) + ") New Game");
      }
      else
      {
        list.push( (i+1) + ") " + JSON.parse( s ).description );
      }
    }
  return list;
  },
  //Store the game in progress,
  //Should be done when the game starts and when a new level is reached
  //Highly save scummable in other words
  store : function store()
  {
    PP.game.tiles = PP.tiles;
    PP.game.player = PP.player;
    s = JSON.stringify( PP.game );
    localStorage[ PP.save.key( PP.game.n -  1 ) ] = s;
  },
  //Logic for save game naming is centralized here
  key : function( n )
  {
    return "save" + n;
  },
  //We are not falling again in backwards compatible savegames for throw-away projects
  clear: function saveClear(){
    (5).loop(i => localStorage.removeItem(PP.save.key(i)));
  }
};

//Load a game, or start a game
//This is expected to be called by a key handler, by the way ;)
PP.load = function load( code , char , vk )
{
  //Justified Paranoia
  if(!vk)
    return;
  //Derive the key press, either numpad or top key
  var n = vk.substr(-1) * 1;
  //Between 1 and 5?
  if( !( n > 0 && n < 6  ) )
    return;
  //Get it
  var s = localStorage[ PP.save.key( --n ) ];
  if(!s)
  {
    return PP.newGame( n );
  }
  else
  {
    PP.game = JSON.parse( s );
    Object.assign(PP.player, PP.game.player);
    PP.playGame();
  }
};