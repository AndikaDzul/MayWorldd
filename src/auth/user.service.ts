// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async updateEmail(userId: string, email: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User tidak ditemukan');
    user.email = email;
    await user.save();
    return { message: 'Email updated', email: user.email };
  }

  async updatePassword(userId: string, password: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User tidak ditemukan');
    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();
    return { message: 'Password updated', email: user.email };
  }
}
