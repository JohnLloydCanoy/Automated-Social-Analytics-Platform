"use client"; 
import { useState } from "react";
import Hnavigation from "./DNavigation";
import VNagivation from "./VNavigation";
import { 
    FaFacebook, FaTwitter, FaInstagram, FaLinkedin, 
    FaYoutube, FaSnapchatGhost, FaPinterest, FaTiktok, 
    FaWhatsapp, FaReddit, FaPlus, FaTimes
} from "react-icons/fa";

// 1. MASTER LIST
const MASTER_PLATFORMS = [
    { name: "Facebook", connected: false, icon: FaFacebook, color: "text-blue-600" },
    { name: "Twitter", connected: false, icon: FaTwitter, color: "text-sky-500" },
    { name: "Instagram", connected: false, icon: FaInstagram, color: "text-pink-600" },
    { name: "LinkedIn", connected: false, icon: FaLinkedin, color: "text-blue-700" },
    { name: "YouTube", connected: false, icon: FaYoutube, color: "text-red-600" },
    { name: "Snapchat", connected: false, icon: FaSnapchatGhost, color: "text-yellow-400" },
    { name: "Pinterest", connected: false, icon: FaPinterest, color: "text-red-700" },
    { name: "TikTok", connected: false, icon: FaTiktok, color: "text-black" },
    { name: "WhatsApp", connected: false, icon: FaWhatsapp, color: "text-green-500" },
    { name: "Reddit", connected: false, icon: FaReddit, color: "text-orange-600" },
];

export default function DashboardPage() {
    const [myPlatforms, setMyPlatforms] = useState(MASTER_PLATFORMS.slice(0, 4));
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter available platforms
    const availablePlatforms = MASTER_PLATFORMS.filter(
        p => !myPlatforms.some(mp => mp.name === p.name)
    );

    const handleAddPlatform = (platform: any) => {
        setMyPlatforms([...myPlatforms, platform]); 
        setIsModalOpen(false); 
    };

    const removePlatform = (platformName: string) => {
        setMyPlatforms(myPlatforms.filter(p => p.name !== platformName));
    };

    const toggleConnection = (platformName: string) => {
        setMyPlatforms(prevPlatforms => 
            prevPlatforms.map(p => 
                p.name === platformName ? { ...p, connected: !p.connected } : p
            )
        );
    };

    return (
        <div className="flex h-screen overflow-hidden p-2 bg-gray-50">
            <aside className="flex shrink-0">
                <VNagivation />
            </aside>

            <div className="flex flex-col flex-1 h-screen">
                <header className="ml-2 mr-2 mb-2">
                    <Hnavigation />
                </header>

                <main className="flex-1 overflow-y-auto p-2 pb-20 relative">
                    <div className="bg-white p-6 max-w-full rounded-2xl shadow-lg shadow-black/5 mb-4">
                        <h1 className="text-gray-500 font-medium">Hello, Good Day!</h1>
                        <h1 className="text-3xl font-bold mb-2 text-gray-800">Dashboard</h1>
                        <p className="text-gray-400">Welcome to your dashboard! Here you can manage your account and view analytics.</p>
                    </div>

                    <div className="bg-white p-6 max-w-full rounded-2xl shadow-lg shadow-black/5 mt-2">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="font-black text-xl text-gray-800">Social Media Accounts</h1>
                                <p className="text-gray-500 text-sm mt-1">Connect and manage your social media accounts here.</p>
                            </div>
                        </div>
                        
                        {/* 1. OUTER DIV: Handles Scrolling */}
                        <div className="overflow-x-auto mt-4 pb-1">
                            
                            {/* 2. INNER UL: Handles Centering */}
                            {/* w-fit + mx-auto centers the content. py-4 prevents X button clipping. */}
                            <ul className="flex gap-6 py-4 px-2 w-fit mx-auto">
                                {myPlatforms.map((account) => {
                                    const Icon = account.icon;
                                    return (
                                        <li key={account.name} className="relative flex flex-col items-center gap-2 min-w-[80px] flex-shrink-0 group">
                                            
                                            {/* X Button */}
                                            <button 
                                                onClick={() => removePlatform(account.name)}
                                                className="absolute -top-2 -right-1 bg-gray-200 text-gray-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-500 z-10"
                                            >
                                                <FaTimes className="w-3 h-3" />
                                            </button>

                                            <div className={`p-3 rounded-full bg-gray-50 ${account.color.replace('text-', 'bg-').replace('600', '100').replace('500', '100')} bg-opacity-10`}>
                                                <Icon className={`w-8 h-8 ${account.color}`} />
                                            </div>
                                            
                                            <span className="font-bold text-gray-700 text-sm">{account.name}</span>
                                            
                                            <button 
                                                onClick={() => toggleConnection(account.name)}
                                                className={`
                                                    text-[10px] px-3 py-1 rounded-full font-bold transition-all border
                                                    ${account.connected 
                                                        ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200" 
                                                        : "bg-white text-gray-500 border-gray-300 hover:border-blue-500 hover:text-blue-500"
                                                    }
                                                `}
                                            >
                                                {account.connected ? "Connected" : "Connect +"}
                                            </button>
                                        </li>
                                    );
                                })}

                                {availablePlatforms.length > 0 && (
                                    <li className="flex flex-col items-center gap-2 min-w-[80px] flex-shrink-0 pt-2">
                                        <button 
                                            onClick={() => setIsModalOpen(true)}
                                            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300 flex items-center justify-center w-[58px] h-[58px]"
                                        >
                                            <FaPlus className="w-5 h-5 text-gray-400" />
                                        </button>
                                        <span className="font-bold text-gray-400 text-sm">Add New</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-black text-gray-800">Add Platform</h2>
                                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                        <FaTimes className="text-gray-500" />
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-4 gap-4">
                                    {availablePlatforms.map((account) => {
                                        const Icon = account.icon;
                                        return (
                                            <button 
                                                key={account.name}
                                                onClick={() => handleAddPlatform(account)}
                                                className="flex flex-col items-center gap-2 p-2 hover:bg-blue-50 rounded-xl transition-colors"
                                            >
                                                <Icon className={`w-8 h-8 ${account.color}`} />
                                                <span className="text-xs font-bold text-gray-600">{account.name}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}