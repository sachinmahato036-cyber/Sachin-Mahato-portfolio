import express from 'express';
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
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Serve static assets with appropriate caching
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
      // Don't cache index.html to ensure users always receive latest app version
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    }
  }));

  // Fallback for Single Page Application client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.status(503).send('Application is building. Please refresh in a moment.');
  });
}

const server = app.listen(port, host, () => {
  console.log(`[Cloud Run] Production server running on http://${host}:${port}`);
});

// Handle graceful shutdown for Cloud Run container lifecycle
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
