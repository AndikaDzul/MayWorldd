import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  async getGallery() {
    return this.galleryService.findAll();
  }

  @Post()
  async addMedia(@Body() data: any) {
    return this.galleryService.create(data);
  }

  @Delete(':id')
  async deleteMedia(@Param('id') id: string) {
    return this.galleryService.delete(id);
  }
}
