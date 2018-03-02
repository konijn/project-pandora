//Dungeon Features    

const PASSES_LIGHT = true,
      BLOCKS_LIGHT = false,
      LIKE_FLOOR = 0,
      LIKE_WALLS = 1;

features = 
{
  length: 0,
  Feature : function(bag)
  {
    Object.assign(this, bag);
  },
  addBase : function(c, color, blocksLight, walkable, description)
  {
    color = Color.map(color);
    this[c] = this[this.length] = new this.Feature({c, color, blocksLight, walkable, description,id:this.length++});
    return this; 
  },
  init : function()
  {
    this.Feature.prototype.dump = function()
    {
      return this.char & ' ' & this.color & ' ' & this.description;
    }
    return this;
  }
}.init()
.addBase(" " , "w" , PASSES_LIGHT, LIKE_FLOOR, "Void")
.addBase("#" , "w" , BLOCKS_LIGHT, LIKE_WALLS, "Wall")
.addBase("." , "w" , PASSES_LIGHT, LIKE_FLOOR, "Floor")
.addBase(";" , "w" , PASSES_LIGHT, LIKE_FLOOR, "Glyph of Warding")
.addBase("'" , "m" , PASSES_LIGHT, LIKE_FLOOR, "Open door")
.addBase("+" , "m" , BLOCKS_LIGHT, LIKE_WALLS, "Closed door")
.addBase(">" , "r" , PASSES_LIGHT, LIKE_FLOOR, "Down stairs")
.addBase("<" , "r" , PASSES_LIGHT, LIKE_FLOOR, "Up stairs")
.addBase("^" , "r" , PASSES_LIGHT, LIKE_FLOOR, "Trap")
.addBase(":" , "w" , BLOCKS_LIGHT, LIKE_WALLS, "Rubble")
.addBase("$" , "g" , PASSES_LIGHT, LIKE_FLOOR, "Treasure")
.addBase("%" , "o" , BLOCKS_LIGHT, LIKE_WALLS, "Vein")
.addBase("`" , "w" , PASSES_LIGHT, LIKE_FLOOR, "Portal")
/*
.addBase("1" , "w" , "General store")
.addBase("2" , "w" , "Armory")
.addBase("3" , "w" , "Weapon shop")
.addBase("4" , "w" , "Temple")
.addBase("5" , "w" , "Alchemist")
.addBase("6" , "w" , "Magic shop")
.addBase("7" , "w" , "Black market")
.addBase("8" , "w" , "Home")
.addBase("9" , "w" , "Book store")
*/
log(DEBUG,"Features: ", features);