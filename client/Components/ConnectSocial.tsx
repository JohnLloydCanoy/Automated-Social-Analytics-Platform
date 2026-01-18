"use client";
import { useState } from "react";

interface connectPlatformProps {
    // Define any props if needed in the future
    isOpen: boolean;
    onClose: () => void;
}

export default function ConnectSocial() {

    const [isConnecting, setIsConnecting] = useState(false);
    return (
        <>
            <main>
                <div className="bg-white p-6 rounded-2xl items-center justify-center shadow-lg shadow-black/5 mb-4">
                    <h1>Connect Social Component</h1>
                </div>
                
            </main>
        </>
    );
}