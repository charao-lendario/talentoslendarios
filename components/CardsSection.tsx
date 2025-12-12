import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Icon } from './ui/icon';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const CardsSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-fade-in">
      <div>
        <h2 className="text-4xl font-serif font-light mb-4">Cards & Contêineres</h2>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
           Superfícies versáteis para agrupar conteúdo. Explore variações de estrutura, mídia e interatividade.
        </p>
      </div>

      {/* --- GRUPO 1: BÁSICOS --- */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Estruturas Básicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Body Only (Simulated) */}
            <Card>
                <CardHeader>
                    <CardTitle>Título do Card</CardTitle>
                    <CardDescription>SUBTÍTULO</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground font-serif">
                        Exemplo de texto rápido para compor o conteúdo principal do card. Estrutura limpa focada em leitura.
                    </p>
                </CardContent>
                <CardFooter>
                     <Button variant="link" className="px-0">Link de Ação <Icon name="angle-small-right" /></Button>
                </CardFooter>
            </Card>

            {/* With Heading Feature */}
            <Card>
                <div className="px-6 py-3 border-b border-border bg-muted/20">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Destaque</span>
                </div>
                <CardHeader>
                    <CardTitle>Título Especial</CardTitle>
                    <CardDescription>SUBTÍTULO</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground font-serif">
                        Este card possui um cabeçalho dedicado para categorização ou metadados antes do conteúdo principal.
                    </p>
                </CardContent>
                <CardFooter>
                     <Button variant="link" className="px-0">Ver Detalhes <Icon name="angle-small-right" /></Button>
                </CardFooter>
            </Card>

            {/* With Complex Footer */}
            <Card>
                <CardHeader>
                    <CardTitle>Atualizações</CardTitle>
                    <CardDescription>STATUS DO SISTEMA</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground font-serif">
                         Conteúdo que requer uma validação temporal ou informação de rodapé contextual.
                    </p>
                </CardContent>
                <CardFooter className="bg-muted/10 border-t border-border mt-auto">
                     <p className="text-xs text-muted-foreground w-full text-center">Última atualização: 5 min atrás</p>
                </CardFooter>
            </Card>

        </div>
      </section>

      {/* --- GRUPO 2: MÍDIA --- */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Imagens & Mídia</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Image Cap (Top) */}
            <Card className="overflow-hidden">
                <div className="h-48 w-full bg-muted">
                    <img 
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" 
                        alt="Cyberpunk" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <CardHeader>
                    <CardTitle>Image Cap</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        A imagem ocupa toda a largura superior, ideal para posts de blog ou vitrines de produtos.
                    </p>
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-muted-foreground">Atualizado há pouco</p>
                </CardFooter>
            </Card>

            {/* Image Inside Body */}
            <Card>
                <CardContent className="pt-6">
                    <div className="h-40 w-full bg-muted rounded-md overflow-hidden mb-4">
                         <img 
                            src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop" 
                            alt="Abstract" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <CardTitle className="mb-2">Image Inside</CardTitle>
                    <p className="text-sm text-muted-foreground font-serif">
                        A imagem respeita o padding do card, criando uma moldura natural. Estilo comum em feeds de notícias.
                    </p>
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-muted-foreground">Postado hoje</p>
                </CardFooter>
            </Card>

             {/* Horizontal / Row Layout */}
             <Card className="flex flex-row overflow-hidden md:col-span-2 lg:col-span-1">
                 <div className="w-1/3 bg-muted shrink-0">
                      <img 
                            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop" 
                            alt="Side" 
                            className="w-full h-full object-cover"
                        />
                 </div>
                 <div className="flex flex-col justify-center p-4">
                     <h4 className="font-bold text-lg mb-1">Horizontal</h4>
                     <p className="text-xs text-muted-foreground font-serif mb-3">Layout lateral para listas.</p>
                     <Button size="sm" variant="outline" className="w-fit text-xs h-8">Ver</Button>
                 </div>
            </Card>
        </div>
      </section>

      {/* --- GRUPO 3: INTERATIVO & UTILITÁRIO --- */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Interativo & Utilitário</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Button Actions */}
            <Card>
                <div className="h-32 bg-gradient-to-r from-brand-blue to-brand-cyan"></div>
                <CardHeader>
                    <CardTitle>Ações Principais</CardTitle>
                    <CardDescription>CTA CARD</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground font-serif">
                        Focado em conversão. O footer contém botões de alta prioridade.
                    </p>
                </CardContent>
                <CardFooter className="gap-2">
                    <Button>Confirmar</Button>
                    <Button variant="ghost">Cancelar</Button>
                </CardFooter>
            </Card>

            {/* Alert Inside */}
            <Card>
                <CardHeader>
                    <span className="text-xs font-bold text-muted-foreground uppercase">Notificação</span>
                    <CardTitle>Card com Alerta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert variant="warning">
                        <Icon name="exclamation" size="size-4" />
                        <AlertTitle>Atenção</AlertTitle>
                        <AlertDescription>Sua assinatura expira em 3 dias.</AlertDescription>
                    </Alert>
                    <p className="text-sm text-muted-foreground font-serif">
                        Utilize alertas dentro de cards para destacar informações contextuais sem bloquear o fluxo.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button variant="link" className="px-0">Renovar Agora</Button>
                </CardFooter>
            </Card>

             {/* Navigation Tabs */}
             <Card className="md:col-span-2 lg:col-span-1">
                <Tabs defaultValue="account">
                    <div className="border-b border-border px-6 pt-4">
                        <TabsList className="w-full justify-start h-auto bg-transparent p-0">
                            <TabsTrigger value="account" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2 mr-4">
                                Conta
                            </TabsTrigger>
                            <TabsTrigger value="security" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2">
                                Segurança
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <CardContent className="pt-6">
                        <TabsContent value="account" className="mt-0 space-y-2 animate-fade-in">
                            <h4 className="font-bold text-sm">Dados da Conta</h4>
                            <p className="text-xs text-muted-foreground font-serif">Gerencie seus dados públicos aqui.</p>
                            <Button size="sm" className="mt-2">Editar Perfil</Button>
                        </TabsContent>
                        <TabsContent value="security" className="mt-0 space-y-2 animate-fade-in">
                            <h4 className="font-bold text-sm">Senha e Acesso</h4>
                            <p className="text-xs text-muted-foreground font-serif">Autenticação de dois fatores.</p>
                             <Button size="sm" variant="outline" className="mt-2">Alterar Senha</Button>
                        </TabsContent>
                    </CardContent>
                </Tabs>
             </Card>

        </div>
      </section>

      {/* --- GRUPO 4: ESTADOS ESPECIAIS --- */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Estados & Variações</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

             {/* Centered Body */}
             <Card className="text-center flex flex-col items-center justify-center p-6">
                <CardHeader>
                    <CardTitle>Centralizado</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground font-serif">
                        Texto de apoio centralizado para leads ou anúncios breves.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button variant="link">Saiba Mais <Icon name="angle-small-right" /></Button>
                </CardFooter>
            </Card>

            {/* Empty State */}
            <Card className="flex flex-col items-center justify-center p-8 text-center border-dashed">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
                    <Icon name="box-open" size="size-6" />
                </div>
                <h4 className="text-lg font-bold mb-1">Sem Dados</h4>
                <p className="text-xs text-muted-foreground font-serif mb-4">Nenhum registro encontrado nesta categoria.</p>
                <Button size="sm" variant="outline">Adicionar Novo</Button>
            </Card>

            {/* Top Bordered */}
            <Card className="border-t-4 border-t-brand-blue">
                <CardHeader>
                    <CardTitle>Top Bordered</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground font-serif">
                        Borda colorida no topo para indicar status ou categoria (ex: Azul para Info).
                    </p>
                </CardContent>
                <CardFooter>
                    <Button variant="link" className="px-0 text-brand-blue">Detalhes</Button>
                </CardFooter>
            </Card>

             {/* Scrollable Body */}
             <Card>
                <CardHeader>
                    <CardTitle>Scrollable</CardTitle>
                </CardHeader>
                <div className="h-[150px] overflow-y-auto px-6 border-y border-border bg-muted/5 custom-scrollbar">
                    <div className="py-4 space-y-2 text-sm text-muted-foreground font-serif">
                        <p>Este é um card com corpo rolável.</p>
                        <p>Ideal para termos de uso, logs ou listas longas que não devem quebrar o layout.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
                        <p>Duis aute irure dolor in reprehenderit.</p>
                    </div>
                </div>
                <CardFooter className="pt-4">
                    <Button size="sm" className="w-full">Aceitar Termos</Button>
                </CardFooter>
            </Card>

        </div>
      </section>

    </div>
  );
};

export default CardsSection;