"use client";
import { useRouter } from "next/navigation";
import GlobalLoader from "../GlobalLoader";
import { supabase } from "@/lib/supabaseClient";
import { useAsyncAction } from "@/lib/useAsyncAction";

interface logOutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function logOutModal({ isOpen, onClose }: logOutModalProps) {
    const router = useRouter();
    const { isLoading, start, fail } = useAsyncAction();

    const handleLogOut = async () => {
        try {
            start();
            
            // Sign out from Supabase - this clears all session data
            const { error } = await supabase.auth.signOut();
            
            if (error) {
                console.error("Error signing out:", error);
                fail("Error signing out");
                return;
            }
            
            // Clear any local storage items
            localStorage.clear();
            sessionStorage.clear();
            
            // Close the modal
            onClose();
            
            // Redirect to home page
            router.push("/");
            
            // Force a full page refresh to clear all state
            window.location.href = "/";
        } catch (error) {
            console.error("Logout error:", error);
            fail("Logout error");
        }
    };

    if (!isOpen) return null;

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">
                        Log Out?
                    </h2>
                    
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to log out? You'll need to sign in again to access your account.
                    </p>
                    
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLogOut}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? <GlobalLoader /> : "Log Out"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}