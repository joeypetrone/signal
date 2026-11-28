import * as Phaser from 'phaser';
import { WIDTH, HEIGHT } from '../constants.js';
import { pixelMultiple } from './integerScale.js';

// Zooms the scene's main camera so the 320×180 world fills the canvas, and
// keeps Text sharp by drawing it at one texture pixel per canvas pixel.
// Follows the canvas when the window is resized.
export function fitToCanvas(scene) {
  const camera = scene.cameras.main;

  const apply = () => {
    const multiple = pixelMultiple(scene.game);
    camera.setSize(scene.scale.width, scene.scale.height);
    camera.setZoom(multiple);
    // Zoom pivots on the camera's center, so a scroll of 0 no longer shows
    // the 0–320 range. Scenes that follow something re-center every frame.
    camera.centerOn(WIDTH / 2, HEIGHT / 2);
    for (const child of scene.children.list) {
      if (child instanceof Phaser.GameObjects.Text) child.setResolution(multiple);
    }
  };

  apply();
  scene.scale.on(Phaser.Scale.Events.RESIZE, apply);
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    scene.scale.off(Phaser.Scale.Events.RESIZE, apply);
  });
}

// Replaces startFollow. Phaser's own pixel rounding switches off once the
// camera is zoomed, so the scroll is snapped here instead, to whole canvas
// pixels rather than whole world pixels. Tiles then land exactly on the
// pixel grid, and the view can move in fractions of a world pixel, which
// keeps diagonal scrolling from stair-stepping.
export function followSnapped(scene, target) {
  const camera = scene.cameras.main;

  const snap = () => {
    const multiple = camera.zoom;
    camera.centerOn(target.x, target.y);
    camera.scrollX = Math.round(camera.scrollX * multiple) / multiple;
    camera.scrollY = Math.round(camera.scrollY * multiple) / multiple;
  };

  // Arcade copies body positions onto game objects in its POST_UPDATE
  // listener, which is registered before any scene's create() runs, so this
  // one sees the position Dot will be drawn at this frame.
  snap();
  scene.events.on(Phaser.Scenes.Events.POST_UPDATE, snap);
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    scene.events.off(Phaser.Scenes.Events.POST_UPDATE, snap);
  });
}
