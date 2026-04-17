import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { VoiceNotesService } from './voice-notes.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  maxHttpBufferSize: 1e8, // 100MB to support large Voice Note payloads
})
export class VoiceNotesGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly voiceNotesService: VoiceNotesService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    
    // Initial Load: Send existing data
    const chats = await this.voiceNotesService.findAllChats();
    client.emit('init_chats', chats);

    const notes = await this.voiceNotesService.findAllVoiceNotes();
    client.emit('init_voicenotes', notes);
  }

  @SubscribeMessage('send_message')
  async handleMessage(@MessageBody() data: any) {
    try {
      const newChat = await this.voiceNotesService.createChat(data);
      // Broadcast to EVERYONE
      this.server.emit('new_message', newChat);
    } catch (err) {
      console.error('Error saving chat:', err);
    }
  }

  @SubscribeMessage('send_voicenote')
  async handleVoiceNote(@MessageBody() data: any) {
    try {
      const newNote = await this.voiceNotesService.createVoiceNote(data);
      this.server.emit('new_voicenote', newNote);
    } catch (err) {
      console.error('Error saving voice note:', err);
    }
  }

  @SubscribeMessage('request_init')
  async handleRequestInit(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`📦 Manual refresh requested by: ${client.id}`);
    const notes = await this.voiceNotesService.findAllVoiceNotes();
    client.emit('init_voicenotes', notes);
  }

  @SubscribeMessage('delete_voicenote')
  async handleDeleteVoiceNote(@MessageBody() id: string) {
    try {
      console.log(`🗑️ Deleting voice note: ${id}`);
      await this.voiceNotesService.deleteVoiceNote(id);
      this.server.emit('deleted_voicenote', id);
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  }
}
