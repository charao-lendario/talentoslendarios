import React from 'react';
import { TypeScale } from '../types';

const TypographySection: React.FC = () => {
  const typeScales: TypeScale[] = [
    { label: 'Hero / Display', size: 'text-7xl md:text-8xl', px: 96, weight: 'Bold' },
    { label: 'H1', size: 'text-5xl md:text-6xl', px: 60, weight: 'Bold' },
    { label: 'H2', size: 'text-4xl', px: 36, weight: 'Bold' },
    { label: 'H3', size: 'text-3xl', px: 30, weight: 'Bold' },
    { label: 'H4', size: 'text-2xl', px: 24, weight: 'SemiBold' },
    { label: 'UI Large', size: 'text-lg', px: 18, weight: 'SemiBold' },
    { label: 'Body / UI Base', size: 'text-base', px: 16, weight: 'SemiBold' },
    { label: 'Small', size: 'text-sm', px: 14, weight: 'SemiBold' },
    { label: 'Caption', size: 'text-xs', px: 12, weight: 'SemiBold' },
  ];

  return (
    <div className="space-y-16 animate-fade-in">
      <div>
        <h2 className="text-4xl font-serif font-light mb-4">Tipografia</h2>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Uma dupla tipográfica projetada para máxima legibilidade. <strong className="text-primary font-sans">Inter</strong> para UI (padrão SemiBold), <strong className="text-primary font-serif">Source Serif 4</strong> para textos longos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-8 border border-border rounded-lg">
            <span className="text-8xl font-sans font-bold block mb-4">Aa</span>
            <h3 className="text-2xl font-sans font-semibold mb-2">Inter</h3>
            <p className="text-muted-foreground font-sans">
                Títulos, UI & Chamadas de Ação.
                <br/>
                Peso padrão para UI: <span className="text-foreground font-bold">SemiBold (600)</span>
            </p>
        </div>
        <div className="p-8 border border-border rounded-lg">
            <span className="text-8xl font-serif font-normal block mb-4">Aa</span>
            <h3 className="text-2xl font-serif font-semibold mb-2">Source Serif 4</h3>
            <p className="text-muted-foreground font-serif">
                Textos longos, parágrafos e citações.
                <br/>
                Fluidez e leitura suave.
            </p>
        </div>
      </div>

      <div className="space-y-12">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-4">Escala Tipográfica</h3>
        
        <div className="space-y-8">
            {typeScales.map((type) => (
                <div key={type.px} className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 border-b border-border pb-8 last:border-0">
                    <div className="w-48 shrink-0">
                        <span className="block font-sans text-sm font-semibold text-primary">{type.label}</span>
                        <span className="block font-mono text-xs text-muted-foreground mt-1">{type.px}px / {type.weight}</span>
                    </div>
                    <div className={`font-sans leading-tight overflow-hidden text-ellipsis whitespace-nowrap ${type.size} ${type.weight === 'Bold' ? 'font-bold' : type.weight === 'SemiBold' ? 'font-semibold' : type.weight === 'Medium' ? 'font-medium' : 'font-normal'}`}>
                        Academia Lendária
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TypographySection;