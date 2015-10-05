module.exports = createQuery;

var typeExp = /\+([a-zA-Z]+) ?/;

function createQuery(searchString){
  var types = [];
  var ss = searchString.replace(typeExp, function(whole, part){
    types.push("type:"+part);
    return "";
  });
  if(types.length) {
    ss = ss.trim();
    // Handles the case of only searching for a type
    if(ss) {
      types.unshift(ss);
    }
    return types.join(" AND ");
  }
  return searchString;
}
