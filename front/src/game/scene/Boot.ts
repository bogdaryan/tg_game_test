import { Scene } from 'phaser';

export class Boot extends Scene {
  constructor() {
    super('boot');
  }

  preload() {
    this.load.image('background', 'assets/bg.png');
    this.load.spritesheet('ground', 'assets/Terrain_(16x16).png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('player', 'assets/player_run.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image('collectible', 'assets/vecteezy_banana.png');
    this.load.image('plus_btn', 'assets/plus_btn.png');
  }

  create() {
    this.add
      .tileSprite(0, 0, window.innerWidth, window.innerHeight, 'background')
      .setOrigin(0, 0);

    this.scene.launch('game');
  }
}
