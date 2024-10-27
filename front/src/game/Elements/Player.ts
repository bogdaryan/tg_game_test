import Phaser, { Scene } from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.scale = 1.1;
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

    this.createPlayerAnimations();
  }

  createPlayerAnimations() {
    this.scene.anims.create({
      key: 'run-right',
      frames: this.scene.anims.generateFrameNumbers('player', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'run-left',
      frames: this.scene.anims.generateFrameNumbers('player', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  setCursors(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    this.cursors = cursors;
  }

  handleMovement(
    isLeftPressed: boolean,
    isRightPressed: boolean,
    isJumpPressed: boolean
  ) {
    this.setVelocityX(0);

    if (this.cursors.left?.isDown || isLeftPressed) {
      this.setVelocityX(-160);
      this.anims.play('run-left', true);
    } else if (this.cursors.right?.isDown || isRightPressed) {
      this.setVelocityX(160);
      this.anims.play('run-right', true);
    } else {
      this.anims.stop();
    }

    if (
      (this.cursors.up?.isDown || isJumpPressed) &&
      this.body!.touching.down
    ) {
      this.setVelocityY(-330);
    }
  }
}
