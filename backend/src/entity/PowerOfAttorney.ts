import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class PowerOfAttorney {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  series: string;

  @Column()
  number: number;

  @Column()
  issuedTo: string;

  @Column()
  taxNumber: number;

  @Column()
  validUntil: string;

  @Column()
  active: boolean;

  @Column('text')
  additionalInfo: string;

  @Column()
  notariusId: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}