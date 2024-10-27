import Phaser from 'phaser';
import { ControlScene } from './ControlScene';
import { Player } from '../Elements/Player';
import { PlatformManager } from '../Elements/PlatformManager';

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
      playerPosition: {
        x: this.player.x,
        y: this.player.y,
      },
      bananaCount: this.bananaCount,
      collectibles: this.collectibles.getChildren().map((collectible) => {
        const sprite = collectible as Phaser.Physics.Arcade.Sprite;
        return {
          x: sprite.x,
          y: sprite.y,
        };
      }),
    };

    localStorage.setItem('gameState', JSON.stringify(gameState));
  }

  loadGameState() {
    const gameStateJSON = localStorage.getItem('gameState');
    if (gameStateJSON) {
      const gameState = JSON.parse(gameStateJSON);

      this.player.setPosition(
        gameState.playerPosition.x,
        gameState.playerPosition.y
      );
      this.bananaCount = gameState.bananaCount;

      this.bananaCountText.setText(`Bananas: ${this.bananaCount}`);

      (gameState.collectibles as { x: number; y: number }[]).forEach(
        (collectibleData) => {
          const collectible = this.collectibles.create(
            collectibleData.x,
            collectibleData.y,
            'collectible'
          );
          collectible.setScale(0.024);
          collectible.setCollideWorldBounds(true);
          collectible.setGravityY(0);
        }
      );
    }

    this.physics.add.collider(
      this.collectibles,
      this.platformManager.platforms
    );
  }
}
