// Keeps the canvas at a whole-number multiple of the native resolution so
// every game pixel maps to an exact square of screen pixels.
export function enableIntegerScaling(game) {
  const apply = () => {
    game.scale.getParentBounds();
    game.scale.setZoom(game.scale.getMaxZoom());
  };

  window.addEventListener('resize', apply);
  apply();
}
