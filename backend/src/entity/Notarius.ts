import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Notarius {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  certificateNumber: number;

  @Column()
  organizationName: string;

  @Column()
  notarialRegion: string;

  @Column()
  phoneNumber: number;

  @Column()
  certificationDate: string;

  @Column()
  cardDate: string;

  @Column()
  districtRegistrationDate: string;

  @Column()
  place: string;

  @Column()
  region: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}