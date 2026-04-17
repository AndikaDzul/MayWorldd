import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Media extends Document {
  @Prop({ required: true })
  url: string; // Bisa link Cloudinary, YouTube, atau Base64 (jika foto kecil)

  @Prop({ required: true, enum: ['photo', 'video'] })
  type: string;

  @Prop()
  caption: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
