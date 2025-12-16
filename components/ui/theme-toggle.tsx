import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './button';

export function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Default to dark as per "Gemini Added Memories"

    useEffect(() => {
        // Init theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        } else {
            // Default preference
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-10 h-10 hover:bg-white/10 hover:text-brand-gold transition-colors"
            title={`Mudar para tema ${theme === 'light' ? 'Escuro' : 'Claro'}`}
        >
            {theme === 'light' ? (
                <Moon className="h-5 w-5 text-zinc-800" fill="currentColor" />
            ) : (
                <Sun className="h-5 w-5 text-zinc-100" />
            )}
            <span className="sr-only">Alternar Tema</span>
        </Button>
    );
}
