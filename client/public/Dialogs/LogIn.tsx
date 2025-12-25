"use client";
import { useEffect, useState, FormEvent } from "react";

// 1. Define what instructions this component accepts
interface LogInProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToSignUp: () => void; 
}

export default function LogIn({ isOpen, onClose, onSwitchToSignUp }: LogInProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // 2. Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // TODO: Implement actual authentication logic with Supabase
            // Example:
            // const response = await fetch('/api/auth/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email, password })
            // });
            // if (!response.ok) throw new Error('Login failed');
            
            console.log("Login attempt:", { email, password });
            // Placeholder success
            alert("Login functionality coming soon!");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // 3. If isOpen is false, return nothing (don't draw the box)
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
        <div  id = "LogIn" className="fixed inset-0 flex items-center justify-center z-[100]">
            
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
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Log In</h2>
                
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                            placeholder="Enter your email" 
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-4">Password</label>
                        <input 
                            type="password"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                            placeholder="Enter your password" 
                        />
                    </div>
                    
                    <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                        Log In
                    </button>
                    <label className="block text-sm font-medium text-gray-600 text-center">Or</label>
                    <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                        Log In with Google
                    </button>
                    <label className="block text-sm font-medium text-gray-600 text-center"> you dont have an account? 
                        <button 
                            type="button" 
                            onClick={onSwitchToSignUp} 
                            className="text-blue-600 hover:underline ml-1 font-bold"
                        > Sign Up
                        </button>
                    </label>
                </form>

            </div>
        </div>
    );
}