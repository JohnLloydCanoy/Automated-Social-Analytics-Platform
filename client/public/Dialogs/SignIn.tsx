"use client";
import { useEffect } from "react";

// 1. Define what instructions this component accepts
interface SignUpProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void; // <--- ADD THIS (To go back to login)
}

export default function SignUp({ isOpen, onClose, onSwitchToLogin }: SignUpProps) {
    // 2. If isOpen is false, return nothing (don't draw the box)   
    useEffect(() => {
        if (isOpen) {
            // Freeze the body
            document.body.style.overflow = "hidden";
        } else {
            // Unfreeze (just in case)
            document.body.style.overflow = "unset";
        }

        // Cleanup: When the modal closes (unmounts), unfreeze the body
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);
    if (!isOpen) return null;  
    return (
        <div  id = "signup" className="fixed inset-0 flex items-center justify-center z-[100]"> 
            {/* Dark Background (Clicking this closes the modal) */}
            <div 
                className="absolute inset-0 bg-[#08193f] opacity-80 backdrop-blur-sm"
            ></div>
            {/* The White Box */}
            <div className="bg-white p-8 rounded-lg shadow-xl w-96 relative z-10 animate-fade-in-up">
                {/* Close Button (X) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 font-bold"
                >
                    ✕
                </button>
                <img
                    src="/ASAP.png" 
                    alt="ASAP Logo" 
                    width={80} 
                    height={80}
                    className="mx-auto mb-4"
                    />
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Sign In</h2>
                
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                            />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                            />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                        Sign In
                    </button>
                    <hr className="my-4" />
                    <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition mb-2">
                        Sign In with Facebook
                    </button>
                    <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                        Sign In with Google
                    </button>
                </form>
            </div>
        </div>
    );
}