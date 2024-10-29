import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
  Min,
} from 'class-validator';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Collectibles } from './collectibles.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  tgUserId: number;

  @Column({ default: 200 })
  posX: number;

  @Column({ default: -200 })
  posY: number;

  @OneToMany(() => Collectibles, (collectibles) => collectibles.player, {
    cascade: true,
  })
  @JoinTable()
  collectibles: Collectibles[];

  @Column({ default: 0 })
  bananaCount: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
