// src/profile/profile.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async create(@Body() body: any) {
    return this.profileService.create(body);
  }

  @Get()
  async findAll() {
    return this.profileService.findAll();
  }
}
