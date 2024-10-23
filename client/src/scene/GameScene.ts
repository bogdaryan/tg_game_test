import Phaser from 'phaser';
import { ControlScene } from './ControlScene';

interface CollectibleData {
  x: number;
  y: number;
}

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  public platform!: Phaser.Physics.Arcade.StaticGroup;
  public plusBtn!: Phaser.GameObjects.Image;
  private controlScene!: ControlScene;
  private framePlatformWidth: number;
  private collectibles!: Phaser.Physics.Arcade.Group;
  private bananaCountText!: Phaser.GameObjects.Text;

  private bananaCount: number = 0;

  constructor() {
    super('game');

    this.framePlatformWidth = 48;
  }

  preload() {
    this.load.spritesheet('ground', 'assets/Terrain_(16x16).png', {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.spritesheet('player', 'assets/Run_(32x32).png', {
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

    this.platform = this.physics.add.staticGroup();

    this.collectibles = this.physics.add.group();

    this.createPlayer(100, this.cameras.main.height - 40);

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    this.physics.add.collider(this.player, this.platform);

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
      (_player, banan) => {
        banan.destroy();
        this.bananaCount++;
        this.bananaCountText.setText(`Bananas: ${this.bananaCount}`);
      },
      undefined,
      this
    );

    this.plusBtn = this.add
      .image(50, 70, 'plus_btn')
      .setInteractive()
      .setScale(1);

    this.plusBtn.on('pointerdown', () => {
      this.generateCollectibles();
    });

    this.scene.launch('control');
    this.controlScene = this.scene.get('control') as ControlScene;

    this.generatePlatforms();

    this.loadGameState();
  }

  createPlatform(x: number, y: number) {
    const screenHeight = this.cameras.main.height;

    this.platform
      .create(x + 48, screenHeight - y, 'ground', 2)
      .setScale(1)
      .refreshBody();
  }

  generatePlatforms() {
    const numberOfPlatformFloor = Math.ceil(
      window.innerWidth / this.framePlatformWidth
    );

    let floor = -this.framePlatformWidth * 2;

    for (let i = 0; i <= numberOfPlatformFloor; i++) {
      this.createPlatform((floor += this.framePlatformWidth), 0);
    }

    let posX = -30;
    let posY = 50;

    // stairs
    for (let i = 0; i < 3; i++) {
      this.createPlatform((posX += 48), (posY += 50));
    }

    // flat
    posX += 48;
    for (let i = 0; i < 3; i++) {
      this.createPlatform((posX += 48), 200);
    }

    // stairs
    posY += 50;
    for (let i = 0; i < 3; i++) {
      this.createPlatform((posX -= 48), (posY += 50));
    }

    // flat
    posX -= 48;
    for (let i = 0; i < 3; i++) {
      this.createPlatform((posX -= 48), 400);
    }
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

    this.physics.add.collider(this.collectibles, this.platform);
  }

  createPlayer(x: number, y: number) {
    this.player = this.physics.add.sprite(x, y, 'player');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.createPlayerAnimations();
  }

  createPlayerAnimations() {
    this.anims.create({
      key: 'run-right',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'run-left',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    this.handlePlayerMovement();

    window.addEventListener('beforeunload', () => {
      this.saveGameState();
    });
  }

  handlePlayerMovement() {
    this.player.setVelocityX(0);

    if (this.cursors.left?.isDown || this.controlScene.isLeftPressed) {
      this.player.setVelocityX(-160);
      this.player.anims.play('run-left', true);
    } else if (this.cursors.right?.isDown || this.controlScene.isRightPressed) {
      this.player.setVelocityX(160);
      this.player.anims.play('run-right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.stop();
    }

    if (
      (this.cursors.up?.isDown || this.controlScene.isJumpPressed) &&
      this.player.body!.touching.down
    ) {
      this.player.setVelocityY(-330);
      this.controlScene.isJumpPressed = false;
    }
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

      (gameState.collectibles as CollectibleData[]).forEach(
        (collectibleData: CollectibleData) => {
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

    this.physics.add.collider(this.collectibles, this.platform);
  }
}
