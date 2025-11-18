// src/profile/profile.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './profile.schema';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) {}

  async create(data: any): Promise<Profile> {
    const profile = new this.profileModel(data);
    return profile.save();
  }

  async findAll(): Promise<Profile[]> {
    return this.profileModel.find().exec();
  }
}
