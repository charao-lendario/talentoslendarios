
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Updating talents data...');

    // 1. Update Nilson Silva
    // Find Profile first
    const nilson = await prisma.profiles.findFirst({
        where: { full_name: 'Nilson Silva' }
    });

    if (nilson) {
        await prisma.talents.update({
            where: { id: nilson.id },
            data: { hourly_rate: '8000' }
        });
        console.log('Updated Nilson Silva salary.');
    } else {
        console.log('Nilson Silva not found.');
    }

    // 2. Update Ana Clara -> Vitor Silva
    const anaClara = await prisma.profiles.findFirst({
        where: { full_name: 'Ana Clara' }
    });

    if (anaClara) {
        // Update Profile
        await prisma.profiles.update({
            where: { id: anaClara.id },
            data: {
                full_name: 'Vitor Silva',
                email: 'vitor.silva@example.com', // innovative guess to avoid conflict
                avatar_url: 'https://i.pravatar.cc/150?u=vitor'
            }
        });
        // Update Talent
        await prisma.talents.update({
            where: { id: anaClara.id },
            data: {
                hourly_rate: '12000',
                bio: 'Focado em estruturar data lakes para LLMs e pipelines de RAG.'
            }
        });
        console.log('Updated Ana Clara -> Vitor Silva.');
    } else {
        console.log('Ana Clara not found (maybe already updated).');
    }

    // 3. Update Carlos Mendes -> Ana Marques
    const carlos = await prisma.profiles.findFirst({
        where: { full_name: 'Carlos Mendes' }
    });

    if (carlos) {
        // Update Profile
        await prisma.profiles.update({
            where: { id: carlos.id },
            data: {
                full_name: 'Ana Marques',
                email: 'ana.marques@example.com',
                avatar_url: 'https://i.pravatar.cc/150?u=ana'
            }
        });
        // Update Talent
        await prisma.talents.update({
            where: { id: carlos.id },
            data: {
                hourly_rate: '10000',
                bio: 'Copywriter sênior migrando para IA. Cria personas complexas e fluxos de conversa naturais.'
            }
        });
        console.log('Updated Carlos Mendes -> Ana Marques.');
    } else {
        console.log('Carlos Mendes not found (maybe already updated).');
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
