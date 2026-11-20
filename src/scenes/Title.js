import * as Phaser from 'phaser';
import { WIDTH, HEIGHT, SCENES, COLORS } from '../constants.js';
import { label } from '../ui/label.js';
import { enableSceneJump } from '../debug/sceneJump.js';

export class Title extends Phaser.Scene {
  constructor() {
    super(SCENES.TITLE);
  }

  create() {
    this.cameras.main.setBackgroundColor(COLORS.groundDark);

    label(this, WIDTH / 2, 60, 'SIGNAL', 16);
    const prompt = label(this, WIDTH / 2, 110, 'PRESS START');
    label(this, WIDTH / 2, HEIGHT - 16, 'ARROWS/WASD DRIVE   Z/SPACE INTERACT   M MUTE', 8, COLORS.pale);

    this.tweens.add({ targets: prompt, alpha: 0.2, duration: 700, yoyo: true, repeat: -1 });

    const start = () => this.scene.start(SCENES.CRATER);
    this.input.keyboard.once('keydown', start);
    this.input.once('pointerdown', start);
    this.input.gamepad.once('down', start);

    enableSceneJump(this);
  }
}
