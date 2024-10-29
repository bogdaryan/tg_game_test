import { Scene } from 'phaser';
import { postGameStateInitialization } from '../../api/api';

export class Boot extends Scene {
  constructor() {
    super('boot');
  }

  preload() {
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        'Загрузка...',
        { font: '24px Arial', color: '#ffffff' }
      )
      .setOrigin(0.5);

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
    postGameStateInitialization()
      .then((res) => {
        sessionStorage.setItem('gameState', JSON.stringify(res!.data));
        this.scene.start('game');
      })
      .catch((err) => {
        console.error('Ошибка инициализации состояния игры:', err);
        this.scene.start('game');
      });
  }
}
