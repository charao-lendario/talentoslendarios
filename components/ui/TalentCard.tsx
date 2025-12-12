import React from 'react';
import { Card, CardContent } from './card';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import { Badge } from './badge';
import { Button } from './button';
import { Icon } from './icon';
import { cn } from '../../lib/utils';

interface TalentCardProps {
    name: string;
    role: string;
    skills: string[];
    avatarUrl?: string;
    available?: boolean;
    onViewProfile?: () => void;
    className?: string;
    seniority?: string;
}

export const TalentCard: React.FC<TalentCardProps> = ({
    name,
    role,
    skills,
    avatarUrl,
    available = true,
    onViewProfile,
    className,
    seniority
}) => {
    return (
        <Card className={cn(
            "group relative overflow-hidden border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1",
            className
        )}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <CardContent className="p-6 relative z-10 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 border-2 border-border group-hover:border-primary/50 transition-colors">
                            <AvatarImage src={avatarUrl} />
                            <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-sans font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                                {name}
                            </h3>
                            <p className="text-sm text-muted-foreground font-medium line-clamp-1">
                                {role}
                            </p>
                            {seniority && (
                                <span className="text-xs text-muted-foreground/80 mt-1 inline-block">
                                    {seniority}
                                </span>
                            )}
                        </div>
                    </div>
                    {available && (
                        <span className="flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    {skills.slice(0, 3).map((skill, i) => (
                        <Badge key={i} variant="secondary" className="bg-muted/50 text-xs font-normal">
                            {skill}
                        </Badge>
                    ))}
                    {skills.length > 3 && (
                        <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                            +{skills.length - 3}
                        </Badge>
                    )}
                </div>

                <div className="pt-4 mt-auto">
                    <Button
                        onClick={onViewProfile}
                        className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                        variant="ghost"
                        size="sm"
                    >
                        Ver Perfil <Icon name="arrow-right" className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
