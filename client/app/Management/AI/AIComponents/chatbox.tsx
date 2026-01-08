"use client";
import { Mic, Plus, ArrowRight} from "lucide-react";

export default function ChatBox() {
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