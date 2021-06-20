import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserRoles } from '../lib/types';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  username: string;

  @Column()
  hash: string;

  @Column()
  salt: string;

  @Column()
  role: UserRoles;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

}