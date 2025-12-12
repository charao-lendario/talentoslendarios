import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Icon } from './ui/icon';
import { Symbol } from './ui/symbol';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from './ui/breadcrumb';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';

const ComponentSection: React.FC = () => {
  return (
    <div className="space-y-20 animate-fade-in">
      
      {/* HERO SECTION EXAMPLE */}
      <section className="relative rounded-3xl overflow-hidden bg-zinc-950 text-white shadow-2xl">
         {/* Background Image with Overlay */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
         {/* Gradient Gradient to ensure text readability */}
         <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
         
         <div className="relative p-6 md:p-12 lg:p-24 flex flex-col items-center text-center space-y-8 z-10">
            <Badge variant="outline" className="text-primary-foreground border-primary/50 bg-primary/20 backdrop-blur-md px-4 py-1.5">
                <Symbol name="star" className="mr-2" />
                Academia Lendária v4.1
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold tracking-tight text-white max-w-4xl drop-shadow-lg">
                Crie o <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9B298] to-[#E4D8CA]">Lendário</span>.
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-zinc-300 font-serif max-w-2xl leading-relaxed drop-shadow-md">
                Um ecossistema de design feito para escalar com elegância, precisão e performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                <Button size="lg" className="text-lg h-14 px-8 shadow-xl shadow-primary/10 w-full sm:w-auto">
                    Começar Agora
                </Button>
                {/* Fixed Button: Added bg-transparent to override light mode default, and hover:bg-white hover:text-black for contrast */}
                <Button size="lg" variant="outline" className="bg-transparent text-lg h-14 px-8 border-white/20 text-white hover:bg-white hover:text-black backdrop-blur-sm transition-all duration-300 w-full sm:w-auto">
                    <Icon name="play" className="mr-2" /> Demo
                </Button>
            </div>
         </div>
      </section>

      <div>
        <h2 className="text-4xl font-serif font-light mb-4">Componentes de Interface</h2>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
           Elementos estruturais e de navegação para aplicações complexas.
        </p>
      </div>

      {/* TABS SECTION */}
      <section className="space-y-12 border-t border-border pt-12">
        <div className="flex items-end justify-between">
             <h3 className="text-2xl font-sans font-semibold">Abas (Tabs)</h3>
             <Badge variant="secondary">Interativo</Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Variant: Default (Underline) */}
            <div className="space-y-4">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Default (Underline)</p>
                <div className="p-6 border border-border rounded-xl bg-card min-h-[300px]">
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="account" className="flex-1">
                                <Icon name="user" className="mr-2 size-4" /> Minha Conta
                            </TabsTrigger>
                            <TabsTrigger value="password" className="flex-1">
                                <Icon name="lock" className="mr-2 size-4" /> Segurança
                            </TabsTrigger>
                            <TabsTrigger value="billing" className="flex-1">
                                <Icon name="credit-card" className="mr-2 size-4" /> Faturas
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="account" className="mt-6 space-y-4">
                            <h4 className="font-bold text-lg">Detalhes da Conta</h4>
                            <p className="text-muted-foreground text-sm">Gerencie suas informações pessoais e preferências públicas.</p>
                            <div className="h-20 bg-muted/30 rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground text-sm">
                                [Conteúdo da Tab Conta]
                            </div>
                        </TabsContent>
                        <TabsContent value="password" className="mt-6 space-y-4">
                            <h4 className="font-bold text-lg">Segurança</h4>
                            <p className="text-muted-foreground text-sm">Altere sua senha e configure autenticação de dois fatores.</p>
                            <div className="h-20 bg-muted/30 rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground text-sm">
                                [Conteúdo da Tab Segurança]
                            </div>
                        </TabsContent>
                        <TabsContent value="billing" className="mt-6 space-y-4">
                            <h4 className="font-bold text-lg">Faturamento</h4>
                            <p className="text-muted-foreground text-sm">Visualize histórico de pagamentos e métodos salvos.</p>
                            <div className="h-20 bg-muted/30 rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground text-sm">
                                [Conteúdo da Tab Faturas]
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Variant: Pills */}
            <div className="space-y-4">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pills (Segmented Control)</p>
                <div className="p-6 border border-border rounded-xl bg-card min-h-[300px]">
                    <Tabs defaultValue="music" className="w-full">
                        <div className="flex justify-center mb-6">
                            <TabsList variant="pills" className="w-full sm:w-[300px]">
                                <TabsTrigger value="music" className="flex-1">Música</TabsTrigger>
                                <TabsTrigger value="podcasts" className="flex-1">Podcasts</TabsTrigger>
                                <TabsTrigger value="live" className="flex-1">Live</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="music" className="text-center space-y-4 animate-fade-in">
                            <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center text-primary">
                                <Icon name="music-alt" size="size-8" />
                            </div>
                            <h3 className="text-xl font-bold">Biblioteca de Música</h3>
                            <p className="text-muted-foreground">Acesse milhões de músicas sem anúncios.</p>
                        </TabsContent>
                        <TabsContent value="podcasts" className="text-center space-y-4 animate-fade-in">
                            <div className="w-16 h-16 bg-brand-pink/10 rounded-full mx-auto flex items-center justify-center text-brand-pink">
                                <Icon name="microphone" size="size-8" />
                            </div>
                            <h3 className="text-xl font-bold">Seus Podcasts</h3>
                            <p className="text-muted-foreground">Episódios novos toda semana.</p>
                        </TabsContent>
                        <TabsContent value="live" className="text-center space-y-4 animate-fade-in">
                             <div className="w-16 h-16 bg-brand-red/10 rounded-full mx-auto flex items-center justify-center text-brand-red">
                                <Icon name="signal-stream" size="size-8" />
                            </div>
                            <h3 className="text-xl font-bold">Ao Vivo</h3>
                            <p className="text-muted-foreground">Transmissões de rádio e eventos.</p>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

             {/* Variant: Outline (Vertical simulated) */}
             <div className="space-y-4 lg:col-span-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Outline (Sidebar Mode)</p>
                <div className="p-6 border border-border rounded-xl bg-muted/20">
                     <Tabs defaultValue="general" className="flex flex-col md:flex-row w-full gap-6">
                        <TabsList variant="outline" className="flex-col w-full md:w-64 h-auto bg-card space-y-1 p-2">
                            <TabsTrigger value="general" className="w-full justify-start">
                                <Icon name="settings" className="mr-2 size-4" /> Geral
                            </TabsTrigger>
                            <TabsTrigger value="notifications" className="w-full justify-start">
                                <Icon name="bell" className="mr-2 size-4" /> Notificações
                                <Badge variant="destructive" className="ml-auto h-5 px-1.5 text-[10px]">9+</Badge>
                            </TabsTrigger>
                            <TabsTrigger value="display" className="w-full justify-start">
                                <Icon name="computer" className="mr-2 size-4" /> Aparência
                            </TabsTrigger>
                            <TabsTrigger value="advanced" disabled className="w-full justify-start opacity-50 cursor-not-allowed">
                                <Icon name="code-branch" className="mr-2 size-4" /> Avançado (Pro)
                            </TabsTrigger>
                        </TabsList>
                        
                        <div className="flex-1 bg-card border border-border rounded-lg p-6 min-h-[200px]">
                            <TabsContent value="general">
                                <h3 className="text-lg font-bold mb-4">Configurações Gerais</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b border-border">
                                        <span className="text-sm font-medium">Idioma</span>
                                        <span className="text-sm text-muted-foreground">Português (BR)</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-4 border-b border-border">
                                        <span className="text-sm font-medium">Fuso Horário</span>
                                        <span className="text-sm text-muted-foreground">Brasília (GMT-3)</span>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="notifications">
                                <h3 className="text-lg font-bold mb-4">Preferências de Notificação</h3>
                                <p className="text-muted-foreground">Gerencie como você recebe alertas.</p>
                            </TabsContent>
                            <TabsContent value="display">
                                <h3 className="text-lg font-bold mb-4">Configurações de Exibição</h3>
                                <p className="text-muted-foreground">Ajuste o tema e densidade.</p>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
             </div>
        </div>
      </section>

      {/* NAVIGATION SECTION */}
      <section className="space-y-12 border-t border-border pt-12">
        <h3 className="text-2xl font-sans font-semibold">Navegação</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Breadcrumbs */}
            <div className="space-y-6">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-2">Breadcrumbs</h4>
                <div className="p-8 border border-border rounded-xl bg-card overflow-x-auto">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Componentes</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbEllipsis />
                            </BreadcrumbItem>
                             <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Navegação</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                 <div className="p-8 border border-border rounded-xl bg-card overflow-x-auto">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" className="flex items-center gap-1">
                                    <Icon name="home" size="size-3" /> Início
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Symbol name="bullet" className="text-muted-foreground" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Symbol name="bullet" className="text-muted-foreground" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="font-semibold text-primary">Relatórios</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            {/* Pagination */}
            <div className="space-y-6">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-2">Paginação</h4>
                <div className="p-8 border border-border rounded-xl bg-card space-y-8 overflow-x-auto">
                    
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                    <Pagination>
                        <PaginationContent>
                             <PaginationItem>
                                <PaginationLink href="#" isActive size="default" className="w-auto px-4">
                                    Página 1 de 10
                                </PaginationLink>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                </div>
            </div>

        </div>
      </section>

      {/* Buttons (Existing) */}
      <section className="space-y-8 pt-8 border-t border-border">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Botões</h3>
        <div className="flex flex-wrap gap-4 items-center p-8 bg-muted/30 rounded-xl">
            <Button>
                <Icon name="rocket" className="mr-2" size="size-4" />
                Primary Action
            </Button>
            <Button variant="outline">
                Secondary Action
            </Button>
            <Button variant="destructive">
                <Icon name="trash" className="mr-2" size="size-4" />
                Delete
            </Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link" className="gap-2">
                Link Style <Icon name="arrow-right" size="size-3" />
            </Button>
            <Button size="icon" variant="outline">
                <Icon name="envelope" size="size-4" />
            </Button>
        </div>
      </section>

      {/* Badges (Expanded) */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Badges & Tags</h3>
        
        <div className="grid gap-6">
            {/* Semantic */}
            <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Semânticos</p>
                <div className="flex flex-wrap gap-4 items-center p-6 border border-border rounded-xl bg-card">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="info">Info</Badge>
                </div>
            </div>

            {/* Roles */}
            <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Papéis (Roles)</p>
                <div className="flex flex-wrap gap-4 items-center p-6 border border-border rounded-xl bg-card">
                    <Badge variant="admin">Admin</Badge>
                    <Badge variant="editor">Editor</Badge>
                    <Badge variant="viewer">Viewer</Badge>
                </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Status</p>
                <div className="flex flex-wrap gap-4 items-center p-6 border border-border rounded-xl bg-card">
                    <Badge variant="active">Active</Badge>
                    <Badge variant="pending">Pending</Badge>
                    <Badge variant="inactive">Inactive</Badge>
                </div>
            </div>

             {/* Sizes */}
             <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Tamanhos</p>
                <div className="flex flex-wrap items-center gap-4 p-6 border border-border rounded-xl bg-card">
                    <Badge size="sm" variant="outline">Small</Badge>
                    <Badge size="default" variant="outline">Default</Badge>
                    <Badge size="lg" variant="outline">Large</Badge>
                </div>
            </div>
        </div>
      </section>

      {/* Avatars (Existing) */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Avatares</h3>
        <div className="flex flex-wrap items-end gap-6 p-8 bg-muted/30 rounded-xl">
           <div className="flex flex-col items-center gap-2">
              <Avatar size="xl">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-xs font-mono text-muted-foreground">size="xl"</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <Avatar size="lg">
                <AvatarFallback className="bg-primary text-primary-foreground">AL</AvatarFallback>
              </Avatar>
              <span className="text-xs font-mono text-muted-foreground">size="lg"</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-xs font-mono text-muted-foreground">default</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <Avatar size="sm">
                <AvatarImage src="https://github.com/google.png" />
                <AvatarFallback>G</AvatarFallback>
              </Avatar>
              <span className="text-xs font-mono text-muted-foreground">size="sm"</span>
           </div>
        </div>
      </section>

      {/* Alerts (Updated) */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Alertas</h3>
        <div className="space-y-6">
            
            <Alert>
              <div className="relative z-10">
                <AlertTitle>
                    <Icon name="rocket" size="size-5" /> Informação do Sistema
                </AlertTitle>
                <AlertDescription>
                    Atualização do Sistema Lendário v4.1 disponível para download com novos recursos de IA.
                </AlertDescription>
              </div>
              {/* Watermark */}
              <Icon name="rocket" className="absolute -right-4 -bottom-4 text-7xl opacity-5 -rotate-12 pointer-events-none" />
            </Alert>

            <Alert variant="destructive">
               <div className="relative z-10">
                  <AlertTitle>
                      <Icon name="exclamation" size="size-5" /> Erro Crítico
                  </AlertTitle>
                  <AlertDescription>
                      Falha ao conectar com o servidor neural. Verifique suas credenciais de API.
                  </AlertDescription>
               </div>
               {/* Watermark */}
               <Icon name="exclamation" className="absolute -right-4 -bottom-4 text-7xl opacity-5 -rotate-12 pointer-events-none" />
            </Alert>

             <Alert variant="success">
               <div className="relative z-10">
                  <AlertTitle>
                      <Icon name="check-circle" size="size-5" /> Sucesso
                  </AlertTitle>
                  <AlertDescription>
                      Transação completada com êxito. O recibo foi enviado por email.
                  </AlertDescription>
               </div>
               {/* Watermark */}
               <Icon name="check-circle" className="absolute -right-4 -bottom-4 text-7xl opacity-5 -rotate-12 pointer-events-none" />
            </Alert>
        </div>
      </section>

      {/* Cards (Existing) */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Standard Shadcn Card */}
            <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                <CardHeader>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2 text-primary">
                        <Icon name="brain" size="size-5" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">Conceito Lendário</CardTitle>
                    <CardDescription>Minimalismo estrutural.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Componentes isolados com responsabilidade única e estilo encapsulado.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button variant="link" className="px-0">
                        Saiba mais <Icon name="arrow-right" className="ml-2" size="size-3" />
                    </Button>
                </CardFooter>
            </Card>

            {/* Feature Card */}
             <Card className="border-primary">
                <CardHeader>
                    <Badge className="w-fit mb-2">
                        <Symbol name="star" className="mr-1" />
                        Novo
                    </Badge>
                    <CardTitle>Inteligência Artificial</CardTitle>
                    <CardDescription>Módulo avançado disponível.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Icon name="clock" size="size-4" />
                            120h
                        </span>
                        <span className="flex items-center gap-1">
                            <Icon name="chart-histogram" size="size-4" />
                            Avançado
                        </span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Inscrever-se</Button>
                </CardFooter>
            </Card>
        </div>
      </section>

      {/* --- NOVOS EXEMPLOS DE NEGÓCIO --- */}
      <section className="space-y-12 border-t border-border pt-12">
        <h3 className="text-2xl font-sans font-semibold">Exemplos de Negócio</h3>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Padrões comuns de interface para aplicações administrativas e dashboards.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* INVOICE CARD */}
            <div className="space-y-6">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-2">Fatura (Invoice)</h4>
                
                {/* Description added */}
                <div className="space-y-2">
                    <p className="text-sm font-serif text-muted-foreground">
                        <strong className="text-primary font-sans">O que é:</strong> Documento comercial detalhando uma transação entre comprador e vendedor.
                    </p>
                    <p className="text-sm font-serif text-muted-foreground">
                        <strong className="text-primary font-sans">Quando usar:</strong> Em checkouts, históricos de pedidos, assinaturas ou para fornecer comprovantes de pagamento.
                    </p>
                </div>

                <Card className="max-w-md mx-auto lg:mx-0">
                    <CardHeader>
                        <CardTitle>Invoice</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* Bill Details */}
                        <div className="border border-border rounded-xl overflow-hidden shadow-sm">
                             <div className="p-4 flex justify-between items-center border-b border-border bg-card">
                                 <span className="text-sm font-medium">Payment to Front</span>
                                 <span className="text-sm font-bold font-mono">$264.00</span>
                             </div>
                             <div className="p-4 flex justify-between items-center border-b border-border bg-card">
                                 <span className="text-sm font-medium">Tax fee</span>
                                 <span className="text-sm font-bold font-mono">$52.8</span>
                             </div>
                             <div className="p-4 flex justify-between items-center bg-muted/30">
                                 <span className="text-sm font-bold">Amount paid</span>
                                 <span className="text-sm font-bold font-mono text-lg">$316.8</span>
                             </div>
                        </div>

                        {/* Download List */}
                        <div>
                            <h5 className="text-sm font-medium mb-3">Download</h5>
                            <div className="border border-border rounded-xl overflow-hidden shadow-sm divide-y divide-border">
                                <div className="p-4 flex items-center justify-between bg-card hover:bg-muted/30 transition-colors group cursor-pointer">
                                    <span className="text-sm font-medium flex items-center gap-2 truncate">
                                        <Icon name="file" className="text-muted-foreground shrink-0" />
                                        <span className="truncate">resume_web_ui_developer.csv</span>
                                    </span>
                                    <Button variant="ghost" size="sm" className="h-8 gap-2 text-muted-foreground group-hover:text-primary">
                                        <Icon name="download" size="size-3" />
                                        <span className="text-xs hidden sm:inline">Download</span>
                                    </Button>
                                </div>
                                <div className="p-4 flex items-center justify-between bg-card hover:bg-muted/30 transition-colors group cursor-pointer">
                                     <span className="text-sm font-medium flex items-center gap-2 truncate">
                                        <Icon name="file-pdf" className="text-muted-foreground shrink-0" />
                                        <span className="truncate">coverletter_web_ui_developer.pdf</span>
                                    </span>
                                    <Button variant="ghost" size="sm" className="h-8 gap-2 text-muted-foreground group-hover:text-primary">
                                        <Icon name="download" size="size-3" />
                                        <span className="text-xs hidden sm:inline">Download</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* FILE TREE */}
             <div className="space-y-6">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-2">Árvore de Arquivos</h4>
                
                {/* Description added */}
                <div className="space-y-2">
                    <p className="text-sm font-serif text-muted-foreground">
                        <strong className="text-primary font-sans">O que é:</strong> Representação visual hierárquica de pastas e arquivos.
                    </p>
                    <p className="text-sm font-serif text-muted-foreground">
                        <strong className="text-primary font-sans">Quando usar:</strong> Em sistemas de gerenciamento de documentos, IDEs, CMS ou visualização de estruturas aninhadas.
                    </p>
                </div>

                <Card className="p-8">
                     <h5 className="text-lg font-bold mb-6">Basic usage</h5>
                     <div className="font-mono text-sm space-y-1">
                        {/* Root */}
                         <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                             <Icon name="minus-small" size="size-3" />
                             <Icon name="folder" className="text-brand-gold" />
                             <span>assets</span>
                         </div>
                         
                         {/* Level 1 */}
                         <div className="relative pl-6 ml-2 border-l border-border/50 space-y-1">
                             <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                 <Icon name="minus-small" size="size-3" />
                                 <Icon name="folder" className="text-brand-gold" />
                                 <span>css</span>
                             </div>
                             
                             {/* Level 2 */}
                             <div className="relative pl-6 ml-2 border-l border-border/50 space-y-1">
                                  <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                     <Icon name="minus-small" size="size-3" />
                                     <Icon name="folder" className="text-brand-gold" />
                                     <span>main</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer py-0.5">
                                     <Icon name="document" size="size-3" />
                                     <span>main.css</span>
                                 </div>
                                  <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer py-0.5">
                                     <Icon name="document" size="size-3" />
                                     <span>docs.css</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer py-0.5">
                                     <span>README.txt</span>
                                 </div>
                             </div>

                             <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer mt-2">
                                 <Icon name="plus-small" size="size-3" />
                                 <Icon name="folder" className="text-brand-gold" />
                                 <span>tailwind</span>
                             </div>
                         </div>
                         
                         {/* Root Siblings */}
                         <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer pt-1">
                             <span>.gitignore</span>
                         </div>
                         <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer pt-1">
                             <Icon name="plus-small" size="size-3" />
                             <Icon name="folder" className="text-brand-gold" />
                             <span>img</span>
                         </div>
                          <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer pt-1">
                             <Icon name="plus-small" size="size-3" />
                             <Icon name="folder" className="text-brand-gold" />
                             <span>js</span>
                         </div>
                     </div>
                </Card>
            </div>

            {/* TIMELINE */}
            <div className="space-y-6 lg:col-span-2">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-2">Timeline (Histórico)</h4>
                
                 {/* Description added */}
                <div className="space-y-2">
                    <p className="text-sm font-serif text-muted-foreground">
                        <strong className="text-primary font-sans">O que é:</strong> Exibição visual de eventos em ordem cronológica.
                    </p>
                    <p className="text-sm font-serif text-muted-foreground">
                        <strong className="text-primary font-sans">Quando usar:</strong> Logs de atividade, rastreamento de entregas, changelogs de software ou feeds de atualizações.
                    </p>
                </div>

                <Card className="p-8 lg:p-12">
                     <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-8">
                         {/* Time Column (Visual only on desktop) */}
                         <div className="hidden md:flex flex-col gap-[88px] pt-1 text-right text-xs font-mono text-muted-foreground">
                             <span>1 AUG, 2023</span>
                             <span>12:05PM</span>
                             <span>12:05PM</span>
                             <span>12:05PM</span>
                             <span>12:05PM</span>
                         </div>

                         {/* Timeline Content */}
                         <div className="relative border-l border-border space-y-12 pl-8 md:pl-10">
                            
                            {/* Item 1 */}
                            <div className="relative">
                                <div className="absolute -left-[37px] md:-left-[45px] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-border"></div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-sm">Created "Preline in React" task</h4>
                                    <p className="text-sm text-muted-foreground">Find more detailed insctructions here.</p>
                                    <div className="flex items-center gap-2 mt-3 p-2 bg-muted/20 rounded-lg w-fit">
                                        <Avatar size="sm" className="h-6 w-6"><AvatarFallback className="text-[10px]">JC</AvatarFallback></Avatar>
                                        <span className="text-xs font-semibold">James Collins</span>
                                    </div>
                                </div>
                            </div>

                             {/* Item 2 */}
                            <div className="relative">
                                <div className="absolute -left-[46px] md:-left-[54px] top-0 flex items-center justify-center h-8 w-8 rounded-full border border-border bg-background text-xs font-bold text-foreground z-10">A</div>
                                <div className="space-y-1 pt-1">
                                    <h4 className="font-bold text-sm flex items-center gap-2">
                                        Release v5.2.0 quick bug fix 
                                        <span role="img" aria-label="bug">🐞</span>
                                    </h4>
                                    <div className="flex items-center gap-2 mt-3">
                                        <Avatar size="sm" className="h-6 w-6"><AvatarFallback className="text-[10px] bg-brand-blue text-white">AG</AvatarFallback></Avatar>
                                        <span className="text-xs font-semibold">Alex Gragov</span>
                                    </div>
                                </div>
                            </div>

                             {/* Item 3 */}
                            <div className="relative">
                                <div className="absolute -left-[37px] md:-left-[45px] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-border"></div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-sm">Marked "Install Charts" completed</h4>
                                    <p className="text-sm text-muted-foreground">Finally! You can check it out here.</p>
                                    <div className="flex items-center gap-2 mt-3 p-2 bg-muted/20 rounded-lg w-fit">
                                        <Avatar size="sm" className="h-6 w-6"><AvatarFallback className="text-[10px]">JC</AvatarFallback></Avatar>
                                        <span className="text-xs font-semibold">James Collins</span>
                                    </div>
                                </div>
                            </div>

                            {/* Item 4 - Image Avatars */}
                            <div className="relative">
                                <div className="absolute -left-[37px] md:-left-[45px] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-border"></div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-sm">Untitle task</h4>
                                    <p className="text-sm text-muted-foreground">Description goes here</p>
                                </div>
                                <div className="flex items-center gap-2 mt-3">
                                    <Avatar size="sm" className="h-6 w-6"><AvatarImage src="https://i.pravatar.cc/150?u=1" /></Avatar>
                                </div>
                            </div>
                            
                            {/* Item 5 - Custom Icon */}
                            <div className="relative">
                                <div className="absolute -left-[46px] md:-left-[54px] top-0 flex items-center justify-center h-8 w-8 rounded-full border border-border bg-background z-10">
                                    <Icon name="coffee" size="size-3" />
                                </div>
                                <div className="space-y-1 pt-1">
                                    <h4 className="font-bold text-sm flex items-center gap-2">
                                        Take a break 
                                        <span role="img" aria-label="flag">⛳</span>
                                    </h4>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                        Just chill for now... <span role="img" aria-label="wink">😉</span>
                                    </p>
                                </div>
                            </div>

                         </div>
                     </div>
                     <div className="mt-8 pl-0 md:pl-[140px]">
                        <Button variant="ghost" size="sm" className="text-brand-blue gap-2">
                             <Icon name="angle-small-down" /> Show older
                        </Button>
                     </div>
                </Card>
            </div>

        </div>
      </section>
    </div>
  );
};

export default ComponentSection;