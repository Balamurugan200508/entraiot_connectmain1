/**
 * Entraiot Connect — Unified Production Server
 *
 * Routes
 * ──────
 *   /                 → redirects to /portfolio
 *   /portfolio/*      → Stage 1  — pre-built Three.js/React static site
 *   /way/*            → Stage 2  — Next.js 16 bike scrollytelling (standalone)
 *   /buildings/*      → Stage 3  — Vite 3D buildings (built dist/)
 *   /api/health       → JSON health-check
 *
 * Start (production)
 * ──────────────────
 *   npm install
 *   NODE_ENV=production node server.js
 */

'use strict';

const express  = require('express');
const path     = require('path');
const fs       = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app  = express();
const PORT = process.env.PORT || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

// ─── Register extra MIME types ─────────────────────────────────────────────
express.static.mime.define({ 'model/gltf-binary': ['glb'] });
express.static.mime.define({ 'model/gltf+json':   ['gltf'] });
express.static.mime.define({ 'audio/mp4':         ['m4a']  });
express.static.mime.define({ 'font/woff2':        ['woff2'] });
express.static.mime.define({ 'image/webp':        ['webp'] });

// ─── Security + CORS headers ──────────────────────────────────────────────
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ─── Helpers ──────────────────────────────────────────────────────────────
function staticOpts(noCache = false) {
  return {
    setHeaders(res, filePath) {
      if (noCache || filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      }
      
      // Handle Brotli compressed Unity WebGL files
      if (filePath.endsWith('.br')) {
        if (filePath.endsWith('.wasm.br')) {
          res.setHeader('Content-Encoding', 'br');
          res.setHeader('Content-Type', 'application/wasm');
        } else if (filePath.endsWith('.js.br')) {
          // Do not send Content-Encoding: br because the JS framework file is uncompressed raw text
          res.setHeader('Content-Type', 'application/javascript');
        } else if (filePath.endsWith('.data.br')) {
          // Do not send Content-Encoding: br because the data file is an uncompressed UnityWebData archive
          res.setHeader('Content-Type', 'application/octet-stream');
        }
      }
    }
  };
}

function spaFallback(dir, indexName = 'index.html') {
  return (req, res, next) => {
    const indexPath = path.join(dir, indexName);
    if (fs.existsSync(indexPath)) return res.sendFile(indexPath);
    next();
  };
}

// ─── Health check ─────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    stages: {
      stage1: '/portfolio  — static Three.js portfolio',
      stage2: '/way        — Next.js bike scrollytelling',
      stage3: '/buildings  — Vite 3D buildings',
      management: '/management — React Management Workspace',
      marketing: '/marketing — React Marketing Workspace',
      technical: '/technical — React Technical Workspace',
      financial: '/financial — React Financial Workspace',
      clienthandling: '/client-handling — React Client Handling Workspace',
      developer: '/entraiot-developer — React Developer Workspace',
      developer2: '/entraiot-developer-2 — React Developer 2 Workspace',
    }
  });
});

// ─── File Debug Route ─────────────────────────────────────────────────────
app.get('/api/files', (req, res) => {
  function getFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return [`${dir} does not exist`];
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const name = path.join(dir, file);
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, fileList);
      } else {
        fileList.push(name.replace(__dirname, ''));
      }
    });
    return fileList;
  }
  res.json({
    root: fs.readdirSync(__dirname),
    dist: fs.existsSync(path.join(__dirname, 'dist-vercel')) ? fs.readdirSync(path.join(__dirname, 'dist-vercel')) : 'missing',
    all_files: getFiles(path.join(__dirname, 'dist-vercel')).slice(0, 100) // first 100 files
  });
});

const STAGE1_DIR = path.resolve(__dirname, 'dist-vercel', 'portfolio');
const STAGE2_DIR = path.resolve(__dirname, 'dist-vercel', 'way');
const STAGE3_DIR = path.resolve(__dirname, 'dist-vercel', 'buildings');
const MANAGEMENT_DIR = path.resolve(__dirname, 'dist-vercel', 'management');
const MARKETING_DIR = path.resolve(__dirname, 'dist-vercel', 'marketing');
const TECHNICAL_DIR = path.resolve(__dirname, 'dist-vercel', 'technical');
const FINANCIAL_DIR = path.resolve(__dirname, 'dist-vercel', 'financial');
const CLIENT_HANDLING_DIR = path.resolve(__dirname, 'dist-vercel', 'client-handling');
const NON_ANIMATED_DIR = fs.existsSync(path.resolve(__dirname, 'dist-vercel', 'non-animated'))
  ? path.resolve(__dirname, 'dist-vercel', 'non-animated')
  : path.resolve(__dirname, 'non-animated-main', 'non-animated-main');
