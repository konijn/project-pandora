PP.controller = {

  handled: function handled(code, codeString, vk, e){
    log(DEBUG, code, codeString, vk,e);

    if(codeString == 'S' && e.ctrlKey){
      PP.save.store(); 
      console.log('Game Saved');
    }
    if(codeString == 'R' && e.ctrlKey){
      location.reload(true);
      console.log('Reloaded');
    }

    return false;
  }

}