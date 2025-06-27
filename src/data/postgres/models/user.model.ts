import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Transaction } from './transactions.model';

export enum Role {
  RECEIVER = 'receiver',
  SENDER = 'sender',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 180 })
  accountNumber: string;

  @Column({ type: 'float' })
  balance: number;

  @Column({ type: 'enum', enum: Role, default: Role.RECEIVER })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
