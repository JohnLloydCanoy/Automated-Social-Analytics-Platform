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

interface SocialMediaInfo {
    username?: string;
    email?: string;
    apiKey?: string;
    apiSecret?: string;
    accessToken?: string;
}

interface ConnectSocialInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (info: SocialMediaInfo) => void;
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

// New Modal for collecting social media information
export function ConnectSocialInfoModal({ isOpen, onClose, onSubmit, platformName, isLoading }: ConnectSocialInfoModalProps) {
    const [formData, setFormData] = useState<SocialMediaInfo>({
        username: "",
        email: "",
        apiKey: "",
        apiSecret: "",
        accessToken: "",
    });

    const handleInputChange = (field: keyof SocialMediaInfo, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const getRequiredFields = () => {
        switch (platformName.toLowerCase()) {
            case "twitter":
            case "x":
                return ["username", "apiKey", "apiSecret", "accessToken"];
            case "facebook":
            case "instagram":
                return ["username", "accessToken"];
            case "linkedin":
                return ["email", "accessToken"];
            case "tiktok":
            case "youtube":
                return ["username", "apiKey"];
            default:
                return ["username"];
        }
    };

    const requiredFields = getRequiredFields();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
                
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
                    disabled={isLoading}
                >
                    <FaTimes />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                        <span className="text-2xl">🔑</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900">
                        Connect {platformName}
                    </h3>
                    
                    <p className="text-sm text-gray-500 mt-2">
                        Enter your {platformName} credentials to connect your account
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {requiredFields.includes("username") && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => handleInputChange("username", e.target.value)}
                                placeholder={`Your ${platformName} username`}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    )}

                    {requiredFields.includes("email") && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder={`Your ${platformName} email`}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    )}

                    {requiredFields.includes("apiKey") && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                API Key <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.apiKey}
                                onChange={(e) => handleInputChange("apiKey", e.target.value)}
                                placeholder="Enter your API key"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono text-sm"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    )}

                    {requiredFields.includes("apiSecret") && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                API Secret <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                value={formData.apiSecret}
                                onChange={(e) => handleInputChange("apiSecret", e.target.value)}
                                placeholder="Enter your API secret"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono text-sm"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    )}

                    {requiredFields.includes("accessToken") && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Access Token <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={formData.accessToken}
                                onChange={(e) => handleInputChange("accessToken", e.target.value)}
                                placeholder="Paste your access token here"
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono text-sm resize-none"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    )}

                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs text-blue-800">
                            <strong>Note:</strong> Your credentials are securely encrypted and stored. We never share your information with third parties.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Connecting..." : "Connect Account"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}