const ENTRAIOT_CEO_DIR = fs.existsSync(path.resolve(__dirname, 'dist-vercel', 'entraiot-ceo'))
  ? path.resolve(__dirname, 'dist-vercel', 'entraiot-ceo')
  : path.resolve(__dirname, 'entraiot-ceo-main', 'entraiot-ceo-main', 'dist');
const ENTRAIOT_MD_DIR = fs.existsSync(path.resolve(__dirname, 'dist-vercel', 'entraiot-md'))
  ? path.resolve(__dirname, 'dist-vercel', 'entraiot-md')
  : path.resolve(__dirname, 'entraiot MD', 'dist');
const ENTRAIOT_DEVELOPER_DIR = fs.existsSync(path.resolve(__dirname, 'dist-vercel', 'entraiot-developer'))
  ? path.resolve(__dirname, 'dist-vercel', 'entraiot-developer')
  : path.resolve(__dirname, 'Entraiot developer', 'dist');
const ENTRAIOT_DEVELOPER_2_DIR = fs.existsSync(path.resolve(__dirname, 'dist-vercel', 'entraiot-developer-2'))
  ? path.resolve(__dirname, 'dist-vercel', 'entraiot-developer-2')
  : path.resolve(__dirname, 'Entraiot developer 2', 'dist');

// ─── Static Routes (Move to top) ──────────────────────────────────────────
app.use('/portfolio', express.static(STAGE1_DIR, staticOpts(true)));
app.use('/way', express.static(STAGE2_DIR, staticOpts(true)));
app.use('/buildings', express.static(STAGE3_DIR, staticOpts(true)));
app.use('/management', express.static(MANAGEMENT_DIR, staticOpts(true)));
app.use('/marketing', express.static(MARKETING_DIR, staticOpts(true)));
app.use('/technical', express.static(TECHNICAL_DIR, staticOpts(true)));
app.use('/financial', express.static(FINANCIAL_DIR, staticOpts(true)));
app.use('/client-handling', express.static(CLIENT_HANDLING_DIR, staticOpts(true)));
app.use('/entraiot-ceo-main', express.static(ENTRAIOT_CEO_DIR, staticOpts(true)));
app.use('/entraiot-ceo', express.static(ENTRAIOT_CEO_DIR, staticOpts(true)));
app.use('/entraiot-md-main', express.static(ENTRAIOT_MD_DIR, staticOpts(true)));
app.use('/entraiot-md', express.static(ENTRAIOT_MD_DIR, staticOpts(true)));
app.use('/entraiot-developer', express.static(ENTRAIOT_DEVELOPER_DIR, staticOpts(true)));
app.use('/entraiot-developer-2', express.static(ENTRAIOT_DEVELOPER_2_DIR, staticOpts(true)));

// Serve non-animated static pages and its dedicated asset directories
app.use('/non-animated', express.static(NON_ANIMATED_DIR, staticOpts(true)));
app.use('/non-animated-main', express.static(NON_ANIMATED_DIR, staticOpts(true)));
app.use('/custom-icons', express.static(path.join(NON_ANIMATED_DIR, 'custom-icons'), staticOpts(true)));
app.use('/data', express.static(path.join(NON_ANIMATED_DIR, 'data'), staticOpts(true)));
app.use('/fonts', express.static(path.join(NON_ANIMATED_DIR, 'fonts'), staticOpts(true)));
app.use('/points', express.static(path.join(NON_ANIMATED_DIR, 'points'), staticOpts(true)));
app.use('/ribbons', express.static(path.join(NON_ANIMATED_DIR, 'ribbons'), staticOpts(true)));
app.use('/unity', express.static(path.join(NON_ANIMATED_DIR, 'unity'), staticOpts(true)));

// Shared static directories (Express will fall through to NON_ANIMATED_DIR if not found in Stage 1)
app.use('/assets', express.static(path.join(STAGE1_DIR, 'assets'), staticOpts(true)));
app.use('/assets', express.static(path.join(NON_ANIMATED_DIR, 'assets'), staticOpts(true)));
app.use('/assets', express.static(path.join(ENTRAIOT_CEO_DIR, 'assets'), staticOpts(true)));
app.use('/assets', express.static(path.join(ENTRAIOT_MD_DIR, 'assets'), staticOpts(true)));
app.use('/frames_jpg', express.static(path.join(ENTRAIOT_CEO_DIR, 'frames_jpg'), staticOpts(true)));
app.use('/walk', express.static(path.join(ENTRAIOT_CEO_DIR, 'walk'), staticOpts(true)));
app.use('/images', express.static(path.join(ENTRAIOT_CEO_DIR, 'images'), staticOpts(true)));

