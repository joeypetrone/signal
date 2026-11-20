import * as Phaser from 'phaser';
import { WIDTH, HEIGHT, SCENES, COLORS } from '../constants.js';
import { label } from '../ui/label.js';
import { enableSceneJump } from '../debug/sceneJump.js';

export class Crater extends Phaser.Scene {
  constructor() {
    super(SCENES.CRATER);
  }

  create() {
    this.cameras.main.setBackgroundColor(COLORS.ground);
    label(this, WIDTH / 2, HEIGHT / 2, 'CRATER');

    enableSceneJump(this);
  }
}
