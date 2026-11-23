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

function approach(current, target, step) {
  if (current < target) return Math.min(current + step, target);
  return Math.max(current - step, target);
}

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
    let targetSpeed = TUNING.maxSpeed * move.length();
    if (move.lengthSq() > 0) {
      const targetAngle = Phaser.Math.Angle.Wrap(move.angle());
      const angleDiff = Phaser.Math.Angle.GetShortestDistance(this.heading, targetAngle);
      targetSpeed *= Math.max(0, Math.cos(angleDiff));
      this.heading = Phaser.Math.Angle.RotateTo(this.heading, targetAngle, TUNING.turnRate * dt);
      this.heading = Phaser.Math.Angle.Wrap(this.heading);
    }
    const blocked = this.rect.body.blocked;
    if (blocked.left || blocked.right) targetSpeed *= Math.abs(Math.sin(this.heading));
    if (blocked.up || blocked.down) targetSpeed *= Math.abs(Math.cos(this.heading));
    const step = (this.speed < targetSpeed ? TUNING.accel : TUNING.decel) * dt;
    this.speed = approach(this.speed, targetSpeed, step);
    this.rect.body.setVelocity(Math.cos(this.heading) * this.speed, Math.sin(this.heading) * this.speed);
    this.rect.rotation = this.heading;
    Phaser.Math.RotateTo(this.nose, this.rect.body.center.x, this.rect.body.center.y, this.heading, 4);
    this.nose.rotation = this.heading;
  }
}
