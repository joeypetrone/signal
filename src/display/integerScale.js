import { WIDTH, HEIGHT } from '../constants.js';

// Sizes the canvas to the largest whole multiple of the 320×180 view that
// fits the window in device pixels, then shows it at exactly that many device
// pixels. Every world pixel becomes an exact square of screen pixels at any
// Windows display scaling, and cameras get spare canvas pixels to scroll and
// draw text with. See display/camera.js for the camera side.
export function enableIntegerScaling(game) {
  const apply = () => {
    const dpr = window.devicePixelRatio || 1;
    game.scale.getParentBounds();
    const { width, height } = game.scale.parentSize;
    const multiple = Math.max(1, Math.floor(Math.min((width * dpr) / WIDTH, (height * dpr) / HEIGHT)));

    // resize() only rewrites the canvas CSS size when it differs from the
    // pixel size; setZoom() always does, so it has to come second.
    game.scale.resize(WIDTH * multiple, HEIGHT * multiple);
    game.scale.setZoom(1 / dpr);
  };

  window.addEventListener('resize', apply);
  apply();
}

// How many canvas pixels make up one world pixel right now.
export function pixelMultiple(game) {
  return game.scale.width / WIDTH;
}
