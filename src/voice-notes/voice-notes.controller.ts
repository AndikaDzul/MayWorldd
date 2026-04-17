import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import * as express from 'express';
import { VoiceNotesService } from './voice-notes.service';

@Controller('voice')
export class VoiceNotesController {
  constructor(private readonly voiceNotesService: VoiceNotesService) {}

  @Get(':id')
  async getVoiceNote(@Param('id') id: string, @Res() res: express.Response) {
    try {
      const note = await this.voiceNotesService.findVoiceNoteById(id);
      if (!note) {
        throw new NotFoundException('Voice note not found');
      }

      // Convert Base64 (data:audio/mp3;base64,.....) to Buffer
      const base64Parts = note.audioData.split(';base64,');
      const base64Data = base64Parts.length > 1 ? base64Parts.pop() : base64Parts[0];
      
      if (!base64Data) {
        throw new NotFoundException('Audio data is missing');
      }

      const audioBuffer = Buffer.from(base64Data, 'base64');

      res.writeHead(200, {
        'Content-Type': 'audio/mp3',
        'Content-Length': audioBuffer.length,
      });
      res.end(audioBuffer);
    } catch (err) {
      console.error('Error fetching voice note:', err);
      res.status(500).send('Internal Server Error');
    }
  }
}
