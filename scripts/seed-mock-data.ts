
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const prisma = new PrismaClient();

// Helper to generate UUIDs consistent for repetitive runs if needed, 
// but here we will generate random ones or fixed ones for the first few to keep existing demos working.
const generateId = () => crypto.randomUUID();

const JOBS_DATA = [
    {
        title: 'Engenheiro de Prompt Sr',
        mission: 'Criar a biblioteca de prompts mais eficiente do mercado para escalar operações.',
        responsibilities: '- Desenvolver metaprompts complexos\n- Otimizar contexto de LLMs\n- Documentar padrões de engenharia\n- Treinar time em prompting',
        successIndicator: 'Redução de 30% no tempo de resposta da IA e aumento de precisão para 95%.',
        okr: 'O: Dominar a engenharia de prompt. KR1: 100 prompts validados em produção.',
        status: 'active',
        type: 'Remoto',
        location: 'Brasil'
    },
    {
        title: 'Product Designer (IA)',
        mission: 'Desenhar interfaces que tornem a IA invisível e mágica para o usuário final.',
        responsibilities: '- Prototipar fluxos de chat conversacional\n- Criar sistema de design para AI agêntica\n- Realizar testes de usabilidade com protótipos funcionais',
        successIndicator: 'NPS de 90+ na nova feature de chat e redução de fricção no onboarding.',
        okr: 'O: UX de classe mundial. KR1: Tempo de tarefa reduzido em 50%.',
        status: 'active',
        type: 'Remoto',
        location: 'Brasil'
    },
    {
        title: 'Especialista em Automação (Make/N8N)',
        mission: 'Automatizar processos manuais repetitivos integrando CRMs, IA e ferramentas de marketing.',
        responsibilities: '- Criar cenários complexos no N8N\n- Integrar OpenAI API com bancos de dados\n- Monitorar falhas e custos de execução',
        successIndicator: 'Economia de 100 horas/homem por mês em tarefas operacionais.',
        okr: 'O: Eficiência Operacional Extrema. KR1: 5 processos core 100% automatizados.',
        status: 'active',
        type: 'Remoto',
        location: 'São Paulo, SP'
    },
    {
        title: 'Copywriter Specialist (Direct Response + AI)',
        mission: 'Escrever cartas de vendas e VSLs que convertem, potencializados por IA para velocidade.',
        responsibilities: '- Escrever scripts de VSL\n- Criar sequências de email marketing\n- Treinar IA com a voz da marca',
        successIndicator: 'Aumento de 20% na taxa de conversão do funil principal.',
        okr: 'O: Recorde de faturamento. KR1: R$ 1MM em vendas no próximo lançamento.',
        status: 'active',
        type: 'Remoto',
        location: 'Brasil'
    },
    {
        title: 'Desenvolvedor Fullstack (Python/React)',
        mission: 'Construir a plataforma de ensino voltada para IA da Academia Lendária.',
        responsibilities: '- Desenvolver frontend em Next.js\n- Criar APIs em FastAPI/Python\n- Integrar serviços de LLM via LangChain',
        successIndicator: 'Zero downtime crítico e carregamento de páginas < 1s.',
        okr: 'O: Plataforma Robusta. KR1: Lançar módulo de comunidade integrado.',
        status: 'active',
        type: 'Remoto',
        location: 'Florianópolis, SC'
    },
    {
        title: 'Head de Growth Hacking',
        mission: 'Acelerar a aquisição de novos alunos utilizando estratégias não convencionais e IA.',
        responsibilities: '- Gerir tráfego pago\n- Otimizar SEO programático com IA\n- Criar viral loops no produto',
        successIndicator: 'Crescimento de 15% WoW na base de leads qualificados.',
        okr: 'O: Hipercrescimento. KR1: 10.000 novos leads/mês.',
        status: 'active',
        type: 'Híbrido',
        location: 'São Paulo, SP'
    },
    {
        title: 'Customer Success Manager (B2B)',
        mission: 'Garantir que empresas parceiras extraiam valor máximo das nossas consultorias de IA.',
        responsibilities: '- Onboarding de novos clientes\n- Resolução de dúvidas técnicas de IA\n- Upsell de mentorias',
        successIndicator: 'Churn negativo (Net Revenue Retention > 110%).',
        okr: 'O: Cliente Apaixonado. KR1: NPS 85+.',
        status: 'active',
        type: 'Remoto',
        location: 'Brasil'
    },
    {
        title: 'Editor de Vídeo & Motion (AI Tools)',
        mission: 'Produzir conteúdo visual de alto impacto em escala usando ferramentas de IA.',
        responsibilities: '- Edição de cortes para redes sociais\n- Geração de assets visuais com Midjourney\n- Clonagem de voz para tradução de conteúdo',
        successIndicator: 'Dobrar o engajamento no Instagram e TikTok.',
        okr: 'O: Domínio da Atenção. KR1: 5 vídeos virais (>100k views) no trimestre.',
        status: 'draft',
        type: 'Remoto',
        location: 'Brasil'
    },
    {
        title: 'Data Scientist (Foco em LLMs)',
        mission: 'Afinar modelos de linguagem para casos de uso específicos da educação.',
        responsibilities: '- Fine-tuning de modelos Open Source (Llama 3, Mistral)\n- Criação de Datasets de qualidade\n- Avaliação de performance de RAG',
        successIndicator: 'Redução de alucinações da IA para < 5%.',
        okr: 'O: IA Soberana. KR1: Deploy de modelo proprietário para correção de exercícios.',
        status: 'paused',
        type: 'Remoto',
        location: 'Remoto'
    },
    {
        title: 'Comunity Manager',
        mission: 'Engajar a comunidade de alunos tornando-a o lugar mais vibrante sobre IA no Brasil.',
        responsibilities: '- Moderação de Discord\n- Criação de desafios semanais\n- Curadoria de conteúdo de alunos',
        successIndicator: 'DAU/MAU ratio superior a 40% na comunidade.',
        okr: 'O: Comunidade Viva. KR1: 500 membros ativos diariamente.',
        status: 'active',
        type: 'Remoto',
        location: 'Brasil'
    }
];

