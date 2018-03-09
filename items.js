//"use strict";

PP.items = {
  
  random: function itemRandom(quality){
    return { type: 'potion', c: '!', color:Color.map('r') };
  },
  
  drop: function itemsDrop(visitor, items){
    items = listify(items);
    //Look like the item dropped, or a chest
    let item = items.length == 1 ? items[0] : {c:'&', color:Color.map('m')};
    Object.assign(PP.getVisitorCell(visitor), {items, item: items[0]});
  }
  
};