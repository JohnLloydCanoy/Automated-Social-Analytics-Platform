"use client";

import { useState, useRef, useEffect } from "react";
import { api } from "@/lib/api";
import AttachmentButton from "./AIComponents/attachmentbutton";

// --- CUSTOM HOOK (The "Brain" - Logic Layer) ---
// This keeps your UI clean and makes testing easier.
function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
  // Auto-scroll ref
const messagesEndRef = useRef<HTMLDivElement>(null);

const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

    useEffect(() => {
    scrollToBottom();
}, [messages, isLoading]);

const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

const userMsg: Message = {
    id: Date.now().toString(),
    role: "user",
    text: input,
    timestamp: Date.now(),
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
        const result = await api.ai.chat(userMsg.text);
        
        const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "ai",
            text: result.response,
            timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        } catch (error) {
        const errorMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "error",
            text: "Sorry, I couldn't process that. Try again!",
            timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMsg]);
        } finally {
        setIsLoading(false);
        }
    };

    return {
        messages,
        input,
        setInput,
        isLoading,
        sendMessage,
        messagesEndRef,
    };
    }

// --- UI COMPONENTS (The "Body" - Visual Layer) ---

// A. The Message Bubble Component
const MessageBubble = ({ message }: { message: Message }) => {
    const isUser = message.role === "user";
    const isError = message.role === "error";

    return (
        <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
        <div
            className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
                ? "bg-blue-600 text-white rounded-br-sm"
                : isError
                ? "bg-red-50 text-red-600 border border-red-100"
                : "bg-gray-100 text-gray-800 rounded-bl-sm"
            }`}
        >
            {message.text}
        </div>
        </div>
    );
    };

// B. The Input Area Component (Refined from your Code #1)


    const ChatInput = ({ value, onChange, onSend, disabled }: ChatInputProps) => {
    return (
        <div className="w-full max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-full shadow-lg border border-gray-100 flex items-center px-4 py-3 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            {/* Attachment Button */}
            <AttachmentButton />
            {/* Text Input */}
            <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !disabled && onSend()}
            placeholder="Ask AI Assistant..."
            disabled={disabled}
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 px-4 text-base"
            />


            {/* Tools Button */}
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors mr-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span className="text-xs font-medium">Tools</span>
            </button>

            {/* Send Button */}
            <button
            onClick={onSend}
            disabled={disabled || !value.trim()}
            className={`p-2 rounded-full transition-all duration-200 ${
                value.trim() && !disabled
                ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 transform hover:scale-105"
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
            >
            {disabled ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            )}
            </button>
        </div>
        </div>
    );
    };

// ---  MAIN COMPONENT (Putting it together) ---
    export default function ChatBox() {
    const { messages, input, setInput, isLoading, sendMessage, messagesEndRef } = useChat();

    return (
        <main className="flex flex-col h-[600px] w-full bg-white">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
            <div className="w-full max-w-4xl mx-auto space-y-6">
            {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-20">
                <h3 className="text-lg font-medium text-gray-600">How can I help you today?</h3>
                <p className="text-sm">Start a conversation to see the magic happen.</p>
                </div>
            )}
            
            {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Typing Indicator */}
            {isLoading && (
                <div className="flex justify-start animate-pulse">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm text-gray-500 text-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                </div>
            )}
            
            {/* Invisible element to auto-scroll to */}
            <div ref={messagesEndRef} />
            </div>
        </div>

      {/* Input Area (Sticky Bottom) */}
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-md pb-4 pt-2">
        <ChatInput 
            value={input}
            onChange={setInput}
            onSend={sendMessage}
            disabled={isLoading}
        />
        </div>
    </main>
    );
}