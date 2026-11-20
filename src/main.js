import * as Phaser from 'phaser';
import { WIDTH, HEIGHT, COLORS } from './constants.js';
import { enableIntegerScaling } from './display/integerScale.js';
import { Boot } from './scenes/Boot.js';
import { Title } from './scenes/Title.js';
import { Crater } from './scenes/Crater.js';
import { Ending } from './scenes/Ending.js';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: COLORS.night,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.NO_CENTER,
  },
  input: {
    gamepad: true,
  },
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  scene: [Boot, Title, Crater, Ending],
});

game.events.once(Phaser.Core.Events.READY, () => enableIntegerScaling(game));
