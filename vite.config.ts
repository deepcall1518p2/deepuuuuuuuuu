import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function assetSavePlugin(): Plugin {
  return {
    name: 'asset-save-plugin',
    configureServer(server) {
      // API to save photo to both public/photos and src/assets/photos
      server.middlewares.use('/api/save-photo', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const { index, dataUrl } = JSON.parse(body);
              const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
              const buffer = Buffer.from(base64Data, 'base64');
              
              const dir1 = path.resolve(__dirname, 'public/photos');
              const dir2 = path.resolve(__dirname, 'src/assets/photos');
              if (!fs.existsSync(dir1)) fs.mkdirSync(dir1, { recursive: true });
              if (!fs.existsSync(dir2)) fs.mkdirSync(dir2, { recursive: true });
              
              fs.writeFileSync(path.join(dir1, `photo${index}.jpg`), buffer);
              fs.writeFileSync(path.join(dir2, `photo${index}.jpg`), buffer);
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, path: `/photos/photo${index}.jpg` }));
            } catch (e) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: String(e) }));
            }
          });
        }
      });

      // API to save music
      server.middlewares.use('/api/save-music', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const { dataUrl } = JSON.parse(body);
              const base64Data = dataUrl.replace(/^data:audio\/\w+;base64,/, '');
              const buffer = Buffer.from(base64Data, 'base64');
              const dir = path.resolve(__dirname, 'public');
              if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
              fs.writeFileSync(path.join(dir, 'music.mp3'), buffer);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, path: '/music.mp3' }));
            } catch (e) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: String(e) }));
            }
          });
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    publicDir: path.resolve(__dirname, 'public'),
    plugins: [react(), tailwindcss(), assetSavePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
