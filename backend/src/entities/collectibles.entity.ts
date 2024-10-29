import { IsDate, IsNotEmpty } from 'class-validator';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Player } from './player.entity';

@Entity()
export class Collectibles {
  @PrimaryGeneratedColumn()
  id: number;

  posX: number;

  @Column()
  posY: number;

  @Column({ type: 'int' })
  @ManyToOne(() => Player, (player) => player.collectibles)
  player: Player;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
