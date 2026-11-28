import { pixelMultiple } from '../display/integerScale.js';

// Sizes are in world pixels. The text is drawn at canvas resolution so it
// stays crisp over the pixel-art world; display/camera.js keeps that in step
// when the window is resized.
export function label(scene, x, y, text, size = 8, color = 0xffffff) {
  return scene.add
    .text(x, y, text, {
      fontFamily: 'monospace',
      fontSize: `${size}px`,
      color: `#${color.toString(16).padStart(6, '0')}`,
      resolution: pixelMultiple(scene.game),
    })
    .setOrigin(0.5);
}
