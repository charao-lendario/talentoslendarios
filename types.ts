
export enum Section {
  CONCEPT = 'Conceito',
  DOCS = 'Documentação',
  AI_MANUAL = 'Manual de Integração IA',
  IDENTITY = 'Identidade Verbal',
  LEGENDARY_VS_MEDIOCRE = 'Lendário vs Medíocre',
  COLORS = 'Cores',
  TYPOGRAPHY = 'Tipografia',
  SPACING = 'Espaçamentos',
  ICONS = 'Ícones',
  COMPONENTS = 'Componentes',
  CARDS = 'Cards & Boxes',
  FORMS = 'Formulários',
  TABLES = 'Tabelas',
  TALENTS_CANDIDATE = 'Talentos: Candidato',
  TALENTS_ADMIN = 'Talentos: Admin'
}

export interface ColorDefinition {
  name: string;
  hex: string;
  darkHex?: string;
  description?: string;
}

export interface TypeScale {
  label: string;
  size: string;
  px: number;
  weight: string;
}