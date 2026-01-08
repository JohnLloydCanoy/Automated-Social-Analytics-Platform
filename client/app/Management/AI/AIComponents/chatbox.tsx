"use client";
import { useState } from "react";
import { Mic, Plus, ArrowRight} from "lucide-react";
import { Message } from "../types";
import Conversation from "./conversation";


export default function ChatBox() {
    const  [input, setInput]= useState("");
    const [isLoading, setIsLoading]= useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSend = async () => {
        if (input.trim() === "") return;
        // Handle sending message logic here
        const newMessage: Message = {
            id: Date.now().toString(),
            text: input,
            date_asked: new Date(),
        };
        setMessages([...messages, newMessage]);
        setInput("");
        setIsLoading(true);

        // Simulate bot response
        try{
            const response = await fetch('/api/ai/respond', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: newMessage.text,
                }),
            });
            const data = await response.json();
            const botMessage: Message = {
                id: Date.now().toString() + '-bot',
                text: data.answer,
                date_asked: new Date(),
            };
            setMessages([...messages, botMessage]);
        } catch (error) {
            console.error("Error fetching bot response:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <main >
                {/* Chat Box Container */}
                <span>
                    <div>
                        <div className=" p-4 mt-4 rounded-2xl shadow-lg shadow-black/10">
                            <div className="flex items-center gap-2">
                                {/*Plus Button */}
                                <div className="flex">
                                    <button className="hover:bg-blue-200 py-2 px-2 rounded-full flex items-center gap-2">
                                        <Plus className="w-6 h-6" />
                                    </button>
                                </div>
                                {/* Chat Input Area */}
                                <div className="flex-grow">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        className="w-full p-2 focus:outline-none"
                                    />
                                </div>
                            
                                
                                {/* Action Buttons */}
                                <div className="flex items-center justify-between mt-4">
                                    <button className="flex items-center gap-2 hover:bg-blue-200 py-2 px-4 rounded-full">
                                        <Mic className="w-5 h-5" />
                                    </button>
                                    {/* Send Button */}
                                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition-colors">
                                        {/* Option A: Classic Arrow */}
                                        <ArrowRight strokeWidth={5} className="w-5 h-6" /> 
                                        
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