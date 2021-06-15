import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  person: string;

  @Column()
  IDN: string;

  @Column()
  reasonOfAbsence: string;
}