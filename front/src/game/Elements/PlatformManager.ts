import Phaser, { Scene } from 'phaser';

export class PlatformManager {
  private scene: Scene;
  public platforms: Phaser.Physics.Arcade.StaticGroup;

  constructor(scene: Scene) {
    this.scene = scene;
    this.platforms = this.scene.physics.add.staticGroup();
  }

  createPlatform(x: number, y: number, texture: string) {
    const screenHeight = this.scene.cameras.main.height;

    const platform = this.platforms.create(
      x + 48,
      screenHeight - y,
      texture,
      2
    );
    platform.setScale(1).refreshBody();

    return platform;
  }

  generatePlatforms() {
    const framePlatformWidth = 48;
    const numberOfPlatformFloor = Math.ceil(
      window.innerWidth / framePlatformWidth
    );

    let floor = -framePlatformWidth * 2;

    for (let i = 0; i <= numberOfPlatformFloor; i++) {
      this.createPlatform((floor += framePlatformWidth), 0, 'ground');
    }

    this.createStairs();
  }

  createStairs() {
    let posX = -30;
    let posY = 50;

    // stairs
    for (let i = 0; i < 3; i++) {
      this.createPlatform((posX += 48), (posY += 50), 'ground');
    }

    // // flat
    posX += 48;
    for (let i = 0; i < 3; i++) {
      this.createPlatform((posX += 48), 200, 'ground');
    }

    // // stairs
    posY += 50;
    for (let i = 0; i < 3; i++) {
      this.createPlatform((posX -= 48), (posY += 50), 'ground');
    }

    // // flat
    posX -= 48;
    for (let i = 0; i < 3; i++) {
      this.createPlatform((posX -= 48), 400, 'ground');
    }
  }
}
