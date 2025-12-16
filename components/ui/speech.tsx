
import React, { useState, useEffect, useCallback } from 'react';
import { Input, InputProps } from './input';
import { Textarea, TextareaProps } from './textarea';
import { cn } from '../../lib/utils';
import { Mic, MicOff } from 'lucide-react';

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
}

interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
    length: number;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare global {
    interface Window {
        SpeechRecognition: {
            new(): SpeechRecognition;
        };
        webkitSpeechRecognition: {
            new(): SpeechRecognition;
        };
    }
}

// Hook
const useSpeechRecognition = (onResult: (text: string) => void) => {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = React.useRef<SpeechRecognition | null>(null);
    const onResultRef = React.useRef(onResult);

    useEffect(() => {
        onResultRef.current = onResult;
    }, [onResult]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, []);

    const startListening = useCallback(() => {
        if (typeof window === 'undefined') return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Navegador não suporta reconhecimento de voz.");
            return;
        }

        if (!recognitionRef.current) {
            const instance = new SpeechRecognition();
            instance.continuous = false;
            instance.interimResults = false;
            instance.lang = 'pt-BR';
            recognitionRef.current = instance;
        }

        const recognition = recognitionRef.current;

        recognition.onresult = (event: any) => {
            if (event.results.length > 0) {
                const transcript = event.results[0][0].transcript;
                onResultRef.current(transcript);
            }
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        try {
            recognition.start();
            setIsListening(true);
        } catch (error) {
            console.error("Error starting recognition:", error);
            setIsListening(false);
        }
    }, []);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }, []);

    const isSupported = typeof window !== 'undefined' && (!!window.SpeechRecognition || !!window.webkitSpeechRecognition);

    return { isListening, startListening, stopListening, isSupported };
};

export const SpeechInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, value, onChange, ...props }, ref) => {
        const handleResult = (text: string) => {
            const currentValue = value ? String(value) : '';
            const newValue = currentValue ? `${currentValue} ${text}` : text;

            // Create synthetic event to satisfy React onChange handler signature
            const event = {
                target: { value: newValue },
                currentTarget: { value: newValue }
            } as React.ChangeEvent<HTMLInputElement>;

            onChange?.(event);
        };

        const { isListening, startListening, stopListening, isSupported } = useSpeechRecognition(handleResult);

        // Don't show on password fields
        if (props.type === "password") {
            return <Input ref={ref} className={className} value={value} onChange={onChange} {...props} />;
        }

        return (
            <div className="relative">
                <Input
                    ref={ref}
                    className={cn("pr-10", className)}
                    value={value}
                    onChange={onChange}
                    {...props}
                />
                {isSupported && (
                    <button
                        type="button"
                        onClick={isListening ? stopListening : startListening}
                        className={cn(
                            "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors hover:bg-muted focus:outline-none z-10",
                            isListening ? "text-destructive bg-destructive/10 animate-pulse" : "text-muted-foreground hover:text-foreground"
                        )}
                        title="Falar para preencher"
                    >
                        {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                    </button>
                )}
            </div>
        );
    }
);
SpeechInput.displayName = "SpeechInput";

export const SpeechTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, value, onChange, ...props }, ref) => {
        const [localValue, setLocalValue] = useState(value || '');

        // Sync local value when prop changes (e.g. from database load or reset)
        useEffect(() => {
            setLocalValue(value || '');
        }, [value]);

        const debouncedOnChange = useCallback(
            debounce((newValue: string, event: React.ChangeEvent<HTMLTextAreaElement>) => {
                if (onChange) {
                    // Create a synthetic event with the new value
                    // We need to clone the event or create a compatible object since the original event might be reused/invalidated
                    // But standard React events are pooled in older versions, though not in 18+. 
                    // Safer to just ensure target has value.
                    onChange(event);
                }
            }, 300),
            [onChange]
        );

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const newValue = e.target.value;
            setLocalValue(newValue);
            debouncedOnChange(newValue, e);
        };

        const handleResult = (text: string) => {
            const currentValue = localValue ? String(localValue) : '';
            const newValue = currentValue ? `${currentValue} ${text}` : text;

            setLocalValue(newValue);

            // Create synthetic event for the speech result
            const event = {
                target: { value: newValue },
                currentTarget: { value: newValue }
            } as React.ChangeEvent<HTMLTextAreaElement>;

            onChange?.(event);
        };

        const { isListening, startListening, stopListening, isSupported } = useSpeechRecognition(handleResult);

        return (
            <div className="relative">
                <Textarea
                    ref={ref}
                    className={cn("pr-10", className)}
                    value={localValue}
                    onChange={handleChange}
                    {...props}
                />
                {isSupported && (
                    <button
                        type="button"
                        onClick={isListening ? stopListening : startListening}
                        className={cn(
                            "absolute right-2 top-2 p-1.5 rounded-full transition-colors hover:bg-muted focus:outline-none z-10",
                            isListening ? "text-destructive bg-destructive/10 animate-pulse" : "text-muted-foreground hover:text-foreground"
                        )}
                        title="Falar para preencher"
                    >
                        {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                    </button>
                )}
            </div>
        );
    }
);
SpeechTextarea.displayName = "SpeechTextarea";

// Utility debounce function
function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
