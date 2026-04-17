import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media } from './schemas/media.schema';

@Injectable()
export class GalleryService {
  constructor(@InjectModel(Media.name) private mediaModel: Model<Media>) {}

  async findAll() {
    return this.mediaModel.find().sort({ createdAt: -1 }).exec();
  }

  async create(data: any) {
    const newMedia = new this.mediaModel(data);
    return newMedia.save();
  }

  async delete(id: string) {
    return this.mediaModel.findByIdAndDelete(id).exec();
  }
}
