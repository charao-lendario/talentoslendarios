
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
// NOTE: Ideally this should be done via a backend proxy to protect the key.
// For this client-side demo, we use the VITE_ env var directly.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const analyzeCulturalFit = async (talentName: string, bio: string, transcript: string) => {
    if (!API_KEY) {
        throw new Error("VITE_GEMINI_API_KEY não configurada.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Você é um Expert em Recrutamento da 'Academia Lendária'.
    Sua missão é avaliar o Fit Cultural de um candidato baseando-se em sua Bio e na Transcrição de Entrevista/Vídeo.

    CONTEXTO DA EMPRESA:
    A Academia Lendária valoriza:
    1. Inteligência e Autoconhecimento (Capacidade de resolver problemas, evoluir, reconhecer verdades difíceis)
    2. Impacto e Arte (Zona de genialidade, orgulho do que cria, legado)
    3. Inteligência Artificial (Uso prático no dia a dia, mentalidade AI-First)
    
    CANDIDATO: ${talentName}
    BIO: ${bio}
    TRANSCRICÃO/TEXTO: ${transcript}

    Gere uma análise em formato MARKDOWN seguindo ESTRITAMENTE este modelo:

    # ANÁLISE DE FIT CULTURAL - ${talentName}

    ## 📊 AVALIAÇÃO DOS 3 PILARES

    **PILAR 1 - Inteligência e Autoconhecimento:** [Nota 0-10]/10
    - [Justificativa concisa baseada no texto]

    **PILAR 2 - Impacto e Arte:** [Nota 0-10]/10
    - [Justificativa concisa]

    **PILAR 3 - Inteligência Artificial:** [Nota 0-10]/10
    - [Justificativa concisa]

    **PONTUAÇÃO TOTAL DOS PILARES:** [Soma]/30

    ---

    ## ✅ GREEN FLAGS IDENTIFICADOS
    - [x] [Exemplo positivo 1]
    - [x] [Exemplo positivo 2]

    ---

    ## 🚩 RED FLAGS IDENTIFICADOS
    - [ ] [Red flag 1 ou "Nenhum identificado"]

    ---

    ## 🎯 VALORES EVIDENCIADOS
    - **[VALOR 1]:** [Explicação]
    - **[VALOR 2]:** [Explicação]
    `;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Erro na análise cultural:", error);
        throw error;
    }
};

export const analyzeJobMatch = async (talent: any, jobs: any[]) => {
    if (!API_KEY) {
        throw new Error("VITE_GEMINI_API_KEY não configurada.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Using flash for speed

    const jobsData = JSON.stringify(jobs.map(j => ({ id: j.id, title: j.title, mission: j.mission, skills: j.responsibilities })));
    const talentData = JSON.stringify({
        role: talent.role,
        bio: talent.bio,
        skills: talent.tags,
        products: talent.products
    });

    const prompt = `
    Atue como um AI Matchmaker Recruiter.
    
    CANDIDATO:
    ${talentData}

    VAGAS DISPONÍVEIS:
    ${jobsData}

    Analise a compatibilidade deste candidato com CADA uma das vagas.
    Retorne APENAS um JSON array puro (sem markdown code blocks) no seguinte formato:
    [
        {
            "jobId": "id_da_vaga",
            "score": number (0-100),
            "reason": "Explicação curta e persuasiva de 1 frase sobre o match."
        }
    ]
    `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        // Clean markdown if present
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Erro no AI Match:", error);
        return [];
    }
};
