"use client"; 
import { useState } from "react";
import Hnavigation from "../Navigation/HNavigation";
import VNagivation from "../Navigation/VNavigation";
import { FaPlus } from "react-icons/fa";
import { MASTER_PLATFORMS } from "../data/platform"; 
import SocialPlatformCard from "@/Components/SocialPlatformCard"; 
import AddPlatformModal from "@/Components/AddPlatformModal"; 

export default function DashboardPage() {
    const [myPlatforms, setMyPlatforms] = useState(MASTER_PLATFORMS.slice(0, 4));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const availablePlatforms = MASTER_PLATFORMS.filter(p => !myPlatforms.some(mp => mp.name === p.name));
    const handleAdd = (platform: any) => {
        setMyPlatforms([...myPlatforms, platform]); 
        setIsModalOpen(false); 
    };
    const handleRemove = (name: string) => {
        setMyPlatforms(myPlatforms.filter(p => p.name !== name));
    };
    const handleConnectionChange = (platformName: string, isConnected: boolean) => {
        setMyPlatforms(prev => prev.map(p => 
            p.name === platformName ? { ...p, connected: isConnected } : p
        ));
    };
    
    return (
        <div className="flex h-screen overflow-hidden p-2 bg-gray-50">
            <aside className="flex shrink-0"><VNagivation /></aside>

            <div className="flex flex-col flex-1 h-screen">
                <header className="ml-2 mr-2 mb-2"><Hnavigation /></header>

                <main className="flex-1 overflow-y-auto p-2 pb-20 relative">
                    <div className="bg-white p-6 rounded-2xl shadow-lg shadow-black/5 mb-4">
                        <h1 className="text-gray-500 font-medium">Hello, Good Day!</h1>
                        <h1 className="text-3xl font-bold mb-2 text-gray-800">Dashboard</h1>
                        <p className="text-gray-400">Welcome to your dashboard!</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg shadow-black/5 mt-2">
                        <h1 className="font-black text-xl text-gray-800">Social Media Accounts</h1>
                        <p className="text-gray-500 text-sm mt-1">Connect and manage your accounts.</p>
                        
                        <div className="overflow-x-auto mt-4 pb-4">
                            <ul className="flex gap-6 py-4 px-2 w-fit mx-auto">
                                {myPlatforms.map((account) => (
                                    <SocialPlatformCard 
                                        key={account.name}
                                        data={account}
                                        onRemove={() => handleRemove(account.name)}
                                        onConnectionChange={(isConnected) => handleConnectionChange(account.name, isConnected)}
                                    />
                                ))}

                                {availablePlatforms.length > 0 && (
                                    <li className="flex flex-col items-center gap-2 min-w-[80px] flex-shrink-0 pt-2">
                                        <button onClick={() => setIsModalOpen(true)} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 w-[58px] h-[58px] flex items-center justify-center transition-colors">
                                            <FaPlus className="text-gray-400" />
                                        </button>
                                        <span className="font-bold text-gray-400 text-sm">Add New</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* THIS IS THE PART THAT WAS MISSING */}
                    <AddPlatformModal 
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        availablePlatforms={availablePlatforms}
                        onAdd={handleAdd}
                    />

                </main>
            </div>
        </div>
    );
}