// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Atur limit request body lebih besar (misal 10 MB)
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // Izinkan CORS untuk semua origin sementara (bisa dibatasi ke frontend tertentu)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); // ⬅️ penting: biar bisa diakses via IP LAN

  // Cari alamat LAN otomatis
  const networkInterfaces = os.networkInterfaces();
  const addresses: string[] = [];
  for (const iface of Object.values(networkInterfaces)) {
    if (!iface) continue;
    for (const config of iface) {
      if (config.family === 'IPv4' && !config.internal) {
        addresses.push(config.address);
      }
    }
  }

  console.log(`🚀 Server running on:`);
  console.log(`   Local:    http://localhost:${port}`);
  addresses.forEach((addr) => {
    console.log(`   Network:  http://${addr}:${port}`);
  });
}

bootstrap();
