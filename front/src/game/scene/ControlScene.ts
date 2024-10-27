import Phaser from 'phaser';

export class ControlScene extends Phaser.Scene {
  public isLeftPressed: boolean = false;
  public isRightPressed: boolean = false;
  public isJumpPressed: boolean = false;

  constructor() {
    super('control');
  }

  preload() {
    this.load.image('leftButton', 'assets/left-arrow.png');
    this.load.image('rightButton', 'assets/right-arrow.png');
    this.load.image('jumpButton', 'assets/jump-btn.png');
  }

  create() {
    const buttonSize = 80;

    const leftButton = this.add
      .sprite(50, this.cameras.main.height - 50, 'leftButton')
      .setInteractive()
      .setScrollFactor(0)
      .setDisplaySize(buttonSize, buttonSize);

    const rightButton = this.add
      .sprite(150, this.cameras.main.height - 50, 'rightButton')
      .setInteractive()
      .setScrollFactor(0)
      .setDisplaySize(buttonSize, buttonSize);

    const jumpButton = this.add
      .sprite(
        this.cameras.main.width - 100,
        this.cameras.main.height - 50,
        'jumpButton'
      )
      .setInteractive()
      .setScrollFactor(0)
      .setDisplaySize(buttonSize, buttonSize);

    leftButton.on('pointerdown', () => (this.isLeftPressed = true));
    leftButton.on('pointerup', () => (this.isLeftPressed = false));

    rightButton.on('pointerdown', () => (this.isRightPressed = true));
    rightButton.on('pointerup', () => (this.isRightPressed = false));

    jumpButton.on('pointerdown', () => (this.isJumpPressed = true));
    jumpButton.on('pointerup', () => (this.isJumpPressed = false));
  }
}
