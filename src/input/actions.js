import * as Phaser from 'phaser';
import { ACTIONS } from '../constants.js';

const BINDINGS = {
  [ACTIONS.CONFIRM]: { keys: ['Z', 'SPACE', 'ENTER'], buttons: [0] },
  [ACTIONS.RESET]:   { keys: ['R'],                   buttons: [3] },
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
    for (const [action, keys] of Object.entries(this.actionKeys)) {
      this.down[action] = keys.some((key) => key.isDown);
    }
  }

  isDown(action) {
    return this.down[action] === true;
  }

  justPressed(action) {
    return this.isDown(action) && this.wasDown[action] !== true;
  }
}
