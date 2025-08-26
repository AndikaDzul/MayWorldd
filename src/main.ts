// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
// main.ts
const app = await NestFactory.create(AppModule);
app.enableCors({ origin: 'https://kulinerann.netlify.app' }); // atau origin: ['https://kulinerann.netlify.app']
await app.listen(process.env.PORT || 3000);

}
bootstrap();
