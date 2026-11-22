import * as Phaser from 'phaser';
import { ACTIONS } from '../constants.js';

// Gamepad buttons are positions in the browser's standard layout. Confirm is
// the right face button, cancel the bottom, and reset the left, matching the
// layout where the right button confirms and the bottom one backs out.
const BINDINGS = {
  [ACTIONS.CONFIRM]: { keys: ['Z', 'SPACE', 'ENTER'], buttons: [1] },
  [ACTIONS.CANCEL]:  { keys: ['X', 'ESC'],            buttons: [0] },
  [ACTIONS.RESET]:   { keys: ['R'],                   buttons: [2] },
  [ACTIONS.MUTE]:    { keys: ['M'],                   buttons: [] },
};

export class Actions {
  constructor(scene) {
    this.scene = scene;
    this.actionKeys = {};
    for (const [action, binding] of Object.entries(BINDINGS)) {
      this.actionKeys[action] = binding.keys.map((name) => scene.input.keyboard.addKey(name));
    }
    this.down = {};
    this.wasDown = {};
    this.move = new Phaser.Math.Vector2();
  }

  update() {
    this.wasDown = { ...this.down };
    const pad = this.scene.input.gamepad.getAll()[0];

    for (const [action, binding] of Object.entries(BINDINGS)) {
      const keyDown = this.actionKeys[action].some((key) => key.isDown);
      const buttonDown = binding.buttons.some((index) => pad?.buttons[index]?.pressed);
      this.down[action] = keyDown || buttonDown;
    }
  }

  isDown(action) {
    return this.down[action] === true;
  }

  justPressed(action) {
    return this.isDown(action) && this.wasDown[action] !== true;
  }
}
