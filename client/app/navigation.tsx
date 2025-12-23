"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationLinks = [
    { href: "/#", label: "Home" },
    { href: "/#", label: "About" },
    { href: "/#", label: "Contact" },
];

export default function Navigation() {
    const pathname = usePathname();
    return (
        <nav className="fixed top-2 left-2 right-2 max-w-11xl mx-auto bg-[#FFFFFF] p-4 rounded-lg shadow-md z-50" >
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
                <ul className="flex space-x-4">
                    {navigationLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`text-[#135CF4] hover:text-blue-400 ${
                                    pathname === link.href ? "font-bold underline" : ""
                                }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}