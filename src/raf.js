module.exports = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : setTimeout;
