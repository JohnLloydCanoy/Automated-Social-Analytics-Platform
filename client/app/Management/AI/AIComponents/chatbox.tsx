"use client";
import { Mic, Plus, Hammer, ChevronDown } from "lucide-react";

export default function ChatBox() {
    return (
        <>
            <main>
                <div className="mt-4 p-4 ">
                    <span>
                        <div className="flex items-center mt-4 gap-2">
                            <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                                <Mic className="w-5 h-5" />
                            </button>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center mt-4 gap-2">
                            <button className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition">
                                <Hammer className="w-5 h-5" />
                            </button>
                            <select className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                <option>Choose an action...</option>
                                <option>Analyze Sentiment</option>
                                <option>Generate Summary</option>
                                <option>Suggest Hashtags</option>
                            </select>
                            <button className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition">
                                <ChevronDown className="w-5 h-5" />
                            </button>
                        </div>
                    </span>
                </div>
            </main>
        </>
    );
}