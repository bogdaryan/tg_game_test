import Phaser from 'phaser';
import { ControlScene } from './ControlScene';
import { Player } from '../Elements/Player';
import { PlatformManager } from '../Elements/PlatformManager';
import { postSaveGame } from '../../api/api';

type TGameState = {
  posX: number;
  posY: number;
  bananaCount: number;
  collectibles: { x: number; y: number }[];
};

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private platformManager!: PlatformManager;

  public plusBtn!: Phaser.GameObjects.Image;
  private controlScene!: ControlScene;

  private bananaCountText!: Phaser.GameObjects.Text;
  private collectibles!: Phaser.Physics.Arcade.Group;

  private bananaCount: number = 0;

  constructor() {
    super('game');
  }

  preload() {}

  create() {
    this.add
      .tileSprite(0, 0, window.innerWidth, window.innerHeight, 'background')
      .setOrigin(0, 0);
    this.player = new Player(this, 100, this.cameras.main.height - 50);

    this.platformManager = new PlatformManager(this);

    this.platformManager.generatePlatforms();

    this.plusBtn = this.add
      .image(50, 70, 'plus_btn')
      .setInteractive()
      .setScale(1.2);

    this.collectibles = this.physics.add.group();

    this.physics.add.collider(this.player, this.platformManager.platforms);

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.player.setCursors(this.cursors);
    }

    this.bananaCountText = this.add.text(
      10,
      10,
      `Bananas: ${this.bananaCount}`,
      {
        font: '24px Arial',
      }
    );

    this.physics.add.overlap(
      this.player,
      this.collectibles,
      (_player, banana) => {
        banana.destroy();
        this.bananaCount++;
        this.bananaCountText.setText(`Bananas: ${this.bananaCount}`);
      },
      undefined,
      this
    );

    this.plusBtn.on('pointerdown', () => {
      this.generateCollectibles();
    });

    this.scene.launch('control');
    this.controlScene = this.scene.get('control') as ControlScene;

    window.addEventListener('beforeunload', () => {
      this.saveGameState();
    });

    this.loadGameState();
  }

  update() {
    this.player.handleMovement(
      this.controlScene.isLeftPressed,
      this.controlScene.isRightPressed,
      this.controlScene.isJumpPressed
    );
  }

  generateCollectibles() {
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(50, window.innerWidth - 50);
      const y = Phaser.Math.Between(50, this.cameras.main.height - 150);
      const collectible = this.collectibles
        .create(x, y, 'collectible')
        .setScale(0.024);
      collectible.setCollideWorldBounds(true);
      collectible.setGravityY(0);
    }

    this.physics.add.collider(
      this.collectibles,
      this.platformManager.platforms
    );
  }

  saveGameState() {
    const gameState = {
      playerPos: {
        x: this.player.x,
        y: this.player.y,
      },
      bananaCount: this.bananaCount,
      // collectibles: this.collectibles.getChildren().map((collectible) => {
      //   const sprite = collectible as Phaser.Physics.Arcade.Sprite;
      //   return {
      //     x: sprite.x,
      //     y: sprite.y,
      //   };
      // }),
    };

    postSaveGame(gameState);
  }

  loadGameState() {
    const gameState: TGameState = JSON.parse(
      sessionStorage.getItem('gameState')!
    );

    if (gameState) {
      this.player.setPosition(gameState.posX, gameState.posY);

      this.bananaCount = gameState.bananaCount;
      this.bananaCountText.setText(`Bananas: ${this.bananaCount}`);

      const collectibles = gameState.collectibles;

      if (collectibles) {
        collectibles.forEach((collectibleData) => {
          const collectible = this.collectibles.create(
            collectibleData.x,
            collectibleData.y,
            'collectible'
          );
          collectible.setScale(0.024);
          collectible.setCollideWorldBounds(true);
          collectible.setGravityY(0);
        });
      }
    }

    this.physics.add.collider(
      this.collectibles,
      this.platformManager.platforms
    );
  }
}
