// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Import semua module yang digunakan
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { CartModule } from './cart/cart.module';
import { VoiceNotesModule } from './voice-notes/voice-notes.module';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [
    // 🔧 Load file .env secara global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 🔗 Koneksi MongoDB menggunakan .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        const dbName = configService.get<string>('MONGO_DB') || configService.get<string>('DB_NAME');

        if (!uri) {
          throw new Error('❌ MONGO_URI tidak ditemukan di file .env');
        }

        return {
          uri,
          dbName: dbName || undefined,
        };
      },
    }),

    // 📦 Import modul aplikasi
    OrderModule,
    AuthModule,
    ProfileModule,
    CartModule,
    VoiceNotesModule,
    GalleryModule,
  ],
})
export class AppModule {}
