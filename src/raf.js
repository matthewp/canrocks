module.exports = function(){
  return typeof requestAnimationFrame !== "undefined" ?
    requestAnimationFrame : setTimeout;
};
