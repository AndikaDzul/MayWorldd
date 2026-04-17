import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class VoiceNote extends Document {
  @Prop()
  audioData: string; // Base64 string

  @Prop()
  duration: number;

  @Prop()
  date: string;
}

export const VoiceNoteSchema = SchemaFactory.createForClass(VoiceNote);

@Schema({ timestamps: true })
export class Chat extends Document {
  @Prop()
  sender: string;

  @Prop()
  text: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
