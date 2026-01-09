import {User, Bot} from "lucide-react";
import { useEffect, useRef } from "react";
import {Message} from "../types";

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
        <div className="space-y-4 overflow-y-auto max-h-[400px] p-4">
            {messages.map((msg) => (
                <div key={msg.id} ref={scrollRef}>
                    <div className={`flex ${msg.answer ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[70%] p-4 rounded-2xl shadow ${msg.answer ? 'bg-gray-100' : 'bg-blue-600 text-white'}`}>
                            <div className="flex items-start gap-3">
                                {msg.answer ? <Bot className="w-6 h-6 text-gray-600 mt-1" /> : <User className="w-6 h-6 text-white mt-1" />}
                                <div>
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}