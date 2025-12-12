
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const prisma = new PrismaClient();

async function main() {
    const sqlPath = path.join(__dirname, '../prisma/rls_policies.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Split by semicolon to run statements individually if needed, 
    // currently Prisma $executeRawUnsafe can handle multiple statements in some drivers,
    // but splitting is safer for strict policies.
    const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    console.log(`Found ${statements.length} SQL statements to execute.`);

    for (const statement of statements) {
        try {
            await prisma.$executeRawUnsafe(statement);
            console.log('Executed successfully: ' + statement.substring(0, 50) + '...');
        } catch (e) {
            console.error('Error executing statement:', statement.substring(0, 50) + '...', e);
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
