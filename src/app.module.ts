// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Import semua module yang digunakan
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    // 🔧 Load file .env secara global agar bisa diakses dari seluruh project
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 🔗 Koneksi MongoDB pakai konfigurasi dari .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        const dbName = configService.get<string>('MONGO_DB');

        if (!uri) {
          throw new Error('❌ MONGO_URI tidak ditemukan di file .env');
        }

        return {
          uri,
          dbName: dbName || undefined, // optional
        };
      },
    }),

    // 📦 Import semua module utama aplikasi
    OrderModule,   // Modul untuk pesanan
    AuthModule,    // Modul autentikasi
    ProfileModule, // Modul profil pengguna
    CartModule,    // Modul keranjang belanja
  ],
})
export class AppModule {}
