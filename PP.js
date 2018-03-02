//One global to rule them all
//rot.js http://ondras.github.io/rot.js/doc/
//
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
    PP.tiles = [];
    PP.map.create(PP.setCell);
    PP.scaffold();
    log(DEBUG, PP.map);
    PP.rooms = PP.map.getRooms();
    PP.corridors = PP.map.getCorridors();
    PP.drawGame();
  },

  drawGame : function drawGame(){
    PP.display.clear();
    PP.map.create( function(col,row)
    {
      let cell = PP.tiles[row*PP.width+col],
          feature = cell.visitor || features[cell.type];
      PP.display.draw( col , row , feature.c, feature.color );
    });
  },

  place : function place(visitor){
    PP.getCell(visitor.col,visitor.row).visitor = visitor;
  },

  getCell: function getCell(col,row){
    return PP.tiles[row*PP.width+col];
  },
  
  setCell: function getCell(col, row, type){
    PP.tiles[row*PP.width+col] = {type, row, col};
  },
  
  scaffold: function scaffold(){
    if(!PP.game.player){
      let spot = PP.tiles.filter(cell=>cell.type===0).random();
      PP.game.player = {col: spot.col, row:spot.row, c:'@',color:Color.map('W')};
    }
    PP.place(PP.game.player);
  }
}