const TALENTS_DATA = [
    {
        name: 'Nilson Silva',
        role: 'Especialista em Agentes IA, Automação N8N',
        email: 'nilson.silva@mock.com',
        phone: '(11) 99999-1001',
        location: 'São Paulo, SP',
        bio: 'Dev especialista em automação. Construo "funcionários digitais" que trabalham 24/7. Foco em N8N, Typebot e Integrações.',
        products: ['Formação', 'Gestor IA'],
        areas: ['Produto', 'Performance'],
        fixedSalary: '8000.00',
        avatar: 'https://i.pravatar.cc/150?u=nilson',
        tags: ['N8N', 'Automação', 'APIs', 'Typebot']
    },
    {
        name: 'Ana Clara Souza',
        role: 'Engenharia de Dados & Python',
        email: 'ana.clara@mock.com',
        phone: '(48) 98888-1002',
        location: 'Florianópolis, SC',
        bio: 'Apaixonada por dados. Migrei de BI para Engenharia de Dados focada em IA. Experiência com Pandas, Airflow e Vector Databases.',
        products: ['Formação', 'Comunidade'],
        areas: ['Produto', 'Backoffice'],
        fixedSalary: '12000.00',
        avatar: 'https://i.pravatar.cc/150?u=anaclara',
        tags: ['Python', 'Data Engineering', 'SQL', 'Pinecone']
    },
    {
        name: 'Carlos Mendes',
        role: 'Copywriter Senior & Prompt Designer',
        email: 'carlos.m@mock.com',
        phone: '(21) 97777-1003',
        location: 'Rio de Janeiro, RJ',
        bio: 'Copywriter com 10 anos de mercado. Hoje uso GPT-4 para escalar minha produção sem perder a alma do texto. Crio personas impossíveis de distinguir de humanos.',
        products: ['80/20', 'Mente Lendária'],
        areas: ['Marketing', 'Comercial'],
        fixedSalary: '10000.00',
        avatar: 'https://i.pravatar.cc/150?u=carlos',
        tags: ['Copywriting', 'Storytelling', 'Prompt Engineering']
    },
    {
        name: 'Beatriz Oliviera',
        role: 'Product Designer (UX/UI)',
        email: 'bia.oliveira@mock.com',
        phone: '(11) 96666-1004',
        location: 'São Paulo, SP',
        bio: 'Designer focada em interfaces conversacionais. Acredito que o futuro do design é invisível. Usuária power de Midjourney para assets.',
        products: ['Formação'],
        areas: ['Produto', 'Marketing'],
        fixedSalary: '9500.00',
        avatar: 'https://i.pravatar.cc/150?u=beatriz',
        tags: ['Figma', 'UX Research', 'Midjourney', 'Design System']
    },
    {
        name: 'Eduardo Santos',
        role: 'Fullstack Dev (Next.js)',
        email: 'edu.santos@mock.com',
        phone: '(31) 95555-1005',
        location: 'Belo Horizonte, MG',
        bio: 'Dev Frontend que virou Fullstack. Amo o ecossistema Vercel. Construindo SaaS com IA no final de semana.',
        products: ['Comunidade', 'Formação'],
        areas: ['Produto', 'Suporte Técnico'],
        fixedSalary: '11000.00',
        avatar: 'https://i.pravatar.cc/150?u=eduardo',
        tags: ['React', 'Next.js', 'Typescript', 'Tailwind']
    },
    {
        name: 'Fernanda Lima',
        role: 'Gestora de Tráfego & Performance',
        email: 'nanda.lima@mock.com',
        phone: '(41) 94444-1006',
        location: 'Curitiba, PR',
        bio: 'Gerencio mais de 100k/mês em ads. Uso IA para analisar métricas e gerar criativos em massa. Focada em ROAS.',
        products: ['80/20', 'Gestor IA'],
        areas: ['Performance', 'Comercial'],
        fixedSalary: '7000.00',
        avatar: 'https://i.pravatar.cc/150?u=fernanda',
        tags: ['Facebook Ads', 'Google Ads', 'Data Analysis', 'Excel']
    },
    {
        name: 'Gabriel Costa',
        role: 'Video Maker & Editor AI',
        email: 'gabriel.costa@mock.com',
        phone: '(51) 93333-1007',
        location: 'Porto Alegre, RS',
        bio: 'Editor de vídeo rápido. Uso Premiere + Plugins de IA para reduzir tempo de edição em 70%. Mestre em cortes virais.',
        products: ['Mente Lendária'],
        areas: ['Marketing'],
        fixedSalary: '5000.00',
        avatar: 'https://i.pravatar.cc/150?u=gabriel',
        tags: ['Premiere', 'After Effects', 'CapCut', 'RunwayML']
    },
    {
        name: 'Helena Martins',
        role: 'Customer Success & Onboarding',
        email: 'helena.m@mock.com',
        phone: '(85) 92222-1008',
        location: 'Fortaleza, CE',
        bio: 'Amo gente. Uso IA para personalizar o atendimento e prever churn, mas o contato humano é meu diferencial.',
        products: ['Comunidade', 'Mentoria'],
        areas: ['Sucesso do Cliente', 'Suporte Técnico'],
        fixedSalary: '4500.00',
        avatar: 'https://i.pravatar.cc/150?u=helena',
        tags: ['Atendimento', 'Zendesk', 'Empatia', 'CRM']
    },
    {
        name: 'Igor Viana',
        role: 'Tech Lead',
        email: 'igor.viana@mock.com',
        phone: '(61) 91111-1009',
        location: 'Brasília, DF',
        bio: '15 anos de XP. Lidero times técnicos. Busco implementar cultura de AI-First no desenvolvimento de software.',
        products: ['Formação', 'Mentoria'],
        areas: ['Produto', 'Backoffice'],
        fixedSalary: '18000.00',
        avatar: 'https://i.pravatar.cc/150?u=igor',
        tags: ['Liderança', 'Arquitetura', 'Cloud', 'Mentoria']
    },
    {
        name: 'Julia Pereira',
        role: 'Growth Hacker',
        email: 'ju.pereira@mock.com',
        phone: '(71) 90000-1010',
        location: 'Salvador, BA',
        bio: 'Testar rápido, aprender rápido. Especialista em SEO e Viral Loops. Hacker de funil.',
        products: ['80/20'],
        areas: ['Marketing', 'Performance'],
        fixedSalary: '9000.00',
        avatar: 'https://i.pravatar.cc/150?u=julia',
        tags: ['SEO', 'Growth', 'Analytics', 'Experimentação']
    }
];

