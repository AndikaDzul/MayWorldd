import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  birthdate: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  image: string; // simpan base64 atau URL
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
