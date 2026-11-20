import * as Phaser from 'phaser';
import { WIDTH, HEIGHT, SCENES, COLORS } from '../constants.js';
import { label } from '../ui/label.js';
import { enableSceneJump } from '../debug/sceneJump.js';

export class Ending extends Phaser.Scene {
  constructor() {
    super(SCENES.ENDING);
  }

  create() {
    this.cameras.main.setBackgroundColor(COLORS.dusk);
    label(this, WIDTH / 2, HEIGHT / 2, 'TO BE CONTINUED', 8, COLORS.pale);

    enableSceneJump(this);
  }
}
