import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Textarea } from './ui/textarea';
import { Select } from './ui/select';
import { Icon } from './ui/icon';
import { Badge } from './ui/badge';
import { FileUpload } from './ui/file-upload';
import { OTPInput } from './ui/otp-input';
import { Rating } from './ui/rating';

const FormSection: React.FC = () => {
  // State for interactive examples
  const [volume, setVolume] = useState(75);
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [country, setCountry] = useState("br");
  const [rating, setRating] = useState(4);

  return (
    <div className="space-y-16 animate-fade-in">
      <div>
        <h2 className="text-4xl font-serif font-light mb-4">Formulários Avançados</h2>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
           De inputs nativos a componentes complexos de upload e verificação.
        </p>
      </div>

      {/* --- PRIMITIVES SHOWCASE --- */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Primitivos & Controles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Texto & Area */}
            <div className="space-y-6 p-6 border border-border rounded-xl bg-card h-full">
                <h4 className="font-sans font-medium text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Icon name="text" size="size-4" /> Texto
                </h4>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Input Padrão</Label>
                        <Input placeholder="Digite algo..." />
                    </div>
                    <div className="space-y-2">
                        <Label>Input com Ícone</Label>
                        <div className="relative">
                            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
                            <Input className="pl-10" placeholder="Buscar..." />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Data (Native Styled)</Label>
                        <div className="relative">
                            <Input type="date" className="w-full" />
                            <Icon name="calendar" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none bg-background pl-2" size="size-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Seleção */}
            <div className="space-y-6 p-6 border border-border rounded-xl bg-card h-full">
                <h4 className="font-sans font-medium text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Icon name="list-check" size="size-4" /> Seleção
                </h4>
                <div className="space-y-4">
                     <div className="space-y-2">
                        <Label>Select Dropdown</Label>
                        <Select 
                            options={[
                                { label: "Opção 1", value: "1" },
                                { label: "Opção 2", value: "2" },
                                { label: "Opção 3", value: "3" },
                            ]}
                        />
                    </div>
                    <div className="space-y-3">
                        <Label>Radio Group</Label>
                        <RadioGroup defaultValue="opt1">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="opt1" id="r1" />
                                <Label htmlFor="r1" className="font-normal">Opção A</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="opt2" id="r2" />
                                <Label htmlFor="r2" className="font-normal">Opção B</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="flex items-center space-x-2 pt-2 border-t border-border mt-4">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="font-normal cursor-pointer">Checkbox simples</Label>
                    </div>
                </div>
            </div>

            {/* Controles */}
            <div className="space-y-6 p-6 border border-border rounded-xl bg-card h-full">
                <h4 className="font-sans font-medium text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Icon name="settings-sliders" size="size-4" /> Controles
                </h4>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <Label>Toggle Switch</Label>
                        <Switch />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Slider (Range)</Label>
                            <span className="text-xs font-mono text-muted-foreground">{volume}%</span>
                        </div>
                        <Slider value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                        <Label>Avaliação (Rating)</Label>
                        <Rating value={rating} onValueChange={setRating} />
                    </div>
                </div>
            </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* --- CENÁRIO: SECURITY CHECK --- */}
          <section className="space-y-8">
            <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Verificação de Segurança</h3>
            <Card className="max-w-md">
                <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                        <Icon name="shield-check" size="size-6" />
                    </div>
                    <CardTitle>Autenticação de Dois Fatores</CardTitle>
                    <CardDescription>
                        Digite o código de 6 dígitos enviado para seu dispositivo.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="py-4">
                        <OTPInput length={6} onComplete={(code) => alert(`Código: ${code}`)} />
                    </div>
                </CardContent>
                <CardFooter className="justify-center">
                    <Button variant="link" className="text-xs text-muted-foreground">
                        Não recebeu? Reenviar código
                    </Button>
                </CardFooter>
            </Card>
          </section>

          {/* --- CENÁRIO: MEDIA UPLOAD --- */}
          <section className="space-y-8">
            <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Upload de Mídia</h3>
            <Card>
                <CardHeader>
                    <CardTitle>Anexar Documentos</CardTitle>
                    <CardDescription>
                        Faça upload de comprovantes ou imagens para o sistema.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Imagem de Capa</Label>
                        <FileUpload accept="image/*" />
                    </div>
                    
                    <div className="grid gap-2">
                        <Label>Descrição do Arquivo</Label>
                        <Textarea placeholder="Adicione notas sobre este anexo..." />
                    </div>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                    <Button variant="ghost">Cancelar</Button>
                    <Button>Enviar Arquivos</Button>
                </CardFooter>
            </Card>
          </section>

      </div>

      {/* --- CENÁRIO: PROFILE EDIT --- */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Perfil Completo</h3>
        <Card>
            <CardHeader>
                <CardTitle>Editar Perfil</CardTitle>
                <CardDescription>Formulário complexo com múltiplos tipos de input.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                
                {/* Avatar Section */}
                <div className="flex flex-col items-center sm:flex-row gap-6">
                    <div className="relative group cursor-pointer">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
                            <img src="https://github.com/shadcn.png" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Icon name="camera" className="text-white" />
                        </div>
                    </div>
                    <div className="text-center sm:text-left">
                        <h4 className="font-bold text-lg">Alterar Foto</h4>
                        <p className="text-sm text-muted-foreground mb-3">Recomendado: 400x400px, JPG ou PNG.</p>
                        <div className="flex gap-2 justify-center sm:justify-start">
                            <Button variant="outline" size="sm">Upload</Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Remover</Button>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="fullname">Nome Completo</Label>
                        <Input id="fullname" defaultValue="Academia Lendária" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                            <Input id="username" className="pl-7" defaultValue="lendaria" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Função</Label>
                        <Select 
                            placeholder="Selecione..."
                            value="dev"
                            options={[
                                { label: "Desenvolvedor", value: "dev" },
                                { label: "Designer", value: "des" },
                                { label: "Gerente", value: "pm" },
                            ]}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="birthdate">Data de Nascimento</Label>
                        <Input type="date" id="birthdate" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea className="h-24" placeholder="Conte um pouco sobre você..." />
                </div>
                
                <div className="space-y-4 pt-4 border-t border-border">
                    <h4 className="font-semibold text-sm">Configurações de Privacidade</h4>
                    
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Perfil Público</Label>
                            <p className="text-xs text-muted-foreground">Tornar suas informações visíveis para todos.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Mostrar Email</Label>
                            <p className="text-xs text-muted-foreground">Exibir email no perfil público.</p>
                        </div>
                        <Switch />
                    </div>
                </div>

            </CardContent>
            <CardFooter className="bg-muted/30 flex justify-between py-4">
                <Button variant="ghost">Descartar</Button>
                <Button>Salvar Alterações</Button>
            </CardFooter>
        </Card>
      </section>

    </div>
  );
};

export default FormSection;