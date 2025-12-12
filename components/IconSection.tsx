import React from 'react';
import { Icon } from './ui/icon';
import { Symbol } from './ui/symbol';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

const IconSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-fade-in">
      <div>
        <h2 className="text-4xl font-serif font-light mb-4">Ícones & Símbolos</h2>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
           A Academia Lendár[IA] utiliza o <strong className="text-foreground">Flaticon UIcons Regular Rounded</strong> para UI e símbolos Unicode específicos para a marca.
           <br/><br/>
           <Badge variant="destructive" className="mr-2">PROIBIDO</Badge> 
           Jamais utilize emojis.
        </p>
      </div>

      <div className="p-12 border border-border rounded-xl flex flex-col items-center justify-center bg-muted/30">
        <Symbol name="infinity" className="text-9xl text-foreground mb-6" />
        <p className="font-serif italic text-muted-foreground text-center">
            "Simétrico, poderoso, eterno. Oito."
        </p>
      </div>

      <div>
        <h3 className="text-xl font-sans font-semibold mb-8">Flaticon UIcons (Regular Rounded)</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-8">
            {['home', 'search', 'user', 'settings', 'envelope', 'bell', 'menu-burger', 'cross', 'arrow-right', 'check', 'info', 'exclamation', 'star', 'heart', 'share', 'download'].map((name) => (
                <div key={name} className="flex flex-col items-center gap-3 group">
                    <div className="p-4 rounded-xl bg-card border border-transparent group-hover:border-primary transition-all duration-300">
                        <Icon name={name} size="size-6" className="text-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{name}</span>
                </div>
            ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-sans font-semibold mb-8">Símbolos da Marca (Unicode)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="p-6 flex flex-col items-center justify-center gap-4">
                 <Symbol name="infinity" className="text-4xl text-primary" />
                 <span className="font-mono text-sm">Brand Mark</span>
            </Card>
            <Card className="p-6 flex flex-col items-center justify-center gap-4">
                 <Symbol name="star" className="text-4xl text-foreground" />
                 <span className="font-mono text-sm">Destaque</span>
            </Card>
            <Card className="p-6 flex flex-col items-center justify-center gap-4">
                 <Symbol name="diamond" className="text-4xl text-foreground" />
                 <span className="font-mono text-sm">Lista</span>
            </Card>
            <Card className="p-6 flex flex-col items-center justify-center gap-4">
                 <Symbol name="bullet" className="text-4xl text-muted-foreground" />
                 <span className="font-mono text-sm">Separador</span>
            </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg bg-success/10 border border-success/20">
              <h4 className="font-sans font-bold text-success-foreground mb-4 flex items-center gap-2">
                  <Icon name="check-circle" size="size-5" /> Do
              </h4>
              <ul className="text-sm space-y-2 text-success-foreground/80 font-medium">
                  <li className="flex items-center gap-2"><Symbol name="diamond" className="text-[10px]" /> Use UIcons para toda interface.</li>
                  <li className="flex items-center gap-2"><Symbol name="diamond" className="text-[10px]" /> Use Unicode para badges e listas.</li>
                  <li className="flex items-center gap-2"><Symbol name="diamond" className="text-[10px]" /> Simple Icons para redes sociais.</li>
              </ul>
          </div>
          <div className="p-6 rounded-lg bg-destructive/10 border border-destructive/20">
              <h4 className="font-sans font-bold text-destructive-foreground mb-4 flex items-center gap-2">
                  <Icon name="cross-circle" size="size-5" /> Don't
              </h4>
              <ul className="text-sm space-y-2 text-destructive-foreground/80 font-medium">
                  <li className="flex items-center gap-2"><Icon name="cross" size="size-3" /> NÃO use Emojis. Jamais.</li>
                  <li className="flex items-center gap-2"><Icon name="cross" size="size-3" /> Evite Lucide ou FontAwesome.</li>
                  <li className="flex items-center gap-2"><Icon name="cross" size="size-3" /> Não misture estilos de ícones.</li>
              </ul>
          </div>
      </div>
    </div>
  );
};

export default IconSection;