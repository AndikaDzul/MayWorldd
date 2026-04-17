import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VoiceNotesService } from './voice-notes.service';
import { VoiceNotesController } from './voice-notes.controller';
import { VoiceNotesGateway } from './voice-notes.gateway';
import { VoiceNote, VoiceNoteSchema, Chat, ChatSchema } from './schemas/voice-note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VoiceNote.name, schema: VoiceNoteSchema },
      { name: Chat.name, schema: ChatSchema },
    ]),
  ],
  providers: [VoiceNotesService, VoiceNotesGateway],
  controllers: [VoiceNotesController],
})
export class VoiceNotesModule {}
