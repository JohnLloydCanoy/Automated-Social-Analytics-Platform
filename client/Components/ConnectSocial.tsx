"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface connectPlatformProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    platformName: string;
    isLoading: boolean;
}

export default function ConnectSocial({ isOpen, onClose, onConfirm, platformName, isLoading }: connectPlatformProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <FaTimes />
                </button>

                {/* Content */}
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                        <span className="text-2xl">🔗</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900">
                        Connect to {platformName}?
                    </h3>
                    
                    <p className="text-sm text-gray-500 mt-2">
                        You are about to be redirected to {platformName} to authorize ASAP App to post on your behalf.
                    </p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Redirecting..." : `Continue to ${platformName}`}
                    </button>
                </div>
            </div>
        </div>
    );
}