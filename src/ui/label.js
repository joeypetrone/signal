// Placeholder text until the bitmap font lands in the art pass.
export function label(scene, x, y, text, size = 8, color = 0xffffff) {
  return scene.add
    .text(x, y, text, {
      fontFamily: 'monospace',
      fontSize: `${size}px`,
      color: `#${color.toString(16).padStart(6, '0')}`,
    })
    .setOrigin(0.5);
}
