import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const host = '0.0.0.0';

const distPath = path.join(__dirname, 'dist');

// Health check endpoint for Cloud Run and load balancers
app.get('/healthz', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

// Video upload endpoint for persistent video storage
app.post('/api/upload-video', express.raw({ type: '*/*', limit: '150mb' }), (req: Request, res: Response) => {
  try {
    const publicDir = path.join(__dirname, 'public');
    const distDir = path.join(__dirname, 'dist');
    const srcVideosDir = path.join(__dirname, 'src', 'assets', 'videos');
    
    fs.mkdirSync(publicDir, { recursive: true });
    fs.mkdirSync(distDir, { recursive: true });
    fs.mkdirSync(srcVideosDir, { recursive: true });

    const buffer = Buffer.isBuffer(req.body) ? req.body : Buffer.from(req.body);
    fs.writeFileSync(path.join(publicDir, 'hero.mp4'), buffer);
    fs.writeFileSync(path.join(distDir, 'hero.mp4'), buffer);
    fs.writeFileSync(path.join(srcVideosDir, 'hero.mp4'), buffer);

    res.json({ success: true, url: '/hero.mp4' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve static assets with appropriate caching
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    }
  }));

  // Fallback for Single Page Application client-side routing
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (req: Request, res: Response) => {
    res.status(503).send('Application is building. Please refresh in a moment.');
  });
}

const server = app.listen(port, host, () => {
  console.log(`[Cloud Run] Production server running on http://${host}:${port}`);
});

process.on('SIGTERM', () => {
  console.log('[Cloud Run] SIGTERM received. Closing HTTP server gracefully...');
  server.close(() => {
    console.log('[Cloud Run] HTTP server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('[Cloud Run] SIGINT received. Closing HTTP server...');
  server.close(() => {
    process.exit(0);
  });
});
