"use client";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAsyncAction } from "@/lib/useAsyncAction";
import GlobalLoader from "../Components/GlobalLoader";

// 1. Define what instructions this component accepts
interface LogInProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToSignUp: () => void;
}

export default function LogIn({ isOpen, onClose, onSwitchToSignUp }: LogInProps) {
    const router = useRouter();
    // Use the custom hook for loading/error state
    const { isLoading, error, start, stop, fail } = useAsyncAction();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 2. Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        start(); // Start the loader

        try {
            // Actual authentication logic with Supabase
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;
            
            // If successful:
            stop();
            onClose();
            router.push("/Dashboard"); // Redirect to Dashboard

        } catch (err: any) {
            // Pass the error message to our hook
            fail(err.message || "Login failed. Please try again.");
        }
    };

    // 3. If isOpen is false, return nothing
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* Global Loader appears automatically when isLoading is true */}
            {isLoading && <GlobalLoader message="Verifying Credentials..." />}

            <div id="LogIn" className="fixed inset-0 flex items-center justify-center z-[100]">
                
                {/* Dark Background */}
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
                    
                    {/* ERROR MESSAGE BOX (Only shows if login fails) */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                                placeholder="Enter your email" 
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700 mt-4">Password</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                                placeholder="Enter your password" 
                                required
                            />
                        </div>
                        
                        <button 
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-bold disabled:bg-blue-300"
                        >
                            {isLoading ? "Logging In..." : "Log In"}
                        </button>

                        <label className="block text-sm font-medium text-gray-600 text-center">Or</label>
                        
                        <button type="button" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                            Log In with Google
                        </button>
                        
                        <label className="block text-sm font-medium text-gray-600 text-center"> 
                            You don't have an account? 
                            <button 
                                type="button" 
                                onClick={onSwitchToSignUp} 
                                className="text-blue-600 hover:underline ml-1 font-bold"
                            > 
                                Sign Up
                            </button>
                        </label>
                    </form>

                </div>
            </div>
        </>
    );
}