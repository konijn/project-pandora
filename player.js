'use strict';

PP.player = {
  scaffold: function scaffold(){
    return {c:'@', color:Color.map('W')}
  },
  control: function control(code , codeString, vk, e){
    let player = PP.player,
        dirty = false,
        feature;
    dirty = PP.player.tryMove(vk,['VK_LEFT', 'VK_NUMPAD4'], -1, 0) ||
            PP.player.tryMove(vk,['VK_RIGHT', 'VK_NUMPAD6'], 1, 0) ||
            PP.player.tryMove(vk,['VK_UP', 'VK_NUMPAD8'], 0, -1) ||
            PP.player.tryMove(vk,['VK_DOWN', 'VK_NUMPAD2'], 0, 1) ||

            PP.player.tryMove(vk,['VK_NUMPAD1'], -1, 1) ||
            PP.player.tryMove(vk,['VK_NUMPAD3'], 1, 1) ||
            PP.player.tryMove(vk,['VK_NUMPAD7'], -1, -1) ||
            PP.player.tryMove(vk,['VK_NUMPAD9'], 1, -1);


    if(dirty){
      PP.drawGame();
    }
  },
  tryMove: function tryMove(vk, vkeys, dCol, dRow){
    if(!vkeys.has(vk))
      return false;
    let player = PP.player,
        cell = PP.getCell(player.col + dCol, player.row + dRow);
    if(!cell)
      return false;
    let feature = features[cell.type];
    if(feature.walkable == LIKE_FLOOR || PP.wizard.walking){
      PP.remove(player); 
      player.col += dCol; 
      player.row += dRow; 
      PP.place(player); 
      return true;
    }
  }
};