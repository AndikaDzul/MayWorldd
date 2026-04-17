// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Atur limit request body lebih besar (100 MB untuk voice notes)
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

  // Izinkan CORS untuk semua origin sementara (bisa dibatasi ke frontend tertentu)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // 🔹 Akses Express langsung
  const expressApp = app.getHttpAdapter().getInstance();

  // ✨ Tambahkan route bot sederhana
  expressApp.post('/bot', (req: Request, res: Response) => {
    const { message } = req.body;
    console.log('Bot menerima pesan:', message);

    // Logika balasan sederhana
    let reply = 'Maaf, saya tidak mengerti.';
    if (message?.toLowerCase() === 'hai') reply = 'Halo juga!';
    else if (message?.toLowerCase() === 'helo') reply = 'Halo! Apa kabar?';

    res.json({ reply });
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); // ⬅️ biar bisa diakses via IP LAN

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
