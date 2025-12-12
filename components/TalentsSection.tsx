import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Icon } from './ui/icon';
import { Symbol } from './ui/symbol';
import { MinimalistHero } from './ui/minimalist-hero';
import { Instagram, Linkedin, Globe } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Label } from './ui/label';
import { cn } from '../lib/utils';
import { FileUpload } from './ui/file-upload';
import { TalentCard } from './ui/TalentCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

// --- TYPES ---
export interface TalentsSectionProps {
    initialView?: 'landing' | 'admin';
}

interface Job {
    id: string;
    title: string;
    mission: string;
    responsibilities: string;
    successIndicator: string;
    okr: string;
    status: 'active' | 'draft' | 'paused';
    candidates: number;
}

interface Talent {
    id: string;
    name: string;
    role: string; // "Funções que está apto"
    email: string;
    phone: string;
    location: string;
    bio: string; // "Breve apresentação"
    products: string[];
    areas: string[];
    seniority: 'Junior' | 'Pleno' | 'Sênior';
    fixedSalary: string; // "Pretensão salarial fixa"
    avatar: string;
    rating: number;
    tags: string[]; // Keep for compatibility with AI Match logic (derived from areas/role)
}

// --- CONSTANTS ---
const ACADEMY_PRODUCTS = [
    "80/20",
    "Mente Lendária",
    "Dominando Obsidian",
    "Comunidade",
    "Gestor IA",
    "Formação",
    "Mentoria"
];

const INTEREST_AREAS = [
    "Marketing",
    "Comercial",
    "Sucesso do Cliente",
    "Suporte Técnico",
    "Educacional",
    "Produto",
    "Performance",
    "Backoffice"
];

const SENIORITY_LEVELS = [
    { label: "Junior", value: "Junior" },
    { label: "Pleno", value: "Pleno" },
    { label: "Sênior", value: "Sênior" }
];

// --- MOCK DATA ---
const INITIAL_JOBS: Job[] = [
    {
        id: '1',
        title: 'Engenheiro de Prompt Sr',
        mission: 'Criar a biblioteca de prompts mais eficiente do mercado.',
        responsibilities: '- Desenvolver metaprompts\n- Otimizar contexto\n- Documentar padrões',
        successIndicator: 'Redução de 30% no tempo de resposta da IA.',
        okr: 'O: Dominar a engenharia de prompt. KR: 100 prompts validados.',
        status: 'active',
        candidates: 12
    },
    {
        id: '2',
        title: 'Product Designer (IA)',
        mission: 'Desenhar interfaces que tornem a IA invisível e mágica.',
        responsibilities: '- Prototipar fluxos de chat\n- Criar sistema de design\n- Realizar testes de usabilidade',
        successIndicator: 'NPS de 90+ na nova feature de chat.',
        okr: 'O: UX de classe mundial. KR: Tempo de tarefa reduzido em 50%.',
        status: 'active',
        candidates: 8
    },
];

const MOCK_TALENTS: Talent[] = [
    {
        id: 't1',
        name: 'Nilson Silva',
        role: 'Especialista em Agentes IA, Automação N8N',
        email: 'nilson.silva@example.com',
        phone: '(11) 99999-9999',
        location: 'São Paulo, SP',
        bio: 'Olá! Sou especialista em Inteligência Artificial, automação de processos e estratégias de marketing digital com foco em resultados reais. Meu objetivo é claro: ajudar você a aumentar o lucro, economizar tempo e otimizar os processos do seu negócio.',
        products: ['Formação', 'Gestor IA'],
        areas: ['Produto', 'Performance'],
        seniority: 'Pleno',
        fixedSalary: 'R$ 8.000,00',
        avatar: 'https://i.pravatar.cc/150?u=nilson',
        rating: 0,
        tags: ['Agentes IA', 'Prompts', 'Automação']
    },
    {
        id: 't2',
        name: 'Ana Clara',
        role: 'Engenharia de Dados, Python Backend',
        email: 'ana.clara@example.com',
        phone: '(48) 98888-8888',
        location: 'Florianópolis, SC',
        bio: 'Focada em estruturar data lakes para LLMs e pipelines de RAG.',
        products: ['Formação', 'Comunidade'],
        areas: ['Produto', 'Backoffice'],
        seniority: 'Sênior',
        fixedSalary: 'R$ 12.000,00',
        avatar: 'https://i.pravatar.cc/150?u=ana',
        rating: 5,
        tags: ['Python', 'SQL', 'Data Engineering']
    },
    {
        id: 't3',
        name: 'Carlos Mendes',
        role: 'Copywriter & Prompt Designer',
        email: 'carlos.m@example.com',
        phone: '(21) 97777-7777',
        location: 'Rio de Janeiro, RJ',
        bio: 'Copywriter sênior migrando para IA. Crio personas complexas e fluxos de conversa naturais.',
        products: ['80/20', 'Mente Lendária'],
        areas: ['Marketing', 'Comercial'],
        seniority: 'Sênior',
        fixedSalary: 'R$ 10.000,00',
        avatar: 'https://i.pravatar.cc/150?u=carlos',
        rating: 4,
        tags: ['Copywriting', 'Storytelling', 'Prompting']
    }
];

