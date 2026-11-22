import * as Phaser from 'phaser';
import { WIDTH, HEIGHT, SCENES, COLORS, ACTIONS } from '../constants.js';
import { label } from '../ui/label.js';
import { enableSceneJump } from '../debug/sceneJump.js';
import { Actions } from '../input/actions.js';

export class Title extends Phaser.Scene {
  constructor() {
    super(SCENES.TITLE);
  }

  create() {
    this.actions = new Actions(this);
    this.cameras.main.setBackgroundColor(COLORS.groundDark);

    label(this, WIDTH / 2, 60, 'SIGNAL', 16);
    const prompt = label(this, WIDTH / 2, 110, 'PRESS START');
    label(this, WIDTH / 2, HEIGHT - 16, 'ARROWS/WASD DRIVE   Z/SPACE CONFIRM   M MUTE', 8, COLORS.pale);

    this.tweens.add({ targets: prompt, alpha: 0.2, duration: 700, yoyo: true, repeat: -1 });

    this.input.once('pointerdown', () => this.startGame());

    enableSceneJump(this);
  }

  startGame() {
    this.scene.start(SCENES.CRATER);
  }

  update() {
    this.actions.update();
    if (this.actions.justPressed(ACTIONS.CONFIRM)) {
      this.startGame();
    }
  }
}
