const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function copyDir(src, dest) {
    console.log(`[Copy] ${src} -> ${dest}`);
    if (!fs.existsSync(src)) {
        console.warn(`[Warning] Source does not exist: ${src}`);
        return;
    }
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

console.log('--- STARTING UNIFIED CROSS-PLATFORM BUILD ---');
const distDir = path.join(__dirname, 'dist-vercel');

if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

const buildTargets = [
    { name: 'Stage 2 (way)', dir: 'stage2', outDir: 'stage2/out', destName: 'way' },
    { name: 'Stage 3 (buildings)', dir: 'stage3', outDir: 'stage3/dist', destName: 'buildings' },
    { name: 'Management Workspace', dir: 'management workspace', outDir: 'management workspace/dist', destName: 'management' },
    { name: 'Marketing Workspace', dir: 'marketing workspace', outDir: 'marketing workspace/dist', destName: 'marketing' },
    { name: 'Technical Workspace', dir: 'technical workspace', outDir: 'technical workspace/dist', destName: 'technical' },
    { name: 'Financial Workspace', dir: 'financial workspace', outDir: 'financial workspace/dist', destName: 'financial' },
    { name: 'Client Handling Workspace', dir: 'client handling workspace', outDir: 'client handling workspace/dist', destName: 'client-handling' },
    { name: 'CEO Workspace', dir: 'entraiot-ceo-main/entraiot-ceo-main', outDir: 'entraiot-ceo-main/entraiot-ceo-main/dist', destName: 'entraiot-ceo' },
    { name: 'MD Workspace', dir: 'entraiot MD', outDir: 'entraiot MD/dist', destName: 'entraiot-md' },
    { name: 'Developer Workspace', dir: 'Entraiot developer', outDir: 'Entraiot developer/dist', destName: 'entraiot-developer' },
    { name: 'Developer 2 Workspace', dir: 'Entraiot developer 2', outDir: 'Entraiot developer 2/dist', destName: 'entraiot-developer-2' }
];

// Copy Stage 1 (portfolio) which is static
console.log('Copying Stage 1 (portfolio)...');
copyDir(path.join(__dirname, 'stage1'), path.join(distDir, 'portfolio'));

// Copy non-animated workspace (static)
console.log('Copying non-animated workspace...');
copyDir(path.join(__dirname, 'non-animated-main', 'non-animated-main'), path.join(distDir, 'non-animated'));

for (const target of buildTargets) {
    console.log(`\nBuilding ${target.name}...`);
    try {
        execSync(`npm install`, { cwd: path.join(__dirname, target.dir), stdio: 'inherit' });
        execSync(`npm run build`, { cwd: path.join(__dirname, target.dir), stdio: 'inherit' });
        
        const outPath = path.join(__dirname, target.outDir);
        if (fs.existsSync(outPath)) {
            copyDir(outPath, path.join(distDir, target.destName));
        } else {
            console.warn(`[Warning] Build output directory not found for ${target.name}: ${outPath}`);
        }
    } catch (e) {
        console.error(`[Error] Build failed for ${target.name}:`, e.message);
        process.exit(1);
    }
}

// Merge all workspace assets into the shared portfolio/assets directory for Vercel
console.log('\nMerging all workspace assets for Vercel...');
const srcDirs = [
    'non-animated',
    'management',
    'marketing',
    'technical',
    'financial',
    'client-handling',
    'entraiot-ceo',
    'entraiot-md',
    'entraiot-developer',
    'entraiot-developer-2'
];

function copyDirFiles(src, dest) {
    if (!fs.existsSync(src)) return;
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const files = fs.readdirSync(src);
    for (const file of files) {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        if (fs.statSync(srcPath).isFile()) {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

const vercelPortfolioAssets = path.join(distDir, 'portfolio', 'assets');
const stage1Assets = path.join(__dirname, 'stage1', 'assets');
const stage2PublicAssets = path.join(__dirname, 'stage2', 'public', 'assets');

for (const dir of srcDirs) {
    const assetsSrc = path.join(distDir, dir, 'assets');
    if (fs.existsSync(assetsSrc)) {
        copyDirFiles(assetsSrc, vercelPortfolioAssets);
        copyDirFiles(assetsSrc, stage1Assets);
        copyDirFiles(assetsSrc, stage2PublicAssets);
    }
}

// Copy non-animated static assets folder directly
const nonAnimatedAssetsSrc = path.join(__dirname, 'non-animated-main', 'non-animated-main', 'assets');
if (fs.existsSync(nonAnimatedAssetsSrc)) {
    copyDirFiles(nonAnimatedAssetsSrc, vercelPortfolioAssets);
    copyDirFiles(nonAnimatedAssetsSrc, stage1Assets);
    copyDirFiles(nonAnimatedAssetsSrc, stage2PublicAssets);
}

console.log('\n--- BUILD SUCCESSFUL ---');