const INTERVIEW_QUESTIONS = [
    {
        category: "PILAR 1: Inteligência e Autoconhecimento",
        questions: [
            "Qual foi o último problema complexo que você resolveu? Me conta como foi.",
            "Como você costuma buscar evoluir? O que você tem feito para se conhecer melhor?",
            "Me dá um exemplo de uma verdade difícil que você precisou aceitar sobre você mesmo."
        ]
    },
    {
        category: "PILAR 2: Impacto e Arte",
        questions: [
            "Qual é a sua zona de genialidade? Aquela coisa que você faz melhor que a maioria e que te dá energia?",
            "Me conta de um projeto que você criou que você tem orgulho. Por que você tem orgulho dele?",
            "Qual legado você quer deixar? Como você quer ser lembrado?"
        ]
    },
    {
        category: "PILAR 3: Inteligência Artificial",
        questions: [
            "Como você tem usado IA no seu dia a dia? Me dá exemplos práticos.",
            "Se você pudesse usar IA para resolver um problema da sua vida hoje, qual seria e como você faria?"
        ]
    },
    {
        category: "VALORES EM AÇÃO",
        questions: [
            "Como você equilibra fazer bem feito com fazer rápido?",
            "Quando você tem uma lista gigante de coisas pra fazer, como você decide o que atacar primeiro?",
            "Me conta de uma situação difícil que você enfrentou. Como você lidou?",
            "O que você faz quando algo te incomoda no trabalho?",
            "Você já discordou de uma decisão de um líder? Como você lidou?",
            "Como você reage quando recebe feedback negativo?",
            "Me dá um exemplo de uma decisão importante que você tomou sozinho no trabalho.",
            "Me conta de algo que você construiu e depois 'queimou' para fazer melhor.",
            "O que te deixa desconfortável mas empolgado ao mesmo tempo?"
        ]
    },
    {
        category: "LENDÁRIO VS MEDÍOCRE",
        questions: [
            "Me dá um exemplo de quando você entregou mais do que o esperado.",
            "Qual foi a última vez que você assumiu um risco? Como foi?",
            "Como você lida com o fracasso?"
        ]
    }
];

const MOCK_CULTURE_ANALYSIS = `
# ANÁLISE DE FIT CULTURAL - NILSON SILVA

## 📊 AVALIAÇÃO DOS 3 PILARES

**PILAR 1 - Inteligência e Autoconhecimento:** 9/10
- Demonstrou alta capacidade de resolução de problemas ao descrever como reestruturou o fluxo de atendimento da empresa anterior. Mostrou autoconhecimento ao admitir impaciência com processos burocráticos.

**PILAR 2 - Impacto e Arte:** 8/10
- Tem clareza sobre sua zona de genialidade (automação). O projeto de "Agentes de Vendas" mostra paixão e iniciativa, não apenas execução de tarefas.

**PILAR 3 - Inteligência Artificial:** 10/10
- Uso massivo de IA. Citou uso de Claude para codar e GPT-4 para estratégia. Mentalidade 100% AI-First.

**PONTUAÇÃO TOTAL DOS PILARES:** 27/30

---

## ✅ GREEN FLAGS IDENTIFICADOS
- [x] Exemplos concretos de uso de IA no dia a dia
- [x] Assume responsabilidade por resultados ("Eu falhei na primeira tentativa e corrigi")
- [x] Projetos pessoais com impacto real (Automação para ONG)
- [x] Quer crescer e impactar, demonstrou ambição de liderar a área técnica

---

## 🚩 RED FLAGS IDENTIFICADOS
- [ ] Nenhum red flag significativo identificado.
- [ ] Leve tendência a centralizar tarefas (mencionado como ponto de melhoria).

---

## 🎯 VALORES EVIDENCIADOS
- **EXCELÊNCIA COM VELOCIDADE:** Entregou MVP em 2 dias.
- **EMPOLGAÇÃO DESCONFORTÁVEL:** Saiu de emprego estável para empreender com IA.
- **RESULTADOS SEM MIMIMI:** Focou na solução quando o servidor caiu.

---

## 💡 RESUMO EXECUTIVO
Nilson é um perfil técnico com forte viés de negócios. Respira IA e tem a "fome" necessária para o ambiente da Academia. Sua comunicação é direta e orientada a resultados.

---

## ✅ RECOMENDAÇÃO FINAL

**[ FORTE FIT CULTURAL ]** 🟢

### Justificativa:
Candidato exala os valores de "AI First" e "Excelência". Pontuação alta nos pilares e alinhamento claro com o manifesto.

### Próximos Passos Recomendados:
- Avançar para desafio técnico imediatamente.
`;

// --- SUB-COMPONENTS ---

