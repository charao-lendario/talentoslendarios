import React from 'react';
import { Icon } from './ui/icon';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

interface Palette {
  name: string;
  main: string;
  dark: string;
  complements: string[];
  usageNote: string;
}

// Helper function to calculate color formats
const getColorFormats = (hex: string) => {
  // Remove hash
  const cleanHex = hex.replace('#', '');
  
  // Parse RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  // Calculate CMYK
  let c = 0, m = 0, y = 0, k = 0;
  
  // Normalize to [0, 1]
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;
  
  k = 1 - Math.max(rN, gN, bN);
  
  if (k < 1) {
    c = (1 - rN - k) / (1 - k);
    m = (1 - gN - k) / (1 - k);
    y = (1 - bN - k) / (1 - k);
  } else {
    c = 0; m = 0; y = 0; // Black
  }

  return {
    hex: `#${cleanHex.toUpperCase()}`,
    rgb: `${r}, ${g}, ${b}`,
    cmyk: `${Math.round(c * 100)}, ${Math.round(m * 100)}, ${Math.round(y * 100)}, ${Math.round(k * 100)}`
  };
}

const ColorSection: React.FC<{ isDark: boolean }> = ({ isDark }) => {

  const grayscale = [
    "#FFFFFF", "#F8F8F8", "#E8E8E8", "#D8D8D8", "#C8C8C8", 
    "#B8B8B8", "#A8A8A8", "#969696", "#888888", "#808080", 
    "#727272", "#646464", "#565656", "#484848", "#404040", 
    "#323232", "#242424", "#161616", "#000000"
  ];

  // 1. Primary
  const primaryPalette: Palette = {
    name: "Gold (Primary)",
    main: "#C9B298",
    dark: "#C9B298",
    complements: [
      "#F2EBE4", "#E4D8CA", "#D7C5B1", "#C9B298", "#BAA080", 
      "#AC8E68", "#8D7556", "#6F5D45", "#534635", "#383025"
    ],
    usageNote: "COR PRINCIPAL DA MARCA — reservada para CTAs primários, badges de conquista, elementos que precisam de máximo destaque. Respeitar regra dos 8%: nunca mais que 8% da área visual. Evitar como texto (baixo contraste) — preferir para ícones."
  };

  // 2. System / Semantic Colors
  const systemPalettes: Palette[] = [
    {
      name: "Red (Critical)",
      main: "#FF3B30",
      dark: "#FF453A",
      complements: [
        "#FF6650", "#FF8871", "#FFA793", "#FFC5B6", "#FFE2DA",
        "#D13529", "#A42E23", "#7A261C", "#511D16", "#2C140D"
      ],
      usageNote: "Reservada para estados críticos — erros de validação, alertas destrutivos, ações irreversíveis. Usar com moderação: o vermelho ativa resposta de urgência. Nunca decorativo."
    },
    {
      name: "Orange (Warning)",
      main: "#FF9500",
      dark: "#FF9F0A",
      complements: [
        "#FFA641", "#FFB869", "#FFC98E", "#FFDBB4", "#FFEDD9",
        "#D07B0D", "#A46112", "#794913", "#513211", "#2C1C0C"
      ],
      usageNote: "Cor de atenção moderada — avisos não-críticos, lembretes de prazo, status \"pendente\". Menos alarmante que vermelho. Ideal para upgrades e avisos de expiração."
    },
    {
      name: "Yellow (Attention)",
      main: "#FFCC00",
      dark: "#FED60A",
      complements: [
        "#FFD44A", "#FFDC72", "#FFE596", "#FFEDB9", "#FFF6DC",
        "#D0A711", "#A38317", "#796117", "#504015", "#2B230F"
      ],
      usageNote: "NUNCA usar como texto. Exclusiva para highlights, tooltips de dica, badges \"Beta\". Sempre com texto preto sobre ela."
    },
    {
      name: "Green (Success)",
      main: "#34C759",
      dark: "#30D158",
      complements: [
        "#64D175", "#88DB90", "#A8E5AB", "#C5EEC7", "#E3F7E3",
        "#30A34B", "#2B803D", "#255F2F", "#1D4022", "#142315"
      ],
      usageNote: "Exclusiva para feedback positivo — confirmações, status \"ativo\", métricas de crescimento. Evitar uso decorativo para não diluir o significado de \"sucesso\"."
    },
    {
      name: "Blue (Info/Links)",
      main: "#007AFF",
      dark: "#0A84FF",
      complements: [
        "#608EFF", "#89A3FF", "#ABB9FF", "#C9D0FF", "#E4E7FF",
        "#1B65D0", "#2150A2", "#213C77", "#1C2A4F", "#141829"
      ],
      usageNote: "Cor universal e segura. Usada para links, informações neutras, elementos de ajuda e visualização de dados."
    },
  ];

  // 3. Brand / Niche Colors
  const nichePalettes: Palette[] = [
    {
      name: "Mint",
      main: "#00C7BE",
      dark: "#63E6E2",
      complements: [
        "#58D1C9", "#82DAD3", "#A4E4DE", "#C4EDE9", "#E2F6F4",
        "#18A39B", "#1E807A", "#28605D", "#1A403D", "#132321"
      ],
      usageNote: "Bem-estar, frescor e saúde. Ideal para métricas de wellness e indicadores de \"novo\". Transmite leveza."
    },
    {
      name: "Teal",
      main: "#30B0C7",
      dark: "#40C8E0",
      complements: [
        "#62BDD0", "#87CAD9", "#A7D7E3", "#C5E5EC", "#E2F2F6",
        "#2E90A3", "#2A7280", "#24555F", "#1D393F", "#142022"
      ],
      usageNote: "Tom corporativo e profissional. Ideal para features B2B, comunicação e dashboards analíticos."
    },
    {
      name: "Cyan",
      main: "#32ADE6",
      dark: "#64D2FF",
      complements: [
        "#67BAEA", "#8CC8EF", "#ABD5F3", "#C8E3F7", "#E4F1FB",
        "#308EBC", "#2C7093", "#26536C", "#1E3848", "#141F26"
      ],
      usageNote: "Tecnologia, IA e inovação. Badges \"Gerado por IA\" e automação. Evitar em contextos tradicionais."
    },
    {
      name: "Indigo",
      main: "#5856D6",
      dark: "#5E5CE6",
      complements: [
        "#7B70DE", "#988BE5", "#B4A7EC", "#CEC4F3", "#E7E1F9",
        "#4B48AF", "#3E3A89", "#312D65", "#242044", "#171424"
      ],
      usageNote: "Premium, exclusividade e criatividade. Reservar para badges \"Pro/VIP\" e upsells."
    },
    {
      name: "Pink",
      main: "#FF2D55",
      dark: "#FF375F",
      complements: [
        "#FF5F6F", "#FF848A", "#FFA4A6", "#FFC3C3", "#FFE1E0",
        "#D12B47", "#A42839", "#79222C", "#511B20", "#2C1313"
      ],
      usageNote: "Alta energia. Trending, likes e social. Usar com moderação, cor muito chamativa."
    },
    {
      name: "Brown",
      main: "#A2845E",
      dark: "#AC8E68",
      complements: [
        "#B29777", "#C2AB91", "#D2C0AC", "#E1D4C7", "#F0E9E3",
        "#856D4E", "#69563F", "#4F4130", "#362D22", "#1E1A15"
      ],
      usageNote: "Tradição e luxo discreto. Elementos orgânicos, heritage e produtos naturais. Accent quente."
    }
  ];

  // Reusable Component for Rendering a Palette Card
  const PaletteCard: React.FC<{ palette: Palette }> = ({ palette }) => (
    // Removed 'overflow-hidden' from here to let tooltips overflow
    <div className="flex flex-col md:flex-row gap-0 border border-border rounded-2xl bg-card shadow-sm hover:shadow-md transition-shadow">
        
        {/* Left: Main Swatch Area */}
        <div className="w-full md:w-1/3 shrink-0 flex flex-col">
             <div 
                // Added specific rounded corners to maintain the card look without parent overflow:hidden
                className="flex-1 min-h-[200px] p-8 flex flex-col justify-between text-white relative group rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden"
                style={{ backgroundColor: isDark ? palette.dark : palette.main }}
            >
                <div className="relative z-10">
                    <h4 className="text-2xl font-bold font-sans drop-shadow-md">{palette.name}</h4>
                    <span className="opacity-90 font-mono text-xs uppercase tracking-widest drop-shadow-sm">
                        {isDark ? 'Dark Mode' : 'Light Mode'}
                    </span>
                </div>
                
                <div className="relative z-10 flex items-end justify-between">
                    <span className="font-mono text-xl font-bold tracking-wider drop-shadow-md">
                        {isDark ? palette.dark : palette.main}
                    </span>
                    <Icon name="copy" className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer drop-shadow-md" size="size-5" />
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-white/10 pointer-events-none"></div>
            </div>
        </div>

        {/* Right: Info & Complements */}
        <div className="flex-1 flex flex-col rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
            
            {/* Top: Usage Note */}
            <div className="p-8 flex-1">
                <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs font-bold text-muted-foreground border-foreground/20">
                        <Icon name="info" size="size-3" className="mr-1" /> Nota de Uso
                    </Badge>
                </div>
                <p className="font-serif text-muted-foreground leading-relaxed text-sm">
                    {palette.usageNote}
                </p>
            </div>

            {/* Bottom: Separator & Complements */}
            <div className="border-t border-border bg-muted/10 p-6 rounded-b-2xl md:rounded-br-2xl md:rounded-bl-none">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Icon name="palette" size="size-3" /> Paleta Complementar
                    </h5>
                    <span className="text-[10px] text-muted-foreground font-mono opacity-50">RGB • HEX • CMYK</span>
                </div>
                
                <div className="grid grid-cols-10 gap-1 h-12">
                    {palette.complements.map((hex, i) => {
                        const formats = getColorFormats(hex);
                        return (
                            // Removed overflow-hidden from the grid item wrapper so absolute tooltip can be seen
                            <div key={i} className="group relative h-full w-full cursor-pointer">
                                <div 
                                    className="h-full w-full transition-transform duration-200 group-hover:scale-110 first:rounded-l-md last:rounded-r-md"
                                    style={{ backgroundColor: hex }}
                                ></div>
                                {/* Detailed Tooltip on Hover */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-32 bg-popover text-popover-foreground rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-border">
                                    <div className="p-2 space-y-1">
                                        <div className="w-full h-2 rounded-sm mb-2" style={{ backgroundColor: hex }}></div>
                                        <div className="flex justify-between items-center text-[9px] font-mono border-b border-border/20 pb-1">
                                            <span className="opacity-60">HEX</span>
                                            <span className="font-bold">{formats.hex}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[9px] font-mono border-b border-border/20 pb-1">
                                            <span className="opacity-60">RGB</span>
                                            <span>{formats.rgb}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[9px] font-mono">
                                            <span className="opacity-60">CMYK</span>
                                            <span>{formats.cmyk}</span>
                                        </div>
                                    </div>
                                    {/* Arrow */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-popover"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="space-y-24 animate-fade-in pb-20">
      
      {/* Intro */}
      <section>
        <div className="mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight">Cores Lendárias.</h2>
            <p className="font-serif text-xl text-muted-foreground max-w-3xl leading-relaxed">
                Simples. Preciso. Funcional. A cor aparece apenas onde faz sentido, guiando a experiência sem comprometer a estética minimalista.
            </p>
        </div>

        {/* 8% Rule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-8 border border-border rounded-2xl bg-card">
            <div className="flex items-center justify-center">
                <div className="relative w-48 h-48 rounded-full bg-secondary flex items-center justify-center border-4 border-muted">
                    <div className="absolute inset-0 rounded-full border-4 border-primary" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 30%, 50% 50%)', transform: 'rotate(-45deg)' }}></div>
                    <div className="flex flex-col items-center">
                        <span className="text-5xl font-bold text-primary font-sans">8%</span>
                    </div>
                    <div className="absolute right-0 top-1/2 w-16 h-px bg-foreground -mr-16 translate-x-4 md:block hidden"></div>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-xl font-bold font-sans">A Regra dos 8%</h3>
                <p className="text-muted-foreground font-serif leading-relaxed">
                    <strong className="text-foreground">Nada em excesso. Nada sem motivo.</strong><br/>
                    8% é o máximo que a cor pode ocupar em uma Tela, Arte ou Aplicação. O restante deve ser respirado pelo background e tipografia.
                </p>
            </div>
        </div>
      </section>

      {/* Grayscale */}
      <section className="space-y-6">
        <h3 className="text-2xl font-sans font-bold flex items-center gap-2">
            <Icon name="palette" /> Escala Monocromática
        </h3>
        <p className="text-muted-foreground font-serif">Do branco ao preto, cada tom de cinza é calculado em múltiplos de 8.</p>
        <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
            <div className="flex min-w-max">
                {grayscale.map((hex, index) => (
                    <div key={index} className="flex flex-col items-center group">
                         <div 
                            className="w-12 h-24 first:rounded-l-lg last:rounded-r-lg border-y border-border first:border-l last:border-r relative transition-transform hover:z-10 hover:scale-110 hover:shadow-lg cursor-pointer"
                            style={{ backgroundColor: hex }}
                            title={hex}
                         />
                         <span className="text-[10px] font-mono mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground uppercase">{hex}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* SECTION 1: PRIMARY COLOR */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-border pb-4">
            <h3 className="text-3xl font-sans font-bold flex items-center gap-3">
                <Icon name="crown" className="text-brand-gold" /> Cor Primária
            </h3>
            <span className="text-sm font-serif text-muted-foreground">A identidade central</span>
        </div>
        <div className="grid grid-cols-1">
            <PaletteCard palette={primaryPalette} />
        </div>
      </section>

      {/* SECTION 2: SYSTEM COLORS */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-border pb-4">
            <h3 className="text-2xl font-sans font-bold flex items-center gap-3">
                <Icon name="traffic-light" /> Cores do Sistema
            </h3>
            <span className="text-sm font-serif text-muted-foreground">Alertas, Avisos, Sucesso & Informação</span>
        </div>
        <div className="grid grid-cols-1 gap-8">
            {systemPalettes.map((palette) => (
                <PaletteCard key={palette.name} palette={palette} />
            ))}
        </div>
      </section>

      {/* SECTION 3: NICHE COLORS */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-border pb-4">
             <h3 className="text-2xl font-sans font-bold flex items-center gap-3">
                <Icon name="apps" /> Cores de Nicho & Marca
            </h3>
            <span className="text-sm font-serif text-muted-foreground">Categorias e Identidade Visual</span>
        </div>
        <div className="grid grid-cols-1 gap-8">
            {nichePalettes.map((palette) => (
                <PaletteCard key={palette.name} palette={palette} />
            ))}
        </div>
      </section>

      {/* Footer Note */}
      <section className="border-t border-border pt-8 mt-12">
        <div className="bg-card p-8 rounded-xl border border-dashed border-border flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                <Icon name="exclamation" size="size-6" />
            </div>
            <div>
                <h4 className="text-lg font-bold font-sans mb-2">Atenção sobre Complementares</h4>
                <p className="font-serif text-muted-foreground leading-relaxed">
                    As cores complementares (shades) exibidas nas paletas acima devem ser usadas estritamente para estados de interação (hover, active, focus), bordas sutis ou fundos de baixa opacidade. Elas <strong>nunca</strong> devem dominar a hierarquia visual sobre a cor principal.
                </p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ColorSection;