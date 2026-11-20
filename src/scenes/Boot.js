import * as Phaser from 'phaser';
import { SCENES } from '../constants.js';

export class Boot extends Phaser.Scene {
  constructor() {
    super(SCENES.BOOT);
  }

  preload() {}

  create() {
    this.scene.start(SCENES.TITLE);
  }
}
