import React, { useState, useEffect } from 'react';
import { Section } from './types';
import Sidebar from './components/Sidebar';
import DocsSection from './components/DocsSection';
import AiManualSection from './components/AiManualSection';
import ColorSection from './components/ColorSection';
import TypographySection from './components/TypographySection';
import SpacingSection from './components/SpacingSection';
import IconSection from './components/IconSection';
import ComponentSection from './components/ComponentSection';
import CardsSection from './components/CardsSection';
import FormSection from './components/FormSection';
import TableSection from './components/TableSection';
import IdentitySection from './components/IdentitySection';
import LegendaryVsMediocreSection from './components/LegendaryVsMediocreSection';
import TalentsSection from './components/TalentsSection'; // New Import
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Symbol } from './components/ui/symbol';
import { Icon } from './components/ui/icon';
import { cn } from './lib/utils';
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator, 
  BreadcrumbPage 
} from './components/ui/breadcrumb';

// --- THEME DEFINITIONS ---
// Values must be in HSL format (Hue Sat% Light%) to match index.html CSS variables.
export const THEMES = {
  Gold: {
    label: 'Original',
    primary: '32 27% 69%',         // #C9B298
    foreground: '30 20% 11%',      // Dark Brown
    hex: '#C9B298'
  },
  Blue: {
    label: 'Tech Blue',
    primary: '211 100% 50%',       // #007AFF
    foreground: '0 0% 100%',       // White
    hex: '#007AFF'
  },
  Green: {
    label: 'Growth',
    primary: '142 69% 49%',        // #34C759
    foreground: '0 0% 100%',       // White
    hex: '#34C759'
  },
  Red: {
    label: 'Power',
    primary: '4 90% 58%',          // Adjusted Red
    foreground: '0 0% 100%',       // White
    hex: '#EF4444'
  },
  Indigo: {
    label: 'Magic',
    primary: '242 65% 59%',        // #5856D6
    foreground: '0 0% 100%',       // White
    hex: '#5856D6'
  },
  Rose: {
    label: 'Vibrant',
    primary: '349 100% 59%',       // #FF2D55
    foreground: '0 0% 100%',       // White
    hex: '#FF2D55'
  }
};

export type ThemeName = keyof typeof THEMES;

