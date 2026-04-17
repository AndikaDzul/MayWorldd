import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    return {
      status: 'ok',
      database: process.env.MONGO_DB || process.env.DB_NAME || 'not_set',
      timestamp: new Date().toISOString()
    };
  }
}
