"use client";
import { useState } from "react";
import { Mic, Plus, ArrowRight} from "lucide-react";
import { Message } from "../types";
import Conversation from "./conversation";

export default function ChatBox() {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSend = async () => {
        if (input.trim() === "") return;

        const apiURL = process.env.NEXT_PUBLIC_API_URL;
        if (!apiURL) {
            console.error("API URL is not defined");
            return;
        }

        // 1️⃣ Create USER message (no answer field)
        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            date_asked: new Date(),
        };
        
        // 2️⃣ Add user message immediately
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // 3️⃣ Fetch bot response
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.text,
                }),
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            // 4️⃣ Create BOT message (has answer field)
            const botMessage: Message = {
                id: Date.now().toString() + '-bot',
                text: data.response,
                date_asked: new Date(),
                answer: data.response,  // This marks it as a bot message
            };
            
            // 5️⃣ Add bot message (don't remove user message!)
            setMessages(prev => [...prev, botMessage]);
            
        } catch (error) {
            console.error("Error fetching bot response:", error);
            
            // Show error message to user
            const errorMessage: Message = {
                id: Date.now().toString() + '-error',
                text: "Sorry, I couldn't process your request. Please try again.",
                date_asked: new Date(),
                answer: "Sorry, I couldn't process your request. Please try again.",
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <main>
                {/* Conversation Display */}
                <Conversation messages={messages} />
                
                {/* Chat Input */}
                <span>
                    <div>
                        <div className="p-4 mt-4 rounded-2xl shadow-lg shadow-black/10">
                            <div className="flex items-center gap-2">
                                {/* Plus Button */}
                                <div className="flex">
                                    <button className="hover:bg-blue-200 py-2 px-2 rounded-full flex items-center gap-2">
                                        <Plus className="w-6 h-6" />
                                    </button>
                                </div>
                                
                                {/* Input Field */}
                                <div className="flex-grow">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSend();
                                            }
                                        }}
                                        className="w-full p-2 focus:outline-none"
                                        disabled={isLoading}
                                    />
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex items-center justify-between mt-4">
                                    <button className="flex items-center gap-2 hover:bg-blue-200 py-2 px-4 rounded-full">
                                        <Mic className="w-5 h-5" />
                                    </button>
                                    
                                    {/* Send Button */}
                                    <button 
                                        onClick={handleSend} 
                                        disabled={isLoading}
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition-colors disabled:opacity-50"
                                    >
                                        {isLoading ? "Sending..." : <ArrowRight strokeWidth={5} className="w-5 h-6" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </span>
            </main>
        </>
    );
}