// ─── SPA Fallbacks ────────────────────────────────────────────────────────
app.get('/portfolio/*', spaFallback(STAGE1_DIR));
app.get('/way/*', spaFallback(STAGE2_DIR));
app.get('/buildings/*', spaFallback(STAGE3_DIR));
app.get('/management/*', spaFallback(MANAGEMENT_DIR));
app.get('/marketing/*', spaFallback(MARKETING_DIR));
app.get('/technical/*', spaFallback(TECHNICAL_DIR));
app.get('/financial/*', spaFallback(FINANCIAL_DIR));
app.get('/client-handling/*', spaFallback(CLIENT_HANDLING_DIR));
app.get('/non-animated/*', spaFallback(NON_ANIMATED_DIR));
app.get('/non-animated-main/*', spaFallback(NON_ANIMATED_DIR));
app.get('/entraiot-ceo-main/*', spaFallback(ENTRAIOT_CEO_DIR));
app.get('/entraiot-ceo/*', spaFallback(ENTRAIOT_CEO_DIR));
app.get('/entraiot-md-main/*', spaFallback(ENTRAIOT_MD_DIR));
app.get('/entraiot-md/*', spaFallback(ENTRAIOT_MD_DIR));
app.get('/entraiot-developer/*', spaFallback(ENTRAIOT_DEVELOPER_DIR));
app.get('/entraiot-developer-2/*', spaFallback(ENTRAIOT_DEVELOPER_2_DIR));

// ─── Root ─────────────────────────────────────────────────────────────────
app.get('/', (_req, res) => res.redirect('/way'));
app.get('/way', (req, res) => res.sendFile(path.join(STAGE2_DIR, 'index.html')));

console.log('----------------------------------------------------');
console.log('SERVER STARTING...');
console.log('CWD:', process.cwd());
console.log('DIRNAME:', __dirname);
console.log('Files in root:', fs.readdirSync(__dirname));
console.log('STAGE1_DIR:', STAGE1_DIR, 'Exists:', fs.existsSync(STAGE1_DIR));
console.log('STAGE2_DIR:', STAGE2_DIR, 'Exists:', fs.existsSync(STAGE2_DIR));
console.log('STAGE3_DIR:', STAGE3_DIR, 'Exists:', fs.existsSync(STAGE3_DIR));

// Deep check for index.html
if (fs.existsSync(STAGE2_DIR)) {
  const indexPath = path.join(STAGE2_DIR, 'index.html');
  console.log('STAGE2 index.html Exists:', fs.existsSync(indexPath));
}

console.log('----------------------------------------------------');

// ─── Global Static Fallback ───────────────────────────────────────────────
if (fs.existsSync(STAGE3_DIR)) {
  app.use(express.static(STAGE3_DIR, staticOpts(true)));
}
app.use(express.static(STAGE1_DIR, staticOpts(true)));
app.use(express.static(ENTRAIOT_CEO_DIR, staticOpts(true)));
app.use(express.static(ENTRAIOT_MD_DIR, staticOpts(true)));

// ─── 404 ──────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    available: ['/portfolio', '/way', '/buildings', '/api/health'],
  });
});

// ─── Boot ─────────────────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('[server error]', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log('\n🚀  Entraiot Connect — Unified Server');
  console.log(`    http://localhost:${PORT}/portfolio     Stage 1 — 3D Portfolio`);
  console.log(`    http://localhost:${PORT}/way           Stage 2 — Bike Scrollytelling`);
  console.log(`    http://localhost:${PORT}/buildings     Stage 3 — 3D Buildings`);
  console.log(`    http://localhost:${PORT}/management    Management Workspace`);
  console.log(`    http://localhost:${PORT}/marketing     Marketing Workspace`);
  console.log(`    http://localhost:${PORT}/technical     Technical Workspace`);
  console.log(`    http://localhost:${PORT}/financial     Financial Workspace`);
  console.log(`    http://localhost:${PORT}/client-handling Client Handling Workspace`);
  console.log(`    http://localhost:${PORT}/entraiot-developer Entraiot Developer Workspace`);
  console.log(`    http://localhost:${PORT}/entraiot-developer-2 Entraiot Developer 2 Workspace`);
  console.log(`    http://localhost:${PORT}/non-animated  Non-Animated Workspace`);
  console.log(`    http://localhost:${PORT}/api/health    Health check`);
  console.log(`    Mode: ${IS_PROD ? 'production' : 'development'}\n`);
});
