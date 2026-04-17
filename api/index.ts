import { bootstrap } from '../src/main';
import * as bodyParser from 'body-parser';

let cachedApp: any;

export default async (req: any, res: any) => {
  // 1. Handle CORS Preflight manually for Vercel
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Initialize App
  if (!cachedApp) {
    try {
      cachedApp = await bootstrap();
    } catch (err) {
      console.error('❌ Vercel Bootstrap Error:', err);
      return res.status(500).json({ error: 'Failed to initialize backend', details: err.message });
    }
  }

  // 3. Delegate to NestJS
  return cachedApp(req, res);
};
