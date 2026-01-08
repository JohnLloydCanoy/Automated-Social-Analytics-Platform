"use client";
import {useState} from "react";
import { Mic, Plus, Hammer, ChevronDown } from "lucide-react";
import { Question } from "../types";

export default function ChatBox() {
    return (
        <>
            <main>
                {/* Chat Box Container */}
                <span>
                    <div>
                        <div className=" p-4 mt-4 rounded-2xl shadow-lg shadow-black/10">
                            {/*Plus Button */}
                            <div className="flex">
                                <button className="hover:bg-blue-200 py-2 px-2 rounded-full flex items-center gap-2">
                                    <Plus className="w-6 h-6" />
                                </button>
                            </div>
                            {/* Chat Input Area */}
                            <div className="mt-4">
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
                                    <span>Send</span>
                                </button>
                                <button className="flex items-center gap-2 hover:bg-blue-200 py-2 px-4 rounded-full">
                                    <Hammer className="w-5 h-5" />
                                    <span>Analyze</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </span>
            </main>
        </>
    );
}