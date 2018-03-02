
var Color = {
  data : { 
    b: '#0000ff', /*dark blue*/
    g: '#008000', /*green*/
    c: '#008b8b', /*blue-green*/
    r: '#ff0000', /*red*/
    P: '#ff00ff', /*pink*/
    p: '#800080', /*purple*/
    m: '#a0522d', /*Mahogany, Sienna Brown*/
    y: '#ffff00', /*yellow*/
    w: '#808080', /*grey (dark white ;)*/
    d: '#696969', /*dim grey*/
    F: '#6495ed', /*corn flower blue*/
    G: '#7fff00', /*light green chartreuse*/
    C: '#00ffff', /*bright blue-green cyan*/
    W: '#ffffff',  /*bright white*/
    o: '#ffa500',  /*orange*/
  },
  map: function colorMap(oneCharColor){
    return this.data[oneCharColor];
  }
}