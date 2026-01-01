"use client";
import { useState } from "react";
import { api } from "@/lib/api";

export default function ChatBox() {
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState<Array<{role: string, text: string}>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!message.trim() || isLoading) return;
        
        // Add user message to conversation
        const userMessage = { role: "user", text: message };
        setConversation(prev => [...prev, userMessage]);
        setMessage(""); // Clear input
        setIsLoading(true);

        try {
            // Call AI API
            const result = await api.ai.chat(message);
            
            // Add AI response to conversation
            const aiMessage = { role: "ai", text: result.response };
            setConversation(prev => [...prev, aiMessage]);
        } catch (error) {
            // Show error message
            const errorMessage = { 
                role: "error", 
                text: "Sorry, I couldn't process that. Try again!" 
            };
            setConversation(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat History */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {conversation.map((msg, idx) => (
                    <div 
                        key={idx}
                        className={`p-4 rounded-lg ${
                            msg.role === "user" 
                                ? "bg-blue-100 ml-auto max-w-[80%]" 
                                : msg.role === "error"
                                ? "bg-red-100 max-w-[80%]"
                                : "bg-gray-100 mr-auto max-w-[80%]"
                        }`}
                    >
                        <p className="text-gray-800">{msg.text}</p>
                    </div>
                ))}
                {isLoading && (
                    <div className="bg-gray-100 p-4 rounded-lg max-w-[80%]">
                        <p className="text-gray-500 animate-pulse">AI is thinking...</p>
                    </div>
                )}
            </div>

            {/* Input Box */}
            <div className="w-full max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-full shadow-md border border-gray-200 flex items-center px-6 py-4">
                    <input 
                        type="text" 
                        placeholder="Ask AI Assistant" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isLoading}
                        className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                    />
                    
                    <button 
                        onClick={handleSend}
                        disabled={isLoading || !message.trim()}
                        className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? "Sending..." : "Send"}
                    </button>
                </div>
            </div>
        </div>
    );
}