// src/user/user.controller.ts
import { Controller, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('update-email')
  async updateEmail(@Body() body: { userId: string; email: string }) {
    return this.userService.updateEmail(body.userId, body.email);
  }

  @Put('update-password')
  async updatePassword(@Body() body: { userId: string; password: string }) {
    return this.userService.updatePassword(body.userId, body.password);
  }
}
