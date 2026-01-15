"use client";
import { LayoutDashboard, Bot, CalendarDays, BarChart, FileText,User, Settings, LogOut, Sparkles, Bell } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import LogOutModal from "@/Components/Dialogs/logOutModal";
import { useUserName } from "@/functions/nameGetter";

const VNavigationLinks = [
    { name: 'Dashboard', href: '/Management/Dashboard', icon: LayoutDashboard },
    { name: 'Automate', href: '/Management/Automate', icon: Bot },
    { name: 'AI', href: '/Management/AI', icon: Sparkles }, 
    { name: 'Calendar', href: '/Management/Calendar', icon: CalendarDays },
    { name: 'Analytics', href: '/Management/Analytics', icon: BarChart },
    { name: 'Post', href: '/Management/Post', icon: FileText },
    { name: 'Account', href: '/Management/Account', icon: User },
    { name: 'Settings', href: '/Management/Settings', icon: Settings },
];

export default function VNavigation() {
    const { userName } = useUserName();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const pathname = usePathname();
    return (
        <>
            <nav className="bg-[#ffffff] p-4 text-black max-w-90 max padding-y-10 h-full rounded-2xl shadow-black/10 shadow-lg">
                <div className="flex items-center justify-start gap-4">
                    <img
                            src="/ASAP.png" 
                            alt="ASAP Logo" 
                            width={80} 
                            height={80}

                        />
                    <h1 className="text-[#135CF4] font-black text-sm md:text-base leading-tight">
                    AUTOMATED SOCIAL <br /> ANALYTICS PLATFORM
                    </h1>
                </div>
                    <h6 className="text-gray-500 text-sm mt-0">Manage with AI</h6>
                <div className="flex items-center">
                <img 
                        src="/JLpLaceHolder.png" 
                        alt=""
                        width={90}
                        height={90} 
                        className="rounded-full mt-6 mb-6 shadow-lg shadow-black/50"
                    />
                    <div className="font-bold text-gray-900 leading-tight ml-4">
                        <h1 className="text-1xl font-black">Hello, Good Day! </h1>
                        <h1 className="text-1xl font-black">{userName}</h1>
                    </div>
                        
                </div>
                <ul className="flex flex-col space-y-3 mt-0 items-start pl-10">
                    {VNavigationLinks.map((link) => {const Icon = link.icon; 
                    const isActive = pathname === link.href;
                    return (
                        <li key={link.name}>
                            <a 
                                href={link.href} 
                                className={`flex items-center gap-3 px-6 py-3 hover:bg-blue-50 text-gray-900 hover:text-blue-600 rounded-lg transition-all font-medium group ${isActive ? 'bg-blue-100 text-blue-700' : ''}`}
                            >
                                {Icon && <Icon className="w-5 h-5" />}
                                
                                <span>{link.name}</span>
                            </a>
                        </li>
                    );
                })}
                    <li>
                        <button 
                            onClick={() => setIsLogoutModalOpen(true)}
                            className="flex items-center gap-3 px-6 py-3 hover:bg-red-50 text-gray-900 hover:text-red-600 rounded-lg transition-all font-medium group w-full text-left"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
            <LogOutModal 
                isOpen={isLogoutModalOpen} 
                onClose={() => setIsLogoutModalOpen(false)} 
            />
        </>
    );
}