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
  identify: function identify(){
    PP.player.items.each(item => PP.items.identify(item));
  }
  

}