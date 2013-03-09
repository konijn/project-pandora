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
    PP.plageGame();
  },

  playGame : function()
  {
    PP.display.clear();  
    ROT.RNG.setSeed( PP.game.seed );
    PP.map = new ROT.Map.Uniform( PP.width , PP.height , { roomDugPercentage : 0.95  } );
    PP.map.create(PP.display.DEBUG);
    PP.rooms = map.getRooms();
            
  }
  
}
