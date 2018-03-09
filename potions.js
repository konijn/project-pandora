PP.items.potions = {

  descriptions: [
    ['vermillion','r'],
    ['flowered','F'],
  ],

  types: [
    'of healing',
    'of rage',
  ],

  init: function potionsInit(seed){
    ROT.RNG.setSeed(PP.game.seed);
    PP.items.potions.descriptions = PP.items.potions.descriptions.randomize();
    PP.items.potions.types = PP.items.potions.types.randomize();
    if(PP.items.potions.descriptions != PP.items.potions.types){
      log(ERROR, 'Potion descriptions and types have different lengths');
    }
  },

  create: function(quality){
    
  }
};