import { SCENES } from '../constants.js';

const JUMPS = {
  ONE: SCENES.TITLE,
  TWO: SCENES.CRATER,
  THREE: SCENES.ENDING,
};

// Dev builds only: number keys 1-3 jump between scenes.
export function enableSceneJump(scene) {
  if (!import.meta.env.DEV) return;

  for (const [key, target] of Object.entries(JUMPS)) {
    scene.input.keyboard.on(`keydown-${key}`, () => scene.scene.start(target));
  }
}
