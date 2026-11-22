# Signal

Phaser 4 + Vite browser game. See SIGNAL_DESIGN.md for the design.

## Conventions

- Native resolution 320×180, 16×16 tiles, `pixelArt: true`. Scaling is whole-number only (`src/display/integerScale.js`); don't switch to `Scale.FIT`.
- Phaser 4 ships named ESM exports only: `import * as Phaser from 'phaser'`.
- Scene keys and palette live in `src/constants.js`. Use those instead of string or hex literals.
- Game code reads input actions (`move`, `confirm`, `reset`, `mute`), never raw keys or buttons.
- On-screen button prompts are plain text or our own icons, never platform button art or logos.
- Dev-only code goes behind `import.meta.env.DEV` so it is stripped from production.
- Comments explain why, not what. No tutorial-style commentary in the source.
- Every outside asset gets a row in CREDITS.md in the same commit that adds it.
