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

const DPAD = { UP: 12, DOWN: 13, LEFT: 14, RIGHT: 15 };
// Sticks at rest drift by up to about 0.1; 0.2 leaves margin.
const DEADZONE = 0.2;

export class Actions {
  constructor(scene) {
    this.scene = scene;
    this.actionKeys = {};
    for (const [action, binding] of Object.entries(BINDINGS)) {
      this.actionKeys[action] = binding.keys.map((name) => scene.input.keyboard.addKey(name));
    }
    this.moveKeys = scene.input.keyboard.addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT');
    this.down = {};
    this.wasDown = {};
    this.move = new Phaser.Math.Vector2();
    this.stick = new Phaser.Math.Vector2();
  }

  update() {
    this.wasDown = { ...this.down };
    const pad = this.scene.input.gamepad.getAll()[0];
    const pressed = (index) => pad?.buttons[index]?.pressed === true;

    for (const [action, binding] of Object.entries(BINDINGS)) {
      const keyDown = this.actionKeys[action].some((key) => key.isDown);
      const buttonDown = binding.buttons.some(pressed);
      this.down[action] = keyDown || buttonDown;
    }

    const k = this.moveKeys;
    const right = k.RIGHT.isDown || k.D.isDown || pressed(DPAD.RIGHT);
    const left = k.LEFT.isDown || k.A.isDown || pressed(DPAD.LEFT);
    const down = k.DOWN.isDown || k.S.isDown || pressed(DPAD.DOWN);
    const up = k.UP.isDown || k.W.isDown || pressed(DPAD.UP);

    this.move.set(Number(right) - Number(left), Number(down) - Number(up));
    this.move.normalize();

    this.stick.set(pad?.axes[0]?.value ?? 0, pad?.axes[1]?.value ?? 0);
    const length = this.stick.length();

    if (length > DEADZONE) {
      const strength = Math.min((length - DEADZONE) / (1 - DEADZONE), 1);
      this.move.copy(this.stick).normalize().scale(strength);
    }
  }

  isDown(action) {
    return this.down[action] === true;
  }

  justPressed(action) {
    return this.isDown(action) && this.wasDown[action] !== true;
  }
}
