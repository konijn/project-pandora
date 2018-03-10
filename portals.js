
features.portals = {

  frequency: 3, //per thousand
  
  place: function portalsPlace(){
    let freeSpots = PP.tiles.filter(cell=>cell.type===0).randomize();
    (features.portals.frequency).loop(function placePortal(){
      let spot1 = freeSpots.shift(),
          spot2 = freeSpots.shift();
      spot1.type = spot2.type = 'ᗝ';
      spot1.target = {col:spot2.col,row:spot2.row};
      spot2.target = {col:spot1.col,row:spot1.row};
    });
  }
  

}