
const { spawn } = require('child_process');
const path = require('path');
const dotenv = require('dotenv');

// Load .env.local explicitly
dotenv.config({ path: path.join(__dirname, '../.env.local') });

console.log('Loaded environment variables from .env.local');
console.log('DATABASE_URL is set:', !!process.env.DATABASE_URL);

const cmd = 'npx';
const args = ['prisma', 'db', 'push'];

const child = spawn(cmd, args, {
    stdio: 'inherit',
    env: process.env // Pass the loaded env
});

child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
    process.exit(code);
});
