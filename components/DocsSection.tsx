import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Icon } from './ui/icon';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Symbol } from './ui/symbol';

const CodeBlock: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
    <div className="rounded-lg overflow-hidden border border-border bg-[#1e1e1e] text-[#d4d4d4] my-4 shadow-sm group relative">
        {title && (
            <div className="bg-[#252526] px-4 py-2 border-b border-[#3e3e42] text-xs font-mono text-[#858585] flex items-center justify-between">
                <div className="flex items-center gap-2">
                     <Icon name="file-code" size="size-3" className="text-brand-gold" />
                     {title}
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase font-bold tracking-wider text-brand-gold select-none">Copy</span>
            </div>
        )}
        <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed custom-scrollbar whitespace-pre-wrap selection:bg-brand-gold/30 selection:text-white">
            {children}
        </div>
    </div>
);

const DocsSection: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      
      {/* Technical Header */}
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Icon name="book-alt" className="text-[12rem] -rotate-12" />
          </div>
          <div className="relative z-10 p-8 md:p-12 space-y-6">
              <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/50 text-primary">v4.1.0</Badge>
                  <span className="text-xs font-mono text-muted-foreground">Build: Production Ready</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight max-w-4xl">
                Documentação <span className="text-primary">Técnica</span>.
              </h2>
              <p className="font-serif text-xl text-muted-foreground max-w-3xl leading-relaxed">
                  Arquitetura, padrões de código, tokens de design e configurações de ambiente para o ecossistema da Academia Lendária.
              </p>
          </div>
          {/* Gradient Line */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-background to-primary/20"></div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="architecture" className="w-full">
        <TabsList className="mb-8 flex-wrap h-auto gap-2 bg-transparent p-0 border-b border-border w-full justify-start rounded-none">
            <TabsTrigger value="architecture" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 px-6 py-3">
                <Icon name="folder-tree" className="mr-2 size-4" /> Arquitetura & Estrutura
            </TabsTrigger>
            <TabsTrigger value="tokens" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 px-6 py-3">
                <Icon name="palette" className="mr-2 size-4" /> Design Tokens (CSS)
            </TabsTrigger>
             <TabsTrigger value="conventions" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 px-6 py-3">
                <Icon name="check-circle" className="mr-2 size-4" /> Padrões de Código
            </TabsTrigger>
        </TabsList>

        {/* --- ABA 1: ARQUITETURA --- */}
        <TabsContent value="architecture" className="space-y-8 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Árvore de Diretórios</CardTitle>
                        <CardDescription>Organização lógica do diretório <code className="font-mono text-primary">src</code></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="font-mono text-sm space-y-1 bg-[#1e1e1e] text-[#d4d4d4] p-6 rounded-lg shadow-inner">
                            <div className="flex items-center gap-2 text-white font-bold"><Icon name="folder" /> src/</div>
                            <div className="pl-6 border-l border-white/10 space-y-1">
                                
                                {/* Components */}
                                <div className="flex items-center gap-2 text-primary"><Icon name="folder" /> components/</div>
                                <div className="pl-6 border-l border-white/10 space-y-1">
                                     <div className="flex items-center gap-2 text-brand-gold"><Icon name="folder" /> ui/ <span className="text-zinc-500 text-xs font-sans italic ml-2">// Atomic Components (Radix/Shadcn)</span></div>
                                     <div className="flex items-center gap-2"><Icon name="document" /> Sidebar.tsx</div>
                                     <div className="flex items-center gap-2"><Icon name="document" /> [Sections].tsx <span className="text-zinc-500 text-xs font-sans italic ml-2">// Feature Pages</span></div>
                                </div>
                                
                                {/* Lib */}
                                <div className="flex items-center gap-2 text-primary pt-2"><Icon name="folder" /> lib/</div>
                                <div className="pl-6 border-l border-white/10 space-y-1">
                                     <div className="flex items-center gap-2"><Icon name="document" /> utils.ts <span className="text-zinc-500 text-xs font-sans italic ml-2">// Tailwind Merge Helper</span></div>
                                </div>
                                
                                {/* Root Files */}
                                <div className="flex items-center gap-2 pt-2"><Icon name="document" /> App.tsx <span className="text-zinc-500 text-xs font-sans italic ml-2">// Main Router/Layout</span></div>
                                <div className="flex items-center gap-2"><Icon name="document" /> types.ts <span className="text-zinc-500 text-xs font-sans italic ml-2">// Global Interfaces</span></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="bg-muted/10 border-dashed">
                        <CardHeader>
                            <CardTitle className="text-base">Stack Tecnológica</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                             <div className="flex justify-between items-center border-b border-border/50 pb-2">
                                 <span className="text-sm font-semibold">Framework</span>
                                 <Badge variant="outline">React 18 + Vite</Badge>
                             </div>
                             <div className="flex justify-between items-center border-b border-border/50 pb-2">
                                 <span className="text-sm font-semibold">Estilização</span>
                                 <Badge variant="outline">Tailwind CSS 3.4</Badge>
                             </div>
                             <div className="flex justify-between items-center border-b border-border/50 pb-2">
                                 <span className="text-sm font-semibold">Ícones</span>
                                 <Badge variant="outline">Flaticon UIcons (Webfont)</Badge>
                             </div>
                             <div className="flex justify-between items-center pb-2">
                                 <span className="text-sm font-semibold">Tipografia</span>
                                 <Badge variant="outline">Inter + Source Serif 4</Badge>
                             </div>
                        </CardContent>
                    </Card>

                    <Alert>
                        <Icon name="info" size="size-5" />
                        <AlertTitle>Abordagem Atomic Design</AlertTitle>
                        <AlertDescription className="text-xs">
                            Os componentes em <code>ui/</code> são átomos puros, sem lógica de negócio. Componentes de seção (ex: <code>FormSection</code>) atuam como organismos que compõem os átomos.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </TabsContent>

        {/* --- ABA 2: TOKENS --- */}
        <TabsContent value="tokens" className="space-y-8 animate-fade-in">
             <Card>
                <CardHeader>
                    <CardTitle>Sistema de Variáveis CSS</CardTitle>
                    <CardDescription>O "motor" de temas do sistema. Definido em <code>index.html</code> (style tag) ou <code>global.css</code>.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1 space-y-4">
                             <p className="text-sm text-muted-foreground font-serif">
                                Utilizamos variáveis CSS nativas para permitir troca de temas em tempo de execução (Runtime Theming) sem re-compilação do Tailwind. Os valores usam o formato HSL sem vírgulas para compatibilidade com o modificador de opacidade do Tailwind.
                            </p>
                            <CodeBlock title=":root (Theme Definition)">
                                :root &#123;<br/>
                                &nbsp;&nbsp;/* Base format: H S% L% */<br/>
                                &nbsp;&nbsp;--primary: 32 27% 69%;      /* #C9B298 */<br/>
                                &nbsp;&nbsp;--primary-foreground: 30 20% 11%;<br/><br/>
                                &nbsp;&nbsp;--background: 0 0% 100%;<br/>
                                &nbsp;&nbsp;--foreground: 0 0% 9%;<br/>
                                &nbsp;&nbsp;--muted: 0 0% 96%;<br/>
                                &nbsp;&nbsp;--muted-foreground: 0 0% 45%;<br/>
                                &#125;<br/><br/>
                                .dark &#123;<br/>
                                &nbsp;&nbsp;--background: 0 0% 0%;<br/>
                                &nbsp;&nbsp;--foreground: 0 0% 98%;<br/>
                                &#125;
                            </CodeBlock>
                        </div>

                        {/* Visual Token Representation */}
                        <div className="w-full md:w-1/3 bg-muted/20 p-6 rounded-xl border border-border">
                            <h5 className="font-bold text-sm mb-4">Mapeamento Visual</h5>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono">bg-background</span>
                                    <div className="w-24 h-6 rounded bg-background border border-border"></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono">bg-card</span>
                                    <div className="w-24 h-6 rounded bg-card border border-border shadow-sm"></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono">bg-primary</span>
                                    <div className="w-24 h-6 rounded bg-primary"></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono">bg-muted</span>
                                    <div className="w-24 h-6 rounded bg-muted"></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono">bg-destructive</span>
                                    <div className="w-24 h-6 rounded bg-destructive"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        {/* --- ABA 3: PADRÕES (Conventions) --- */}
        <TabsContent value="conventions" className="space-y-8 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                     <h3 className="text-lg font-bold">1. Importação de Ícones</h3>
                     <p className="text-sm text-muted-foreground">
                         Não importamos ícones SVG individualmente. Usamos um componente wrapper que mapeia para a fonte de ícones Flaticon.
                     </p>
                     <div className="space-y-2">
                         <div className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900 rounded-md text-xs font-mono text-red-600 dark:text-red-400">
                             <span className="font-bold">ERRADO:</span> import &#123; Home &#125; from 'lucide-react';
                         </div>
                         <div className="p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900 rounded-md text-xs font-mono text-green-600 dark:text-green-400">
                             <span className="font-bold">CORRETO:</span> import &#123; Icon &#125; from './ui/icon';
                         </div>
                     </div>
                 </div>

                 <div className="space-y-6">
                     <h3 className="text-lg font-bold">2. Utilitário cn()</h3>
                     <p className="text-sm text-muted-foreground">
                         Sempre use a função <code>cn()</code> para classes condicionais ou mesclagem de props. Ela combina <code>clsx</code> e <code>tailwind-merge</code>.
                     </p>
                     <CodeBlock>
                         &lt;div className=&#123;cn(<br/>
                         &nbsp;&nbsp;"flex items-center p-4",<br/>
                         &nbsp;&nbsp;isActive ? "bg-primary text-white" : "bg-muted",<br/>
                         &nbsp;&nbsp;className // Prop externa<br/>
                         )&#125; /&gt;
                     </CodeBlock>
                 </div>
             </div>
        </TabsContent>

      </Tabs>

    </div>
  );
};

export default DocsSection;