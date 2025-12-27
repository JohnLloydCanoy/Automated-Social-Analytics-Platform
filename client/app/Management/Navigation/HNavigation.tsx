"use client";
import { Bell, Search } from "lucide-react";

export default function HNavigation() {
    return (
        <nav className="
            bg-[#ffffff] 
            p-4 
            text-black 
            rounded-2xl 
            shadow-lg 
            shadow-black/10 
            mr-2
            ml-auto
            flex
            items-center
            gap-4
        ">
            <div className="ml-auto flex items-center flex-1 bg-gray-100 rounded-xl px-4 py-2 max-w-md">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-transparent border-none outline-none ml-2 flex-1 text-gray-700 placeholder-gray-400"
                />
            </div>
            <Bell className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" />
        </nav>
    );
}