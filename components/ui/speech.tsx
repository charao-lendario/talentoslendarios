
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
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = false; // Stop after one sentence/phrase
            recognitionInstance.interimResults = false;
            recognitionInstance.lang = 'pt-BR';

            recognitionInstance.onresult = (event) => {
                if (event.results.length > 0) {
                    const transcript = event.results[0][0].transcript;
                    onResult(transcript);
                }
                setIsListening(false);
            };

            recognitionInstance.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognitionInstance.onend = () => {
                setIsListening(false);
            };

            setRecognition(recognitionInstance);
        }
    }, [onResult]);

    const startListening = useCallback(() => {
        if (recognition) {
            try {
                recognition.start();
                setIsListening(true);
            } catch (error) {
                console.error("Error starting recognition:", error);
            }
        } else {
            alert("Navegador não suporta reconhecimento de voz.");
        }
    }, [recognition]);

    const stopListening = useCallback(() => {
        if (recognition) {
            recognition.stop();
            setIsListening(false);
        }
    }, [recognition]);

    return { isListening, startListening, stopListening, isSupported: !!recognition };
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
        const handleResult = (text: string) => {
            const currentValue = value ? String(value) : '';
            const newValue = currentValue ? `${currentValue} ${text}` : text;

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
                    value={value}
                    onChange={onChange}
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
