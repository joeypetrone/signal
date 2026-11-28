# Signal

Phaser 4 + Vite browser game. See SIGNAL_DESIGN.md for the design.

## Conventions

- The world is 320×180 units with 16×16 tiles and `pixelArt: true`. The canvas is the largest whole multiple of that in device pixels (`src/display/integerScale.js`), and each scene's camera zooms by that multiple (`fitToCanvas` in `src/display/camera.js`). Don't switch to `Scale.FIT`.
- Follow targets with `followSnapped`, not `startFollow`, so the scroll stays on the canvas pixel grid. Text goes through `label()` so it renders at canvas resolution.
- `setScrollFactor(0)` doesn't pin objects to the screen under a zoomed camera. Screen-fixed UI goes in its own scene with its own camera.
- Phaser 4 ships named ESM exports only: `import * as Phaser from 'phaser'`.
- Scene keys and palette live in `src/constants.js`. Use those instead of string or hex literals.
- Game code reads input actions (`move`, `confirm`, `reset`, `mute`), never raw keys or buttons.
- On-screen button prompts are plain text or our own icons, never platform button art or logos.
- Dev-only code goes behind `import.meta.env.DEV` so it is stripped from production.
- Comments explain why, not what. No tutorial-style commentary in the source.
- Every outside asset gets a row in CREDITS.md in the same commit that adds it.
