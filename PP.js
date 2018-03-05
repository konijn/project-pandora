//One global to rule them all
//rot.js http://ondras.github.io/rot.js/doc/
//
"use strict"
var PP = {

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
    PP.tiles = PP.game.tiles || [];
    PP.map.create(PP.scaffoldCell);
    PP.scaffold();
    log(DEBUG, PP.map);
    PP.rooms = PP.map.getRooms();
    PP.corridors = PP.map.getCorridors();
    PP.drawGame();
    PP.kb.next = PP.player.control;
  },

  drawGame : function drawGame(){
    PP.display.clear();
    //lightpasses callback
    function lightPasses(col, row) {
      let cell = PP.getCell(col, row);
      return cell?features[cell.type].passesLight:false;
    }
    //Set fov
    let fov = new ROT.FOV.PreciseShadowcasting(lightPasses);

    fov.compute(PP.game.player.col , PP.game.player.row, 15, function(col, row, r, visibility) {
      let cell = PP.tiles[row*PP.width+col],
          feature = cell.visitor || features[cell.type];
      //var color = (data[x+","+y] ? "#aa0": "#660");
      //display.draw(x, y, ch, "#fff", color);
      PP.display.draw( col , row , feature.c, feature.color );
      cell.seen = true;
    });

    PP.map.create( function(col,row){
      let cell = PP.tiles[row*PP.width+col],
          feature = cell.visitor || features[cell.type];
      if(cell.seen)
        PP.display.draw( col , row , feature.c, feature.color );
    });

  },

  place : function place(visitor){
    PP.getCell(visitor.col,visitor.row).visitor = visitor;
  },
  
  remove: function remove(visitor){ //ANNOYANCE, delete should be a thing
    PP.getCell(visitor.col,visitor.row).visitor = null;
  },
  
  getCell: function getCell(col,row){
    return PP.tiles[row*PP.width+col];
  },
  
  setCell: function getCell(col, row, type){
    PP.tiles[row*PP.width+col] = {type, row, col};
  },

  scaffoldCell: function scaffoldCell(col, row, type){
    if(!PP.getCell(col,row))
      PP.setCell(col, row, type);
  },
  
  scaffold: function scaffold(){
    if(!PP.game.player){
      let spot = PP.tiles.filter(cell=>cell.type===0).random();
      PP.game.player = PP.player.scaffold();
      PP.game.player.col = spot.col;
      PP.game.player.row = spot.row;
    }
    PP.place(PP.game.player);
  }
}