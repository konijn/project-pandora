PP.save = {};
PP.save.list = function()
{
  var count  = 5;
  var list = [];
  for( var i = 0 ; i < count ; i++ )
  {
    if(!localStorage["save"+i])
    {
      list.push( (i+1) + ") New Game")
    }
    else
    {
      list.push( (i+1) + ") " + JSON.parse( "save"+i ).description )
    }
  }
  return list;
}
