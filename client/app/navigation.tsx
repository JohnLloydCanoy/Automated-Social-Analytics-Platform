"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import LogIn from "../public/Dialogs/LogIn";
import SignUp from "../public/Dialogs/SignIn"; // Ensure this path is correct

const navigationLinks = [
    { id: "Home", label: "Home" },
    { id: "AboutUs", label: "About Us" },
    { id: "Services", label: "Services" },
    { id: "Blog", label: "Blog" },
    { id: "Login", label: "LOG IN" },
];

export default function Navigation() {
    // 1. FIXED: Added missing activeSection state
    const [activeSection, setActiveSection] = useState("Home");
    
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    // 2. Define the Switching Logic
    const openSignUp = () => {
        setIsLoginOpen(false); // Close Login
        setIsSignUpOpen(true); // Open Sign Up
    };

    const openLogin = () => {
        setIsSignUpOpen(false); // Close Sign Up
        setIsLoginOpen(true);   // Open Login
    };

    useEffect(() => {
        // THE OBSERVER: Watches for sections entering the screen
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.8 } // Triggers when 80% of the section is visible
        );
        navigationLinks.forEach((link) => {
            const section = document.getElementById(link.id);
            if (section) {
                observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <nav className="fixed top-2 left-2 right-2 max-w-11xl mx-auto bg-[#FFFFFF] p-4 rounded-lg shadow-md z-50">
                <div className="flex items-center justify-between mx-4">
                    <div className="flex items-center gap-4">
                        <img 
                            src="/ASAP-LOGO.png" 
                            alt="ASAP Logo" 
                            width={40} 
                            height={40} 
                        />
                        <h1 className="text-[#135CF4] font-black text-sm md:text-base leading-tight">
                            AUTOMATED SOCIAL <br /> ANALYTICS PLATFORM
                        </h1>
                    </div>
                    <ul className="flex space-x-4 text-blue-600 ">
                        {navigationLinks.map((link) =>
                            link.id === "Login" ? (
                                <li key={link.id}>
                                    <button
                                        onClick={() => setIsLoginOpen(true)}
                                        className="text-[#135CF4] hover:text-blue-400 font-bold uppercase tracking-widest text-sm transition-all hover:scale-110"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ) : (
                                <li key={link.id}>
                                    <Link
                                        href={`/#${link.id}`}
                                        className={`transition-all duration-300 text-sm tracking-widest ${
                                            activeSection === link.id
                                                ? "text-[#ffffff] font-bold uppercase bg-[#08193f] bg-opacity-20 p-5 rounded-md"
                                                : "text-[#135CF4] hover:text-blue-400"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </nav>

            {/* 3. FIXED: Rendered BOTH dialogs and passed the switch functions */}
            <LogIn 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)} 
                onSwitchToSignUp={openSignUp} // <--- Connected!
            />

            <SignUp 
                isOpen={isSignUpOpen} 
                onClose={() => setIsSignUpOpen(false)}
                onSwitchToLogin={openLogin}   // <--- Connected!
            />
        </>
    );
}