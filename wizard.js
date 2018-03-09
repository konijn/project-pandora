PP.wizard = {

  view: function wizardView(){
    PP.tiles.each(tile => tile.seen = true );
  },
  walk: function wizardWalk(walk){
    PP.wizard.walking = walk===undefined?!PP.wizard.walking:walk;
  },
  test: function test(){
    PP.items.drop(PP.player, PP.items.random());
  },
  indentify: function identify(){
    PP.items.each( PP.items.identify );
  }
  

}