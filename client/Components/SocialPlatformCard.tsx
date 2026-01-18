import { useState } from 'react';
import { FaTimes } from "react-icons/fa";
import { supabase } from '../lib/supabaseClient'; 
import ConnectSocial from './ConnectSocial';

interface Props {
    data: any;
    onRemove: () => void;
    onConnectionChange: (isConnected: boolean) => void; 
}

export default function SocialPlatformCard({ data, onRemove, onConnectionChange }: Props) {
    const Icon = data.icon;
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleConnect = async () => {
        // Simulate connection process
        };
    return (
        <li className="relative flex flex-col items-center gap-2 min-w-[80px] flex-shrink-0 group">
            <button 
                onClick={onRemove}
                className="absolute -top-2 -right-1 bg-gray-200 text-gray-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-500 z-10"
            >
                <FaTimes className="w-3 h-3" />
            </button>

            <div className={`p-3 rounded-full bg-gray-50 ${data.color.replace('text-', 'bg-').replace('600', '100').replace('500', '100')} bg-opacity-10`}>
                <Icon className={`w-8 h-8 ${data.color}`} />
            </div>
            
            <span className="font-bold text-gray-700 text-sm">{data.name}</span>
            
            <button 
                onClick={handleConnect}
                disabled={isLoading || data.connected}
                className={`text-[10px] px-3 py-1 rounded-full font-bold transition-all border ${
                    data.connected 
                    ? "bg-green-100 text-green-700 border-green-200 cursor-default" 
                    : "bg-white text-gray-500 border-gray-300 hover:border-blue-500 hover:text-blue-500"
                }`}
            >
                {isLoading ? "..." : (data.connected ? "Connected" : "Connect +")}
            </button>
        </li>
    );
}