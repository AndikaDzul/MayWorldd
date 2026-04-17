import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    // Get connection state
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    const activeDb = this.connection?.db?.databaseName || 'not_initialized';
    
    // Check collections
    let collections: string[] = [];
    try {
      if (this.connection?.db) {
        const cols = await this.connection.db.listCollections().toArray();
        collections = cols.map(c => c.name);
      }
    } catch (err) {
      console.error('Diagnostic error:', err);
    }

    return {
      status: 'ok',
      readyState: states[this.connection.readyState] || 'unknown',
      activeDatabase: activeDb,
      envDatabase: process.env.MONGO_DB || process.env.DB_NAME || 'not_set',
      collections: collections,
      timestamp: new Date().toISOString()
    };
  }
}
