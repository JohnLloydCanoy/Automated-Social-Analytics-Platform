"use client";
import { LayoutDashboard, Bot, CalendarDays, BarChart, FileText,User, Settings, LogOut, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const VNavigationLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Automate', href: '/automate', icon: Bot },
    { name: 'AI Component', href: '/ai', icon: Sparkles }, 
    { name: 'Calendar', href: '/calendar', icon: CalendarDays },
    { name: 'Analytics', href: '/analytics', icon: BarChart },
    { name: 'Post', href: '/reports', icon: FileText },
    { name: 'Account', href: '/account', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Logout', href: '/logout', icon: LogOut },
];

export default function VNavigation() {
    const [userName, setUserName] = useState("Loading...");
    useEffect(() => {
        const fetchUserName = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user && user.user_metadata) {
                const first = user.user_metadata.first_name || "";
                const last = user.user_metadata.last_name || "";
                if (first || last) {
                    setUserName(`${first} ${last}`.trim());
                } else {
                    setUserName("User");
                }
            }
        };
        fetchUserName();
    }, []);
    return (
        <>
            <nav className="bg-[#ffffff] p-4 text-black max-w-90 max padding-y-10 h-screen rounded-2xl ml-2 mt-2 shadow-black/10 shadow-lg mb-2">
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
                        src="/JLpLaceHolder.jpg" 
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
                    
                    return (
                        <li key={link.name}>
                            <a 
                                href={link.href} 
                                className="flex items-center gap-3 px-6 py-3 hover:bg-blue-50 text-gray-900 hover:text-blue-600 rounded-lg transition-all font-medium group"
                            >
                                {Icon && <Icon className="w-5 h-5" />}
                                
                                <span>{link.name}</span>
                            </a>
                        </li>
                    );
                })}
                </ul>
            </nav>
        </>
    );
}