const LandingView: React.FC<{ onApply: () => void, onViewTalents: () => void }> = ({ onApply, onViewTalents }) => (
    <div className="space-y-32 animate-fade-in pb-20 bg-background min-h-screen">

        {/* Hero Section */}
        <div className="-mt-12 -mx-4 md:-mx-8 lg:-mx-12 xl:-mx-20">
            <MinimalistHero
                logoText="Lendár[IA]"
                navLinks={[
                    { label: 'MANIFESTO', href: '#manifesto' },
                    { label: 'CULTURA', href: '#culture' },
                    { label: 'TALENTOS', href: '#talentos', onClick: (e) => { e.preventDefault(); onViewTalents(); } },
                ]}
                mainText="A elite da Inteligência Artificial aplicada a negócios."
                subText="Conectamos empresas visionárias aos melhores engenheiros de prompt, arquitetos de IA e estrategistas digitais do mercado."
                readMoreLink="#"
                ctaLabel="BUSCAR TALENTOS"
                onCtaClick={onViewTalents}
                secondaryCtaLabel="SOU UM TALENTO"
                onSecondaryCtaClick={onApply}
                imageSrc="https://drive.google.com/uc?export=view&id=1xozFwWaG0voSvZV6dsvUqE9OPTKU36wn"
                imageAlt="Equipe Lendária"
                overlayText={{
                    part1: 'Fututo',
                    part2: 'Agora.',
                }}
                socialLinks={[
                    { icon: Instagram, href: '#' },
                    { icon: Linkedin, href: '#' },
                    { icon: Globe, href: '#' },
                ]}
                locationText="Global / Remote"
                className="rounded-b-[3rem] shadow-2xl shadow-black/50 border-b border-brand-gold/10"
            />
        </div>

        {/* Featured Talents Section - "A Elite" */}
        <section id="talentos" className="max-w-7xl mx-auto px-6 space-y-16">
            <div className="text-center space-y-6">
                <Badge variant="outline" className="uppercase tracking-[0.2em] text-[10px] border-brand-gold/30 text-brand-gold px-4 py-1">Banco de Talentos</Badge>
                <h3 className="text-4xl md:text-6xl font-sans font-bold text-foreground">
                    A Elite.
                </h3>
                <p className="text-muted-foreground font-serif text-xl max-w-2xl mx-auto leading-relaxed">
                    Profissionais validados pela metodologia da Academia Lendária.
                    <span className="block text-brand-orange mt-2 font-sans font-medium text-sm tracking-wide">PRONTOS PARA GERAR IMPACTO</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_TALENTS.slice(0, 3).map((talent) => (
                    <TalentCard
                        key={talent.id}
                        name={talent.name}
                        role={talent.role}
                        skills={talent.tags}
                        avatarUrl={talent.avatar}
                        seniority={talent.seniority}
                        onViewProfile={onViewTalents}
                        className="border-white/5 hover:border-brand-gold/30 bg-zinc-900/50 backdrop-blur-xl"
                    />
                ))}
            </div>

            <div className="flex justify-center pt-8">
                <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-12 py-6 border-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-background transition-all duration-300"
                    onClick={onViewTalents}
                >
                    ACESSAR BANCO COMPLETO <Icon name="arrow-right" className="ml-3" />
                </Button>
            </div>
        </section>

        {/* Mission Statement - Minimalist Typography */}
        <section id="manifesto" className="max-w-5xl mx-auto px-6 py-20 text-center space-y-12">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-brand-gold to-transparent mx-auto"></div>
            <p className="text-3xl md:text-5xl font-sans font-bold text-foreground leading-tight tracking-tight">
                "Não formamos apenas técnicos.<br />
                Formamos <span className="text-brand-gold">Líderes de IA</span>."
            </p>
            <p className="text-lg md:text-xl font-serif text-muted-foreground/80 max-w-3xl mx-auto leading-loose">
                A Academia Lendária é um ecossistema de educação e inovação em IA generativa aplicada a negócios. Nossa missão é direta: <strong className="text-foreground">unir e potencializar pessoas lendárias com IA pra construir soluções e negócios que beneficiem a humanidade.</strong>
                <br /><br />
                Aqui não entra gente pra “preencher vaga”. Entra gente pra <span className="text-brand-orange">mudar o jogo</span>.
            </p>
        </section>

        {/* DNA Section - Glassmorphism & Gold */}
        <section id="culture" className="max-w-7xl mx-auto px-4">
            <div className="relative rounded-[3rem] overflow-hidden min-h-[600px] border border-brand-gold/10 bg-zinc-950 flex flex-col md:flex-row group transition-all duration-700 hover:border-brand-gold/20">

                {/* Background & Overlay */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-[0.15] mix-blend-luminosity group-hover:opacity-[0.2] transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

                <div className="relative z-20 w-full md:w-2/3 p-12 md:p-24 flex flex-col justify-center space-y-10">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-px w-12 bg-brand-orange"></span>
                            <span className="text-brand-orange font-mono text-sm tracking-widest uppercase">Quem Veste o Manto</span>
                        </div>
                        <h3 className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tighter">
                            DNA <span className="text-brand-gold">Lendário</span>
                        </h3>
                    </div>

                    <p className="font-serif text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-2xl">
                        A gente busca quem eleva o time inteiro. Lendário de verdade tem <span className="text-white decoration-brand-gold/50 underline decoration-1 underline-offset-4">curiosidade insaciável</span>, resiliência pra jogo duro e altruísmo de time.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 pt-8 border-t border-white/10">
                        {[
                            "Curiosidade Insaciável", "Resiliência", "Altruísmo", "Visão com Bom Senso",
                            "Sinceridade Radical", "Criatividade Disruptiva", "Coragem", "Autonomia Responsável"
                        ].map((trait, i) => (
                            <div key={i} className="flex items-center gap-4 text-zinc-400 group/item">
                                <Symbol name="star" className="text-brand-gold/50 group-hover/item:text-brand-gold transition-colors text-xs" />
                                <span className="font-sans font-medium text-sm tracking-wide text-zinc-300 group-hover/item:text-white transition-colors">{trait}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* 10 Commandments - Masonry / Grid */}
        <section className="max-w-7xl mx-auto px-6 space-y-16">
            <div className="text-center space-y-6">
                <h3 className="text-3xl md:text-4xl font-sans font-bold">10 Mandamentos</h3>
                <p className="text-muted-foreground font-serif text-lg">Nossa constituição.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    "Pessoas acima de processos", "Contexto, não controle", "Liberdade com responsabilidade",
                    "Excelência sem desculpas", "Inovação constante", "Transparência radical",
                    "Impacto transformador", "Adaptabilidade exponencial", "Ética inabalável", "Propósito maior"
                ].map((mandamento, i) => (
                    <div key={i} className="p-8 bg-zinc-900/30 border border-white/5 rounded-2xl hover:border-brand-gold/30 hover:bg-zinc-900/50 transition-all duration-300 flex flex-col justify-between h-40 group cursor-default">
                        <span className="text-5xl font-bold text-white/5 group-hover:text-brand-gold/10 transition-colors font-serif">{i + 1}</span>
                        <span className="font-sans font-medium text-sm text-zinc-300 group-hover:text-white">{mandamento}</span>
                    </div>
                ))}
            </div>

            <div className="flex justify-center">
                <div className="p-1 px-8 py-4 rounded-full border border-dashed border-white/10 bg-white/5 text-sm text-muted-foreground font-serif italic">
                    "Se todo mundo fizesse o que você vai fazer, a Academia ficaria mais forte?"
                </div>
            </div>
        </section>

        {/* Benefits - Icons & Gold */}
        <section className="max-w-6xl mx-auto px-6 space-y-16 py-10">
            <h3 className="text-3xl font-sans font-bold text-center">O que você encontra aqui</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: 'laptop', title: 'Remote First', text: 'Atuação 100% remota, com a Mansão Lendária em Floripa pra visitar.' },
                    { icon: 'rocket', title: 'Ferramentas AI', text: 'Acesso premium/pro às melhores ferramentas de IA do mercado.' },
                    { icon: 'gift', title: 'Benefícios Reais', text: 'Descanso programado (8 meses), Day off, Cursos vitalícios.' }
                ].map((item, i) => (
                    <Card key={i} className="bg-transparent border-none shadow-none text-center">
                        <CardContent className="pt-6 flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-2">
                                <Icon name={item.icon as any} className="text-brand-gold w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold font-sans">{item.title}</h4>
                            <p className="text-sm text-muted-foreground font-serif leading-relaxed max-w-xs mx-auto">
                                {item.text}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        {/* Footer CTA - High Impact */}
        <section className="text-center py-32 space-y-10 border-t border-white/5 bg-gradient-to-b from-transparent to-brand-gold/5">
            <p className="text-2xl md:text-3xl font-serif max-w-3xl mx-auto text-muted-foreground">
                Se você quer fazer parte de uma comunidade que <strong className="text-foreground">constrói</strong> o futuro, é aqui.
            </p>
            <h2 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter text-foreground">
                Movimento <span className="text-brand-gold">Lendário</span>.
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <Button
                    size="lg"
                    className="h-16 px-12 rounded-full text-lg font-bold bg-brand-orange hover:bg-brand-orange-dark text-white shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 hover:-translate-y-1 transition-all duration-300"
                    onClick={onApply}
                >
                    ENTRAR PARA O BANCO
                </Button>
            </div>
            <p className="text-xs text-muted-foreground/50 uppercase tracking-widest pt-12">Copyright © 2025 Academia Lendária</p>
        </section>
    </div>
);

const CandidateFormView: React.FC<{ onCancel: () => void, onSubmit: () => void }> = ({ onCancel, onSubmit }) => {
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const profileInputRef = useRef<HTMLInputElement>(null);

    const toggleProduct = (product: string) => {
        setSelectedProducts(prev =>
            prev.includes(product) ? prev.filter(p => p !== product) : [...prev, product]
        );
    };

    const toggleArea = (area: string) => {
        setSelectedAreas(prev =>
            prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
        );
    };

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in space-y-8 pb-20">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={onCancel}>
                    <Icon name="arrow-left" />
                </Button>
                <div>
                    <h2 className="text-3xl font-sans font-bold">Cadastro de Talento</h2>
                    <p className="text-muted-foreground font-serif">Entre para o banco de talentos da Academia Lendária.</p>
                </div>
            </div>

            <Card>
                <CardContent className="p-8 space-y-8">

                    {/* 0. Foto de Perfil */}
                    <div className="flex flex-col items-center sm:flex-row gap-6 pb-6 border-b border-border">
                        <div
                            className="relative group cursor-pointer"
                            onClick={() => profileInputRef.current?.click()}
                        >
                            <Avatar className="w-24 h-24 border-2 border-border group-hover:border-brand-orange transition-colors">
                                <AvatarImage src={profileImage || ""} />
                                <AvatarFallback className="bg-muted text-muted-foreground text-2xl">
                                    <Icon name="camera" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Icon name="upload" className="text-white" />
                            </div>
                            <input
                                type="file"
                                ref={profileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleProfileImageChange}
                            />
                        </div>
                        <div className="text-center sm:text-left space-y-1">
                            <h3 className="font-bold text-lg">Foto do Perfil</h3>
                            <p className="text-sm text-muted-foreground">Recomendado: JPG ou PNG. A imagem ajuda na identificação do perfil.</p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-2 border-brand-orange text-brand-orange hover:bg-brand-orange/10"
                                onClick={() => profileInputRef.current?.click()}
                            >
                                Carregar Foto
                            </Button>
                        </div>
                    </div>

                    {/* 1. Dados Pessoais */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold border-b border-border pb-2 flex items-center gap-2">
                            <Icon name="user" className="text-brand-orange" /> Dados Pessoais
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Nome Completo</Label>
                                <Input placeholder="Seu nome" />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input placeholder="seu@email.com" type="email" />
                            </div>
                            <div className="space-y-2">
                                <Label>Telefone (WhatsApp)</Label>
                                <Input placeholder="(00) 00000-0000" />
                            </div>
                            <div className="space-y-2">
                                <Label>Localização</Label>
                                <Input placeholder="Cidade - UF" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Breve Apresentação</Label>
                            <Textarea placeholder="Conte um pouco sobre quem é você e seus objetivos..." className="h-32" />
                        </div>
                    </div>

                    {/* 2. Perfil Profissional */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold border-b border-border pb-2 flex items-center gap-2">
                            <Icon name="briefcase" className="text-brand-orange" /> Perfil Profissional
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Pretensão Salarial Fixa (Mensal)</Label>
                                <Input placeholder="Ex: R$ 5.000,00" />
                            </div>
                            <div className="space-y-2">
                                <Label>Nível de Senioridade (Auto-avaliação)</Label>
                                <Select
                                    placeholder="Selecione..."
                                    options={SENIORITY_LEVELS}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Funções que está apto a atuar</Label>
                            <Textarea placeholder="Liste as funções, cargos ou papéis que você domina..." className="h-24" />
                            <p className="text-xs text-muted-foreground">Descreva livremente suas capacidades técnicas e operacionais.</p>
                        </div>
                    </div>

                    {/* 3. Contexto Academia */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold border-b border-border pb-2 flex items-center gap-2">
                            <Icon name="graduation-cap" className="text-brand-orange" /> Contexto Lendário
                        </h3>

                        <div className="space-y-3">
                            <Label>Produtos que você participa/conhece:</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {ACADEMY_PRODUCTS.map(prod => (
                                    <div
                                        key={prod}
                                        className={cn(
                                            "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all",
                                            selectedProducts.includes(prod)
                                                ? "border-brand-orange bg-brand-orange/5"
                                                : "border-border hover:border-brand-orange/30"
                                        )}
                                        onClick={() => toggleProduct(prod)}
                                    >
                                        <Checkbox checked={selectedProducts.includes(prod)} className="pointer-events-none" />
                                        <span className="text-sm font-medium">{prod}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <Label>Áreas de Interesse:</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {INTEREST_AREAS.map(area => (
                                    <div
                                        key={area}
                                        className={cn(
                                            "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all",
                                            selectedAreas.includes(area)
                                                ? "border-brand-blue bg-brand-blue/5"
                                                : "border-border hover:border-brand-blue/30"
                                        )}
                                        onClick={() => toggleArea(area)}
                                    >
                                        <Checkbox checked={selectedAreas.includes(area)} className="pointer-events-none data-[state=checked]:bg-brand-blue data-[state=checked]:border-brand-blue" />
                                        <span className="text-sm font-medium">{area}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Uploads */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold border-b border-border pb-2 flex items-center gap-2">
                            <Icon name="document" className="text-brand-orange" /> Anexos
                        </h3>
                        <div className="space-y-2">
                            <Label>Currículo ou Portfólio (PDF)</Label>
                            <FileUpload accept=".pdf,.doc,.docx" />
                        </div>
                    </div>

                </CardContent>
                <CardFooter className="flex justify-end gap-4 p-8 bg-muted/10 border-t border-border">
                    <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
                    <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8" onClick={onSubmit}>
                        Finalizar Cadastro
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

const AdminNewJobView: React.FC<{ onSave: (job: Job) => void, onCancel: () => void }> = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState<Partial<Job>>({ status: 'active' });

    return (
        <div className="max-w-3xl mx-auto animate-fade-in space-y-8">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={onCancel}>
                    <Icon name="arrow-left" />
                </Button>
                <h2 className="text-3xl font-sans font-bold">Nova Vaga</h2>
            </div>

            <Card>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-2">
                        <Label>Título da Vaga</Label>
                        <Input
                            placeholder="Ex: Engenheiro de Prompt Pleno"
                            value={formData.title || ''}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Missão da Vaga</Label>
                        <Textarea
                            placeholder="Qual o propósito principal desta posição?"
                            className="min-h-[100px]"
                            value={formData.mission || ''}
                            onChange={e => setFormData({ ...formData, mission: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">Descreva o impacto esperado em 1 parágrafo.</p>
                    </div>

                    <div className="space-y-2">
                        <Label>Responsabilidades</Label>
                        <Textarea
                            placeholder="• Listar principais atividades..."
                            className="min-h-[150px] font-mono text-sm"
                            value={formData.responsibilities || ''}
                            onChange={e => setFormData({ ...formData, responsibilities: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Indicador de Sucesso (KPI)</Label>
                            <Input
                                placeholder="Ex: Redução de 40% no churn"
                                value={formData.successIndicator || ''}
                                onChange={e => setFormData({ ...formData, successIndicator: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>OKR Relacionado</Label>
                            <Input
                                placeholder="Ex: O: Escalar Vendas..."
                                value={formData.okr || ''}
                                onChange={e => setFormData({ ...formData, okr: e.target.value })}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-3 bg-muted/10 py-4">
                    <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
                    <Button
                        className="bg-brand-orange hover:bg-brand-orange-dark text-white"
                        onClick={() => onSave({ ...formData, id: Math.random().toString(), candidates: 0 } as Job)}
                    >
                        Publicar Vaga
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

// --- JOB DETAIL VIEW (LIST OF CANDIDATES) ---
const AdminJobDetailView: React.FC<{ job: Job, onBack: () => void, onViewTalent: (talent: Talent) => void }> = ({ job, onBack, onViewTalent }) => {
    // Mock simulation: Assign random scores to existing talents for this specific job
    const candidates = MOCK_TALENTS.map(t => ({
        ...t,
        score: Math.floor(Math.random() * 40) + 60, // Random score 60-100
        status: ['Novo', 'Entrevista', 'Análise'][Math.floor(Math.random() * 3)]
    })).sort((a, b) => b.score - a.score);

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onBack}>
                        <Icon name="arrow-left" />
                    </Button>
                    <div>
                        <h2 className="text-3xl font-sans font-bold">{job.title}</h2>
                        <div className="flex items-center gap-3 mt-1">
                            <Badge variant={job.status === 'active' ? 'active' : 'secondary'}>{job.status}</Badge>
                            <span className="text-sm text-muted-foreground">{candidates.length} candidatos</span>
                        </div>
                    </div>
                </div>
                <Button variant="outline" className="gap-2">
                    <Icon name="pencil" /> Editar Vaga
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Details Column */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle className="text-base">Missão</CardTitle></CardHeader>
                        <CardContent><p className="text-sm text-muted-foreground">{job.mission}</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-base">OKR</CardTitle></CardHeader>
                        <CardContent><p className="text-sm text-muted-foreground">{job.okr}</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-base">KPI de Sucesso</CardTitle></CardHeader>
                        <CardContent><p className="text-sm text-muted-foreground">{job.successIndicator}</p></CardContent>
                    </Card>
                </div>

                {/* Candidates Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold font-sans">Candidatos Aderentes</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2"><Icon name="sort-alt" /> Score</Button>
                            <Button variant="outline" size="sm" className="gap-2"><Icon name="filter" /> Filtrar</Button>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted/40">
                                <TableRow>
                                    <TableHead>Candidato</TableHead>
                                    <TableHead>Senioridade</TableHead>
                                    <TableHead className="text-center">AI Match</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {candidates.map(candidate => (
                                    <TableRow key={candidate.id} className="hover:bg-muted/20">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar size="sm">
                                                    <AvatarImage src={candidate.avatar} />
                                                    <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-semibold text-foreground">{candidate.name}</div>
                                                    <div className="text-xs text-muted-foreground truncate max-w-[150px]">{candidate.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-normal">{candidate.seniority}</Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge
                                                className={cn(
                                                    "font-bold",
                                                    candidate.score >= 90 ? "bg-brand-green" :
                                                        candidate.score >= 70 ? "bg-brand-blue" : "bg-brand-yellow text-black"
                                                )}
                                            >
                                                {candidate.score}%
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-medium text-muted-foreground">{candidate.status}</span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-brand-orange hover:text-brand-orange-dark hover:bg-brand-orange/10"
                                                onClick={() => onViewTalent(candidate)}
                                            >
                                                Ver Perfil
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminTalentDetailView: React.FC<{ talent: Talent, onBack: () => void, availableJobs: Job[] }> = ({ talent, onBack, availableJobs }) => {
    const [aiMatches, setAiMatches] = useState<{ job: Job, score: number, reason: string }[] | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Cultural Fit State
    const [isAnalyzingCulture, setIsAnalyzingCulture] = useState(false);
    const [cultureAnalysis, setCultureAnalysis] = useState<string | null>(null);
    const cultureFileRef = useRef<HTMLInputElement>(null);

    // Interview Checklist State
    const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});

    const handleAiAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            const matches = availableJobs.map(job => {
                const score = Math.floor(Math.random() * 40) + 60; // Mock score 60-100
                return {
                    job,
                    score,
                    reason: `Alta compatibilidade com "${job.title}". Tags do candidato (${talent.tags.slice(0, 2).join(', ')}) alinham com requisitos.`
                };
            }).sort((a, b) => b.score - a.score);
            setAiMatches(matches);
            setIsAnalyzing(false);
        }, 2000);
    };

    const handleCultureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsAnalyzingCulture(true);
            // Simulate AI Processing delay
            setTimeout(() => {
                setCultureAnalysis(MOCK_CULTURE_ANALYSIS);
                setIsAnalyzingCulture(false);
            }, 3000);
        }
    };

    const toggleChecklist = (question: string) => {
        setChecklistState(prev => ({
            ...prev,
            [question]: !prev[question]
        }));
    };

    const calculateChecklistProgress = () => {
        const total = INTERVIEW_QUESTIONS.reduce((acc, cat) => acc + cat.questions.length, 0);
        const checked = Object.values(checklistState).filter(Boolean).length;
        return Math.round((checked / total) * 100);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <Button variant="ghost" onClick={onBack} className="gap-2">
                <Icon name="arrow-left" /> Voltar
            </Button>

            {/* Header Profile */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <Avatar className="w-32 h-32 border-4 border-card shadow-lg">
                    <AvatarImage src={talent.avatar} />
                    <AvatarFallback>{talent.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                    <div>
                        <h2 className="text-3xl font-sans font-bold flex items-center gap-2">
                            {talent.name} <Icon name="badge-check" className="text-brand-blue" size="size-5" />
                        </h2>
                        <p className="text-xl text-muted-foreground font-serif">{talent.role}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Icon name="marker" size="size-3" /> {talent.location}</span>
                        <span className="flex items-center gap-1"><Icon name="envelope" size="size-3" /> {talent.email}</span>
                        <span className="flex items-center gap-1"><Icon name="phone-call" size="size-3" /> {talent.phone}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {talent.areas.map(area => (
                            <Badge key={area} variant="secondary" className="bg-brand-blue/10 text-brand-blue">{area}</Badge>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 min-w-[200px]">
                    <Card className="p-4 bg-muted/20 border-none">
                        <div className="text-sm font-semibold text-muted-foreground uppercase">Pretensão</div>
                        <div className="text-2xl font-bold text-foreground">{talent.fixedSalary}</div>
                        <div className="text-xs text-muted-foreground uppercase mt-1 text-right">{talent.seniority}</div>
                    </Card>
                    <div className="flex gap-2">
                        <Button
                            className="flex-1 bg-brand-orange hover:bg-brand-orange-dark text-white"
                            onClick={handleAiAnalysis}
                            disabled={isAnalyzing}
                        >
                            {isAnalyzing ? <Icon name="refresh" className="animate-spin" /> : <Icon name="sparkles" className="mr-2" />}
                            AI Match
                        </Button>

                        {/* Cultural Fit Upload Button */}
                        <div className="relative">
                            <input
                                type="file"
                                ref={cultureFileRef}
                                className="hidden"
                                accept=".txt,.pdf,.doc,.docx"
                                onChange={handleCultureUpload}
                            />
                            <Button
                                variant="outline"
                                className="w-full border-brand-orange text-brand-orange hover:bg-brand-orange/10"
                                onClick={() => cultureFileRef.current?.click()}
                                disabled={isAnalyzingCulture}
                            >
                                {isAnalyzingCulture ? <Icon name="refresh" className="animate-spin" /> : <Icon name="users-alt" className="mr-2" />}
                                Fit Cultural
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Bio */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Apresentação</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-serif leading-relaxed text-muted-foreground">{talent.bio}</p>
                        </CardContent>
                    </Card>

                    {/* AI Analysis Result */}
                    {aiMatches && (
                        <Card className="border-brand-orange/50 bg-brand-orange/5 overflow-hidden">
                            <CardHeader className="bg-brand-orange/10 border-b border-brand-orange/20 pb-4">
                                <CardTitle className="text-brand-orange-dark flex items-center gap-2">
                                    <Icon name="sparkles" /> Análise de Compatibilidade (IA)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                {aiMatches.map((match, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-foreground">{match.job.title}</span>
                                            <Badge className={cn(
                                                "font-bold",
                                                match.score > 80 ? "bg-brand-green" : "bg-brand-yellow text-black"
                                            )}>
                                                {match.score}% Match
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground font-serif italic">
                                            "{match.reason}"
                                        </p>
                                        {idx < aiMatches.length - 1 && <div className="h-px bg-brand-orange/20 my-4"></div>}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {/* Cultural Fit Analysis Result */}
                    {cultureAnalysis && (
                        <Card className="border-brand-blue/50 bg-brand-blue/5 overflow-hidden animate-fade-in">
                            <CardHeader className="bg-brand-blue/10 border-b border-brand-blue/20 pb-4">
                                <CardTitle className="text-brand-blue-dark flex items-center gap-2">
                                    <Icon name="users-alt" /> Análise de Fit Cultural
                                </CardTitle>
                                <CardDescription>Baseada na transcrição da entrevista e nos 3 Pilares Lendários.</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="prose prose-sm dark:prose-invert max-w-none font-serif">
                                    {/* Rendering markdown-like content simply for the demo */}
                                    {cultureAnalysis.split('\n').map((line, i) => {
                                        if (line.startsWith('# ')) return <h3 key={i} className="text-xl font-sans font-bold mt-4 mb-2 text-foreground">{line.replace('# ', '')}</h3>;
                                        if (line.startsWith('## ')) return <h4 key={i} className="text-lg font-sans font-bold mt-6 mb-3 text-foreground border-b border-border pb-1">{line.replace('## ', '')}</h4>;
                                        if (line.startsWith('**')) return <p key={i} className="font-bold text-foreground mt-2">{line.replace(/\*\*/g, '')}</p>;
                                        if (line.startsWith('- [ ]')) return <div key={i} className="flex gap-2 items-center text-muted-foreground"><div className="w-4 h-4 border rounded"></div> {line.replace('- [ ]', '')}</div>;
                                        if (line.startsWith('- [x]')) return <div key={i} className="flex gap-2 items-center text-foreground font-medium"><Icon name="check" className="text-brand-green size-4" /> {line.replace('- [x]', '')}</div>;
                                        return <p key={i} className="mb-1 text-muted-foreground">{line}</p>;
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Interview Checklist Script */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-sans font-bold flex items-center gap-2">
                                <Icon name="comment-alt-middle" className="text-brand-orange" /> Roteiro de Entrevista
                            </h3>
                            <Badge variant="outline" className="font-mono">
                                Progresso: {calculateChecklistProgress()}%
                            </Badge>
                        </div>

                        <div className="space-y-8">
                            {INTERVIEW_QUESTIONS.map((section, idx) => (
                                <Card key={idx} className="overflow-hidden">
                                    <CardHeader className="bg-muted/30 py-4">
                                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                            {section.category}
                                        </CardTitle>
                                    </CardHeader>
                                    <div className="divide-y divide-border">
                                        {section.questions.map((q, qIdx) => (
                                            <div
                                                key={qIdx}
                                                className={cn(
                                                    "p-4 flex gap-4 transition-colors hover:bg-muted/10 cursor-pointer",
                                                    checklistState[q] ? "bg-brand-green/5" : ""
                                                )}
                                                onClick={() => toggleChecklist(q)}
                                            >
                                                <Checkbox
                                                    checked={checklistState[q] || false}
                                                    onCheckedChange={() => toggleChecklist(q)}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleChecklist(q);
                                                    }}
                                                    className="mt-1"
                                                />
                                                <div className="space-y-1 pointer-events-none">
                                                    <p className={cn(
                                                        "text-sm font-medium transition-colors",
                                                        checklistState[q] ? "text-muted-foreground line-through" : "text-foreground"
                                                    )}>
                                                        {q}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column: Meta */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle className="text-sm">Produtos Lendários</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            {talent.products.map(prod => (
                                <div key={prod} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Icon name="check-circle" className="text-brand-orange size-3" />
                                    {prod}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// --- LOGIN VIEW ---
const LoginView: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [email, setEmail] = useState('admin@lendaria.com');
    const [password, setPassword] = useState('888');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (email === 'admin@lendaria.com' && password === '888') {
            onLogin();
        } else {
            setError('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-4">
                    <div className="flex justify-center mb-2">
                        <div className="p-3 bg-brand-orange/10 rounded-full">
                            <Icon name="lock" className="text-brand-orange" size="size-6" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold font-sans">Acesso Restrito</CardTitle>
                    <CardDescription>Área exclusiva para recrutadores da Academia Lendária.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@lendaria.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="***"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        />
                    </div>
                    {error && (
                        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md flex items-center gap-2">
                            <Icon name="exclamation" size="size-4" /> {error}
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white" onClick={handleLogin}>
                        Entrar
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};


// --- MAIN COMPONENT ---

const TalentsSection: React.FC<TalentsSectionProps> = ({ initialView = 'landing' }) => {
    const [view, setView] = useState<'landing' | 'candidate-register' | 'admin' | 'admin-new-job' | 'admin-talent-detail' | 'admin-job-detail'>(initialView);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setView(initialView);
    }, [initialView]);

    const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
    const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const handleCreateJob = (newJob: Job) => {
        setJobs([newJob, ...jobs]);
        setView('admin');
    };

    const handleViewTalent = (talent: Talent) => {
        setSelectedTalent(talent);
        setView('admin-talent-detail');
    };

    const handleViewJob = (job: Job) => {
        setSelectedJob(job);
        setView('admin-job-detail');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        // We stay on the current view (or redirect to admin) so the login screen appears
        setView('admin');
    };

    // --- VIEW ROUTING ---

    // 1. Candidate Views (Public)
    if (view === 'candidate-register') {
        return <CandidateFormView onCancel={() => setView('landing')} onSubmit={() => { alert('Cadastro realizado com sucesso!'); setView('landing'); }} />;
    }

    if (view === 'landing') {
        // Redirect to admin view (which handles login) when asking to see talents
        return <LandingView onApply={() => setView('candidate-register')} onViewTalents={() => setView('admin')} />;
    }

    // 2. Admin Views (Protected)
    // All views below this point are ADMIN related. If not authenticated, show Login.
    if (!isAuthenticated) {
        return <LoginView onLogin={() => setIsAuthenticated(true)} />;
    }

    if (view === 'admin-new-job') {
        return <AdminNewJobView onSave={handleCreateJob} onCancel={() => setView('admin')} />;
    }

    if (view === 'admin-talent-detail' && selectedTalent) {
        return <AdminTalentDetailView talent={selectedTalent} availableJobs={jobs} onBack={() => setView('admin')} />;
    }

    if (view === 'admin-job-detail' && selectedJob) {
        return <AdminJobDetailView job={selectedJob} onBack={() => setView('admin')} onViewTalent={handleViewTalent} />;
    }

    // Default Admin View ('admin')
    return (
        <div className="space-y-12 animate-fade-in">
            {/* Admin Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-4xl font-sans font-bold flex items-center gap-2">
                        <Icon name="shield-check" className="text-brand-orange" /> Área do Recrutador
                    </h2>
                    <p className="font-serif text-muted-foreground">Gestão de vagas e talentos da Academia.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-destructive" onClick={handleLogout}>
                        <Icon name="sign-out" /> Sair
                    </Button>
                    <Button
                        className="gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white"
                        onClick={() => setView('admin-new-job')}
                    >
                        <Icon name="plus" /> Nova Vaga
                    </Button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Vagas Ativas</div>
                        <div className="text-3xl font-bold font-sans">{jobs.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Candidatos Total</div>
                        <div className="text-3xl font-bold font-sans">142</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Entrevistas Hoje</div>
                        <div className="text-3xl font-bold font-sans text-brand-orange">4</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Match Rate (IA)</div>
                        <div className="text-3xl font-bold font-sans text-brand-green">78%</div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="talents" className="w-full">
                <TabsList>
                    <TabsTrigger value="talents">Banco de Talentos</TabsTrigger>
                    <TabsTrigger value="jobs">Minhas Vagas</TabsTrigger>
                </TabsList>

                <TabsContent value="talents" className="mt-6 space-y-6">
                    {/* Filter Bar */}
                    <div className="flex gap-4 mb-6">
                        <Input placeholder="Buscar por nome, skill ou cargo..." className="max-w-md" />
                        <Button variant="outline"><Icon name="filter" /> Filtros</Button>
                    </div>

                    {/* Talent List (Card Style) */}
                    <div className="space-y-4">
                        {MOCK_TALENTS.map(talent => (
                            <Card key={talent.id} className="hover:border-brand-orange/50 transition-colors">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6 items-start">
                                        <Avatar className="w-16 h-16 border-2 border-border">
                                            <AvatarImage src={talent.avatar} />
                                            <AvatarFallback>{talent.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1 space-y-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-bold text-lg">{talent.name}</h3>
                                                        {talent.rating > 0 && <Icon name="badge-check" className="text-brand-blue" size="size-4" />}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground font-serif">{talent.role.substring(0, 100)}...</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="link"
                                                        className="text-brand-orange px-0"
                                                        onClick={() => handleViewTalent(talent)}
                                                    >
                                                        Ver detalhes
                                                    </Button>
                                                    <Button size="sm" className="bg-brand-orange hover:bg-brand-orange-dark text-white">
                                                        Entrar em contato
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mt-2">
                                                <span className="font-bold text-foreground text-brand-orange">{talent.fixedSalary} <span className="text-[10px] uppercase text-muted-foreground font-normal">/ mês</span></span>
                                                <span>{talent.seniority}</span>
                                                <div className="flex items-center gap-1 text-brand-orange">
                                                    <Icon name="star" size="size-3" />
                                                    {talent.rating > 0 ? talent.rating : 'Sem avaliação (0)'}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {talent.products.map(prod => (
                                                    <Badge key={prod} variant="outline" className="text-[10px]">
                                                        {prod}
                                                    </Badge>
                                                ))}
                                                {talent.areas.map(area => (
                                                    <Badge key={area} variant="secondary" className="bg-muted font-normal text-xs">
                                                        {area}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="jobs" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jobs.map(job => (
                            <Card key={job.id} className="hover:border-brand-orange/50 transition-colors cursor-pointer group" onClick={() => handleViewJob(job)}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <Badge variant={job.status === 'active' ? 'active' : 'secondary'}>{job.status}</Badge>
                                        <Icon name="chevron-right" className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <CardTitle className="mt-2 group-hover:text-brand-orange transition-colors">{job.title}</CardTitle>
                                    <CardDescription>{job.mission.substring(0, 100)}...</CardDescription>
                                </CardHeader>
                                <CardFooter className="flex justify-between items-center border-t border-border pt-4">
                                    <span className="text-sm text-muted-foreground">{job.candidates} candidatos</span>
                                    <span className="text-sm font-semibold text-brand-orange">Gerenciar Vaga</span>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default TalentsSection;