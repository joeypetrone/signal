import * as Phaser from 'phaser';
import { SCENES, ASSETS } from '../constants.js';

export class Boot extends Phaser.Scene {
  constructor() {
    super(SCENES.BOOT);
  }

  preload() {
    this.load.image(ASSETS.TILESET, 'assets/tilesets/crater.png');
    this.load.tilemapTiledJSON(ASSETS.MAP, 'assets/maps/crater.json');
  }

  create() {
    this.scene.start(SCENES.TITLE);
  }
}
