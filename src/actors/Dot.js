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
    this.heading = 0;
    this.speed = 0;
  }

  update(move, dt) {
  }
}
