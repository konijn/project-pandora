/**********************************************************************
* All sources in Project Pandora are Copyright (c) by Tom J Demuyt    *
* I, Tom J Demuyt, release all code and data under the terms of the   *
* GNU General Public License (version 2), as well as under the tradi- *
* tional Angband license. Distribution is allowed both under the terms*
* of the GPL (version 2) or under the terms of the traditional Angband*
* license.                                                            *
*                                                                     *
* Exception: ROT.js                                                   *
**********************************************************************/
//One global to rule them all
//rot.js http://ondras.github.io/rot.js/doc/
//
"use strict";
var PP = {

  width: 160,  //160
  height: 50, //50
  radius: 15, //Visibility radius

  newGame : function(n)
  {
    PP.game = {};
    PP.game.description = 'Save game ' + (++n);
    PP.game.seed = Math.floor(Math.random()*100000000);
    PP.game.level = 1;
    PP.game.n = n;
    PP.game.messages = [],
    PP.save.store();
    PP.playGame();
  },

  playGame : function()
  {
    PP.display.clear();
    ROT.RNG.setSeed(PP.game.seed * PP.game.level);
    if(!PP.game.tiles){
      PP.tiles = [];
      PP.map = new ROT.Map.Uniform(PP.width, PP.height, {roomDugPercentage: 0.95, timeLimit: PP.width*PP.height/2});
      PP.map.create(PP.setCell);
      log(DEBUG, PP.map);
      PP.rooms = PP.map.getRooms();
      PP.corridors = PP.map.getCorridors();
    }else{
      PP.tiles = PP.game.tiles;
    }
    PP.scaffold();
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
    //Draw 1 cell if seen
    function drawSeenCell(col, row){
      let cell = PP.tiles[row*PP.width+col],
          feature = features[cell.type];
      if(cell.seen)
        PP.display.draw( col , row , feature.c, feature.color );
    }
    //Draw seen cells
    (PP.width).loop(col => (PP.height).loop(row => drawSeenCell(col,row)));
    //Set fov, consider caching
    let fov = new ROT.FOV.PreciseShadowcasting(lightPasses);
    //Draw fov
    fov.compute(PP.player.col , PP.player.row, PP.radius, function(col, row, r, visibility) {
      let cell = PP.tiles[row*PP.width+col],
          feature = cell.visitor || cell.item || features[cell.type];
      PP.display.draw( col , row , feature.c, feature.color );
      cell.seen = true;
    });
    //Center around the @
    PP.scrollGame();
    //Once scrolled, place a message, if there is any
    PP.drawTopText();
  },

  scrollGame : function scrollGame(){
    //Cache some stuff
    if(!PP.scrollInfo){
      let container = PP.display.getContainer();
      PP.scrollInfo = {
        cellWidth: container.clientWidth / PP.width,
        cellHeight: container.clientHeight / PP.height,
        radiusWidth: container.clientWidth / PP.width * PP.radius,
        radiusHeight: container.clientHeight / PP.height * PP.radius,
        container
      };
    }
    //We want to make sure that the player plus the fov around the player is visible,
    let playerX = PP.scrollInfo.cellWidth * PP.player.col,
        playerY = PP.scrollInfo.cellHeight * PP.player.row,
        rect = PP.scrollInfo.container.getClientRects()[0],
        topY = rect.y + playerY - Math.min(playerY, PP.scrollInfo.radiusHeight, document.documentElement.clientHeight/2),
        bottomY = rect.y + playerY + Math.min(rect.height-playerY, PP.scrollInfo.radiusHeight,document.documentElement.clientHeight/2) - document.documentElement.clientHeight,
        leftX = rect.x + playerX - Math.min(playerX, PP.scrollInfo.radiusWidth, document.documentElement.clientWidth/2),
        rightX = rect.y + playerX + Math.min(rect.width-playerX, PP.scrollInfo.radiusWidth,document.documentElement.clientWidth/2) - document.documentElement.clientWidth,
        deltaY,
        deltaX;

    if(topY < 0 && bottomY <= 0)
      deltaY = topY;
    else if(bottomY > 0 && topY >= 0)
      deltaY = bottomY;
    else if( topY < 0 && bottomY > 0)
      deltaY = (topY+bottomY)/2;

    if(leftX < 0 && rightX <=0)
      deltaX = leftX;
    else if(rightX > 0 && leftX >= 0)
      deltaX = rightX;
    else if( leftX < 0 && rightX > 0 )
      deltaX = (leftX+rightX)/2;

    if((topY+bottomY)/2 == deltaY)
      log(DEBUG, {rect, topY, bottomY,deltaY});
    if(deltaX || deltaY){
      window.scrollBy(deltaX,deltaY);
    }
  },

  drawTopText: function drawTopText(){
    console.log('Draw top text');
    if(PP.game.messages.length){
      let rect = PP.scrollInfo.container.getClientRects()[0],
          row = rect.top >= 0 ? 0 : Math.ceil(Math.abs( rect.top / PP.scrollInfo.cellHeight )),
          col = rect.left >= 0 ? 0 : Math.ceil(Math.abs( rect.left / PP.scrollInfo.cellWidth )),
          message = PP.game.messages.shift();
          message += PP.game.messages.length ? " - more -" : "";
      PP.display.drawText(col, row, message);
    }
  },

  place : function place(visitor){
    let cell = PP.getCell(visitor.col,visitor.row);
    cell.visitor = visitor;
    if(cell.items){
      visitor.items = listify(visitor.items);
      while(cell.items.length && visitor.items.length < 26){
        let item = cell.items.pop();
        PP.game.messages.push(visitor.subject + ' picked up ' + PP.items.describe(item) + '.');
        visitor.items.push(item);
      }
      if(!cell.items.length){
        cell.items = null;
        cell.item = null;
      }else{
        //Drop the remainder
        PP.items.drop(visitor, cell.items);
      }
    }
  },
  
  remove: function remove(visitor){ //ANNOYANCE, delete should be a thing
    PP.getCell(visitor.col,visitor.row).visitor = null;
  },
  
  getCell: function getCell(col,row){
    return PP.tiles[row*PP.width+col];
  },
  
  getVisitorCell: function getVisitorCell(visitor){
    return PP.getCell(visitor.col, visitor.row);
  },
  
  setCell: function getCell(col, row, type){
    PP.tiles[row*PP.width+col] = {type, row, col};
  },

  scaffoldCell: function scaffoldCell(col, row, type){
    if(!PP.getCell(col,row))
      PP.setCell(col, row, type);
  },
  
  scaffold: function scaffold(){
    if(PP.player.col === undefined){
      let spot = PP.tiles.filter(cell=>cell.type===0).random();
      PP.player = PP.player.scaffold();
      PP.player.col = spot.col;
      PP.player.row = spot.row;
    }
    PP.place(PP.player);
  }
};