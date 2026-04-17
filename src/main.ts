// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';


export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Large payload limits (100 MB)
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const expressApp = app.getHttpAdapter().getInstance();

  expressApp.post('/bot', (req: Request, res: Response) => {
    const { message } = req.body;
    let reply = 'Maaf, saya tidak mengerti.';
    if (message?.toLowerCase() === 'hai') reply = 'Halo juga!';
    else if (message?.toLowerCase() === 'helo') reply = 'Halo! Apa kabar?';
    res.json({ reply });
  });

  const port = process.env.PORT || 3000;
  
  // Hanya jalankan listen jika tidak di Vercel
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(port, '0.0.0.0');
    console.log(`🚀 Server running on http://localhost:${port}`);
  } else {
    // WAJIB: Inisialisasi app agar route terdaftar di Vercel
    await app.init();
  }

  return app.getHttpAdapter().getInstance(); // Export for Vercel
}

// Hanya bootstrap otomatis jika dijalankan langsung (node)
if (require.main === module) {
  bootstrap();
}
