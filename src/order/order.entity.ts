import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  orderId: string;

  @Column()
  customerName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  metodePembayaran: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column('json')
  items: any[];

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
