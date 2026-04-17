import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VoiceNote, Chat } from './schemas/voice-note.schema';

@Injectable()
export class VoiceNotesService {
  constructor(
    @InjectModel(VoiceNote.name) private voiceNoteModel: Model<VoiceNote>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
  ) {}

  async findAllChats() {
    return this.chatModel.find().sort({ createdAt: 1 }).limit(100).exec();
  }

  async findAllVoiceNotes() {
    return this.voiceNoteModel.find().sort({ createdAt: -1 }).limit(20).exec();
  }

  async findVoiceNoteById(id: string) {
    return this.voiceNoteModel.findById(id).exec();
  }

  async createChat(data: any) {
    const newChat = new this.chatModel(data);
    return newChat.save();
  }

  async createVoiceNote(data: any) {
    try {
      const newNote = new this.voiceNoteModel(data);
      const savedNote = await newNote.save();
      console.log(`✅ Voice note saved to Atlas: ${savedNote._id}`);
      return savedNote;
    } catch (error) {
      console.error('❌ Error saving voice note to Atlas:', error);
      throw error;
    }
  }

  async deleteVoiceNote(id: string) {
    return this.voiceNoteModel.findByIdAndDelete(id).exec();
  }
}