async function main() {
    console.log('🌱 Starting Seed...');

    // 1. Seed Jobs
    console.log('Creating 10 Jobs...');
    for (const job of JOBS_DATA) {
        // We use create instead of upsert to allow multiples if run multiple times, or we could upsert by title if we wanted idempotency. 
        // For mass population, just creating is fine, or we check if exists.
        // Let's check duplicates by title to be clean.
        const existing = await prisma.job.findFirst({ where: { title: job.title } });

        if (!existing) {
            await prisma.job.create({
                data: {
                    ...job,
                    // Use enum for status. Map string 'active' -> JobStatus.active if needed or rely on Prisma casting
                    status: job.status as any
                }
            });
            console.log(`+ Job Created: ${job.title}`);
        } else {
            console.log(`- Job Exists: ${job.title}`);
        }
    }

    // 2. Seed Talents
    console.log('\nCreating 10 Talents...');
    for (const talent of TALENTS_DATA) {
        const existingProfile = await prisma.profile.findUnique({ where: { email: talent.email } });

        let profileId = existingProfile?.id;

        if (!existingProfile) {
            // Create Profile
            const newProfile = await prisma.profile.create({
                data: {
                    id: generateId(),
                    email: talent.email,
                    fullName: talent.name,
                    avatarUrl: talent.avatar,
                    role: 'talent'
                }
            });
            profileId = newProfile.id;
            console.log(`+ Profile Created: ${talent.name}`);
        } else {
            console.log(`- Profile Exists: ${talent.name}`);
        }

        // Create Talent
        if (profileId) {
            const existingTalent = await prisma.talent.findUnique({ where: { id: profileId } });
            if (!existingTalent) {
                const [city, state] = talent.location.split('-').map(s => s.trim()).length > 1
                    ? talent.location.split('-').map(s => s.trim())
                    : talent.location.split(',').map(s => s.trim());

                await prisma.talent.create({
                    data: {
                        id: profileId,
                        phone: talent.phone,
                        locationCity: city || talent.location,
                        locationState: state || '',
                        bio: talent.bio,
                        hourlyRate: talent.fixedSalary,
                        tags: talent.tags,
                        isVerified: true,
                        // Mappings for Academy specific fields
                        academyProduct: talent.products[0], // Taking first as 'primary'
                    }
                });
                console.log(`  > Talent Record Created for ${talent.name}`);
            }
        }
    }

    console.log('\n✅ Seed completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
