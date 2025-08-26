import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ default: () => uuidv4(), unique: true })
  orderId: string;

  @Prop()
  customerName: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  amount: number;

  @Prop()
  metodePembayaran: string;

  @Prop({ type: Array })
  items: any[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
