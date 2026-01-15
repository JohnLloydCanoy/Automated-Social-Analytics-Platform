import { useState } from 'react';

interface DetailDDialogsProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Events{
    title: string;
    platform: string;
    start: Date;
    end: Date;
    time: string;
}

export default function DetailDDialogs({ isOpen, onClose }: DetailDDialogsProps) {
    if (!isOpen) return null;
    
    return (
        <main className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="p-4 text-center bg-amber-900 text-white rounded-lg">
                <h2>Detail D Dialogs</h2>
                <button onClick={onClose} className="mt-2 px-4 py-2 bg-white text-amber-900 rounded">
                    Close
                </button>
            </div>
        </main>
    );
}