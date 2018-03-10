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
  },
  describe: function itemsDescribe(item){
    return "potion";
  },
  athe: function itemsAthe(item){
    if(item.count){
      return item.count+'';
    }else if(item.unique){
      return 'the';
    }else{
      return 'a';
    }
  },
  identify: function itemIdentify(item){
    if(!item.identified){
      item.identified = true;
      PP.game.messages.push('You identified ' + PP.items.athe(item) + ' ' + PP.items.describe(item));
    }
  }
  
};