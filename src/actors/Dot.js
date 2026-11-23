import * as Phaser from 'phaser';
import { COLORS } from '../constants.js';

const SIZE = 12;

// Speeds in px/s, accelerations in px/s², turn rate in rad/s.
const TUNING = {
  maxSpeed: 70,
  accel: 220,
  decel: 140,
  turnRate: 8,
};

export class Dot {
  constructor(scene, x, y) {
    this.scene = scene;
    this.rect = scene.add.rectangle(x, y, SIZE, SIZE, COLORS.dot);
    scene.physics.add.existing(this.rect);
    this.nose = scene.add.rectangle(x, y, 6, 2, COLORS.pale);
    this.heading = 0;
    this.speed = 0;
  }

  update(move, dt) {
    if (move.lengthSq() > 0) {
      this.heading = Phaser.Math.Angle.RotateTo(this.heading, move.angle(), TUNING.turnRate * dt);
      this.heading = Phaser.Math.Angle.Wrap(this.heading);
    }
    this.rect.rotation = this.heading;
    Phaser.Math.RotateTo(this.nose, this.rect.body.center.x, this.rect.body.center.y, this.heading, 4);
    this.nose.rotation = this.heading;
  }
}