// Breadcrumb Hierarchy Mapping
const sectionHierarchy: Record<Section, { category?: string; label: string }> = {
  [Section.CONCEPT]: { label: 'Visão Geral' },
  [Section.DOCS]: { category: 'Documentação', label: 'Técnica' },
  [Section.AI_MANUAL]: { category: 'Documentação', label: 'Manual IA' },
  [Section.IDENTITY]: { category: 'Identidade Verbal', label: 'Identidade' },
  [Section.LEGENDARY_VS_MEDIOCRE]: { category: 'Identidade Verbal', label: 'Lendário vs Medíocre' },
  [Section.COLORS]: { category: 'Interface', label: 'Cores' },
  [Section.TYPOGRAPHY]: { category: 'Interface', label: 'Tipografia' },
  [Section.SPACING]: { category: 'Interface', label: 'Espaçamentos' },
  [Section.ICONS]: { category: 'Interface', label: 'Ícones' },
  [Section.COMPONENTS]: { category: 'Interface', label: 'Componentes' },
  [Section.CARDS]: { category: 'Interface', label: 'Cards & Boxes' },
  [Section.FORMS]: { category: 'Interface', label: 'Formulários' },
  [Section.TABLES]: { category: 'Interface', label: 'Tabelas' },
  [Section.TALENTS_CANDIDATE]: { category: 'Talentos Lendários', label: 'Área do Talento' },
  [Section.TALENTS_ADMIN]: { category: 'Talentos Lendários', label: 'Área do Recrutador' },
};

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.CONCEPT);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('Gold');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check system preference on load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  // Handle Dark Mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Handle Theme Color Changes
  useEffect(() => {
    const theme = THEMES[currentTheme];
    const root = document.documentElement;
    
    // Update CSS Variables dynamically
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-foreground', theme.foreground);
    root.style.setProperty('--ring', theme.primary);
    
    // Also update Accent to match primary in this system design
    root.style.setProperty('--accent', theme.primary);
    root.style.setProperty('--accent-foreground', theme.foreground);

  }, [currentTheme]);

  const toggleTheme = () => setIsDark(!isDark);

  const currentInfo = sectionHierarchy[currentSection];

  const renderContent = () => {
    switch (currentSection) {
      case Section.CONCEPT:
        return (
          <div className="animate-fade-in space-y-12">
            <div className="py-12 md:py-24 flex flex-col justify-center items-center text-center">
                <Badge className="mb-8">
                    <Symbol name="infinity" className="mr-2" />
                    Design System v4.1
                </Badge>
                
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold tracking-tight mb-6">
                    Academia Lendár<span className="text-primary font-normal">[IA]</span>
                </h1>
                
                <p className="font-serif text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mb-8 leading-relaxed px-4">
                    Simétrico, poderoso, eterno. Oito.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6">
                    <Button size="lg" className="w-full sm:w-auto" onClick={() => setCurrentSection(Section.COMPONENTS)}>
                        Explorar Componentes <Icon name="arrow-right" className="ml-2" size="size-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => setCurrentSection(Section.COLORS)}>
                        Ver Cores
                    </Button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto px-4">
                <div className="space-y-4 border-l-2 border-primary pl-6">
                    <h3 className="text-2xl font-sans font-bold flex items-center gap-2">
                        <Symbol name="infinity" className="text-primary" /> Equilíbrio
                    </h3>
                    <p className="font-serif text-lg text-muted-foreground leading-relaxed">
                        O Número 8 é frequentemente associado ao equilíbrio, devido à sua simetria. Quando deitado, torna-se o símbolo do infinito.
                    </p>
                </div>
                <div className="space-y-4 border-l-2 border-primary pl-6">
                    <h3 className="text-2xl font-sans font-bold flex items-center gap-2">
                        <Symbol name="star" className="text-primary" /> Poder
                    </h3>
                    <p className="font-serif text-lg text-muted-foreground leading-relaxed">
                        Ele não termina, apenas continua. É o equilíbrio perfeito entre força e elegância.
                    </p>
                </div>
            </div>
          </div>
        );
      case Section.DOCS:
        return <DocsSection />;
      case Section.AI_MANUAL:
        return <AiManualSection />;
      case Section.IDENTITY:
        return <IdentitySection />;
      case Section.LEGENDARY_VS_MEDIOCRE:
        return <LegendaryVsMediocreSection />;
      case Section.COLORS:
        return <ColorSection isDark={isDark} />;
      case Section.TYPOGRAPHY:
        return <TypographySection />;
      case Section.SPACING:
        return <SpacingSection />;
      case Section.ICONS:
        return <IconSection />;
      case Section.COMPONENTS:
        return <ComponentSection />;
      case Section.CARDS:
        return <CardsSection />;
      case Section.FORMS:
        return <FormSection />;
      case Section.TABLES:
        return <TableSection />;
      case Section.TALENTS_CANDIDATE:
        return <TalentsSection initialView="landing" />;
      case Section.TALENTS_ADMIN:
        return <TalentsSection initialView="admin" />;
      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-background text-foreground overflow-x-hidden w-full">
      
      {/* Mobile Header (Visible only on mobile) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between transition-all w-full">
          <div className="flex items-center gap-2">
             <Symbol name="infinity" className="text-2xl text-primary" />
             <span className="font-sans font-bold text-lg tracking-tight">Lendár[IA]</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Icon name="menu-burger" size="size-5" />
          </Button>
      </div>

      <Sidebar 
        currentSection={currentSection} 
        setSection={setCurrentSection} 
        isDark={isDark}
        toggleTheme={toggleTheme}
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        currentThemeName={currentTheme}
        setThemeName={setCurrentTheme}
        isMobileOpen={isMobileMenuOpen}
        closeMobileMenu={() => setIsMobileMenuOpen(false)}
      />
      
      <main 
        className={cn(
            "flex-1 transition-all duration-300 w-full min-w-0 flex flex-col",
            // Responsive Margins
            isSidebarCollapsed ? "md:ml-20" : "md:ml-64",
            "ml-0",
            // Padding logic: Mobile (p-4) -> Tablet (p-8) -> Desktop (p-12 to p-24)
            // Reduced MD padding to avoid squeezing content when sidebar is open
            "p-4 pt-24 md:p-8 lg:p-12 xl:p-20"
        )}
      >
        <div className="max-w-6xl mx-auto flex flex-col min-h-[calc(100vh-12rem)] w-full">
             <div className="flex-1 w-full">
                {/* System Breadcrumbs - Only show if NOT on Concept/Home page */}
                {currentSection !== Section.CONCEPT && (
                  <div className="mb-8 hidden md:block">
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink 
                             onClick={() => setCurrentSection(Section.CONCEPT)} 
                             className="flex items-center gap-2"
                          >
                            <Icon name="home" size="size-3" />
                            <span className="sr-only">Home</span>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        
                        {currentInfo.category && (
                          <>
                            <BreadcrumbItem>
                              <span className="text-muted-foreground font-medium text-sm">{currentInfo.category}</span>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                          </>
                        )}
                        
                        <BreadcrumbItem>
                          <BreadcrumbPage className="font-semibold text-primary">
                            {currentInfo.label}
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                )}

                {renderContent()}
             </div>
             
             {/* Sticky Footer */}
             <footer className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs font-serif text-muted-foreground gap-4 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-2 justify-center md:justify-start">
                     <div className="flex items-center gap-2">
                        <Symbol name="infinity" className="text-primary text-sm" />
                        <span className="font-sans font-bold text-foreground">Academia Lendária</span>
                     </div>
                     <span className="hidden md:inline text-border">|</span>
                     <span className="opacity-80">Design System v4.1</span>
                </div>
                <div className="flex items-center gap-6 justify-center md:justify-end w-full md:w-auto">
                    <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => setCurrentSection(Section.DOCS)}>Documentação</span>
                    <span className="opacity-50">© 2025</span>
                </div>
             </footer>
        </div>
      </main>
    </div>
  );
};

export default App;