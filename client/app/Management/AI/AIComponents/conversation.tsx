import { User, Bot } from "lucide-react";
import { useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import { Message } from "../types";

interface ConversationProps {
    messages: Message[];
}

export default function Conversation({ messages }: ConversationProps) {
    const scrollRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (messages.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-10">
                No messages yet. Start the conversation!
            </div>
        );
    }
    return (
        <div className="space-y-4 overflow-y-auto max-h-[400px] p-4 scrollbar-hide">
            {messages.map((msg, index) => {

                const isBot = !!msg.answer; 
                return (
                    <div key={msg.id || index} ref={scrollRef}>
                        <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
                            
                            {/* BUBBLE CONTAINER */}
                            <div className={`max-w-[85%] p-4 rounded-2xl shadow ${
                                isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'
                            }`}>
                                <div className="flex items-start gap-3">
                                    
                                    {/* ICON */}
                                    {isBot ? (
                                        <Bot className="w-6 h-6 text-gray-600 mt-1 shrink-0" />
                                    ) : (
                                        <User className="w-6 h-6 text-white mt-1 shrink-0" />
                                    )}
                                    
                                    {/* TEXT CONTENT */}
                                    <div className="overflow-hidden">
                                        {isBot ? (

                                            <div className="prose prose-sm max-w-none text-gray-800 break-words">
                                                <ReactMarkdown>
                                                    {msg.answer || msg.text} 
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            <p className="whitespace-pre-wrap leading-relaxed">
                                                {msg.text}
                                            </p>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}