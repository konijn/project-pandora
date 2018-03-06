PP.wizard = {

  view: function wizardView(){
    PP.tiles.each(tile => tile.seen = true );
  },
  walk: function wizardWalk(walk){
    PP.wizard.walking = walk===undefined?!PP.wizard.walking:walk;
  }

}