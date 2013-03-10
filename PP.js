//One global to rule them all
PP = {

  width: 80,
  height: 50,

  newGame : function(n)
  {
    PP.game = {};
    PP.game.description = 'Save game ' + (++n)
    PP.game.seed = Math.floor(Math.random()*100000000);
    PP.game.level = 1;
    PP.game.n = n;
    PP.save.store();
    PP.playGame();
  },

  playGame : function()
  {
    PP.display.clear();  
    ROT.RNG.setSeed( PP.game.seed * PP.game.level );
    PP.map = new ROT.Map.Uniform( PP.width , PP.height , { roomDugPercentage : 0.95  } );
    //Write out the map
    PP.map.create( function(x,y,type)
    {    
      PP.display.draw( x , y , type?"#":" " );
    });
    PP.rooms = PP.map.getRooms();
    PP.corridors = PP.map.getCorridors();
            
  }
  
}
