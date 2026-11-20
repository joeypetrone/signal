import * as Phaser from 'phaser';
import { SCENES, COLORS, ASSETS } from '../constants.js';
import { enableSceneJump } from '../debug/sceneJump.js';

export class Crater extends Phaser.Scene {
  constructor() {
    super(SCENES.CRATER);
  }

  create() {
    const map = this.make.tilemap({ key: ASSETS.MAP });
    const tiles = map.addTilesetImage('crater', ASSETS.TILESET);
    map.createLayer('ground', tiles);
    this.walls = map.createLayer('walls', tiles);
    this.walls.setCollisionByProperty({ collides: true });

    if (import.meta.env.DEV) {
      const graphics = this.add.graphics();
      this.walls.renderDebug(graphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(89, 146, 0, 140),
        faceColor: new Phaser.Display.Color(91, 179, 0)
      });
    }

    const dotStart = map.findObject('objects', o => o.name === 'dotStart');
    this.dot = this.add.rectangle(dotStart.x, dotStart.y, 12, 12, COLORS.dot);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.dot);

    enableSceneJump(this);
  }
}
