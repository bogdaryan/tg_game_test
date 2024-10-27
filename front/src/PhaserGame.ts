import Phaser from 'phaser';
import { Boot, GameScene } from './game/scene';
import { ControlScene } from './game/scene/ControlScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500, x: 0 },
    },
  },
  scene: [Boot, GameScene, ControlScene],
};

export default config;
