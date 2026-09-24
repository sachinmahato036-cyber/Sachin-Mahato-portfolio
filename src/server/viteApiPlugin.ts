import type { Plugin } from 'vite';
import { handleGenerateVideo, handleVideoStatus, handleVideoDownload } from './videoApi';

export function viteApiPlugin(): Plugin {
  return {
    name: 'veo-video-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url = req.url || '';

        if (!url.startsWith('/api/')) {
          return next();
        }

        // Parse JSON body for POST requests
        let body: any = {};
        if (req.method === 'POST') {
          try {
            const buffers: Buffer[] = [];
            for await (const chunk of req) {
              buffers.push(chunk);
            }
            const rawBody = Buffer.concat(buffers).toString('utf-8');
            if (rawBody) {
              body = JSON.parse(rawBody);
            }
          } catch (e) {
            console.error('Failed to parse request JSON body:', e);
          }
        }
        req.body = body;

        // Add Express-like res.json and res.status helper if missing
        if (!res.status) {
          res.status = (code: number) => {
            res.statusCode = code;
            return res;
          };
        }
        if (!res.json) {
          res.json = (data: any) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return res;
          };
        }
        if (!res.send) {
          res.send = (data: any) => {
            res.end(data);
            return res;
          };
        }

        if (url === '/api/generate-video' && req.method === 'POST') {
          return handleGenerateVideo(req, res);
        }

        if (url === '/api/video-status' && req.method === 'POST') {
          return handleVideoStatus(req, res);
        }

        if (url === '/api/video-download' && req.method === 'POST') {
          return handleVideoDownload(req, res);
        }

        next();
      });
    },
  };
}
