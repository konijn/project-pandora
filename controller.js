PP.controller = {

  handled: function handled(arg){
    let stringCode = arg.stringCode,
        e = arg.e;
    
    if(stringCode == 'S' && e.ctrlKey){
      PP.save.store();
      console.log('Game Saved');
    }
    if(stringCode == 'R' && e.ctrlKey){
      location.reload(true);
      console.log('Reloaded');
    }

    return false;
  }

};