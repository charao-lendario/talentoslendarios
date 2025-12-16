
import { PrismaClient, UserRole } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const prisma = new PrismaClient();

// Hardcoded UUIDs for consistency
const JOB_IDS = [
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
];

const TALENT_UUIDS = [
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'cccccccc-cccc-cccc-cccc-cccccccccccc'
];

const INITIAL_JOBS = [
    {
        id: JOB_IDS[0],
        title: 'Engenheiro de Prompt Sr',
        mission: 'Criar a biblioteca de prompts mais eficiente do mercado.',
        responsibilities: '- Desenvolver metaprompts\n- Otimizar contexto\n- Documentar padrões',
        successIndicator: 'Redução de 30% no tempo de resposta da IA.',
        okr: 'O: Dominar a engenharia de prompt. KR: 100 prompts validados.',
        status: 'active',
        type: 'Remoto',
        location: 'Brasil'
    },
    {
        id: JOB_IDS[1],
        title: 'Product Designer (IA)',
        mission: 'Desenhar interfaces que tornem a IA invisível e mágica.',
        responsibilities: '- Prototipar fluxos de chat\n- Criar sistema de design\n- Realizar testes de usabilidade',
        successIndicator: 'NPS de 90+ na nova feature de chat.',
        okr: 'O: UX de classe mundial. KR: Tempo de tarefa reduzido em 50%.',
        status: 'active',
        type: 'Remoto',
        location: 'Brasil'
    },
];

const MOCK_TALENTS = [
    {
        uuid: TALENT_UUIDS[0],
        name: 'Nilson Silva',
        role: 'Especialista em Agentes IA, Automação N8N',
        email: 'nilson.silva@example.com',
        phone: '(11) 99999-9999',
        location: 'São Paulo, SP',
        bio: 'Olá! Sou especialista em Inteligência Artificial, automação de processos e estratégias de marketing digital...',
        products: ['Formação', 'Gestor IA'],
        areas: ['Produto', 'Performance'],
        seniority: 'Pleno',
        fixedSalary: '800000', // storing as cents string or just string? Schema says String for hourlyRate, checking fixedSalary mapping.
        // Wait, schema has 'hourlyRate' but form has 'fixedSalary'. I will map fixedSalary to hourlyRate or handle it.
        // Schema: hourlyRate String?
        avatar: 'https://i.pravatar.cc/150?u=nilson',
        tags: ['Agentes IA', 'Prompts', 'Automação']
    },
    {
        uuid: TALENT_UUIDS[1],
        name: 'Ana Clara',
        role: 'Engenharia de Dados, Python Backend',
        email: 'ana.clara@example.com',
        phone: '(48) 98888-8888',
        location: 'Florianópolis, SC',
        bio: 'Focada em estruturar data lakes para LLMs e pipelines de RAG.',
        products: ['Formação', 'Comunidade'],
        areas: ['Produto', 'Backoffice'],
        seniority: 'Sênior',
        fixedSalary: '1200000',
        avatar: 'https://i.pravatar.cc/150?u=ana',
        tags: ['Python', 'SQL', 'Data Engineering']
    },
    {
        uuid: TALENT_UUIDS[2],
        name: 'Carlos Mendes',
        role: 'Copywriter & Prompt Designer',
        email: 'carlos.m@example.com',
        phone: '(21) 97777-7777',
        location: 'Rio de Janeiro, RJ',
        bio: 'Copywriter sênior migrando para IA...',
        products: ['80/20', 'Mente Lendária'],
        areas: ['Marketing', 'Comercial'],
        seniority: 'Sênior',
        fixedSalary: '1000000',
        avatar: 'https://i.pravatar.cc/150?u=carlos',
        tags: ['Copywriting', 'Storytelling', 'Prompting']
    }
];

async function main() {
    console.log('Seeding Jobs...');
    for (const job of INITIAL_JOBS) {
        await prisma.job.upsert({
            where: { id: job.id },
            update: {},
            create: {
                id: job.id,
                title: job.title,
                mission: job.mission,
                responsibilities: job.responsibilities,
                successIndicator: job.successIndicator,
                okr: job.okr,
                status: 'active',
                type: job.type,
                location: job.location
            }
        });
    }

    console.log('Seeding Talents...');
    for (const talent of MOCK_TALENTS) {
        // 1. Upsert Profile
        await prisma.profile.upsert({
            where: { id: talent.uuid },
            update: {},
            create: {
                id: talent.uuid,
                email: talent.email,
                fullName: talent.name,
                avatarUrl: talent.avatar,
                role: 'talent'
            }
        });

        // 2. Upsert Talent
        // Need to parse location 'São Paulo, SP' -> City: São Paulo, State: SP
        const [city, state] = talent.location.split(',').map(s => s.trim());

        await prisma.talent.upsert({
            where: { id: talent.uuid },
            update: {},
            create: {
                id: talent.uuid,
                phone: talent.phone,
                locationCity: city,
                locationState: state,
                bio: talent.bio,
                hourlyRate: talent.fixedSalary, // Temporary mapping to hourly_rate field for now
                tags: talent.tags,
                isVerified: true
                // Note: academyProduct, courseLevel, etc can be filled if we have specific mock data mapping
            }
        });
    }

    console.log('Seed completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
