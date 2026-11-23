import * as Phaser from 'phaser';
import { SCENES, ASSETS } from '../constants.js';
import { enableSceneJump } from '../debug/sceneJump.js';
import { Actions } from '../input/actions.js';
import { Dot } from '../actors/Dot.js';

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

    this.actions = new Actions(this);

    const dotStart = map.findObject('objects', o => o.name === 'dotStart');
    this.dot = new Dot(this, dotStart.x, dotStart.y);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.dot.rect);

    enableSceneJump(this);
  }

  update(time, delta) {
    this.actions.update();
    this.dot.update(this.actions.move, delta / 1000);
  }
}
