import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from './user.model';

export enum TransactionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'string', length: 255 })
  sender_id: string;

  @Column({ type: 'string', length: 255 })
  receiver_id: string;

  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'enum', enum: TransactionStatus, default: 'pending' })
  status: TransactionStatus;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
