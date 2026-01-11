"use client";
import {useState} from "react";

export default function DetailDDialogs() {
    interface DetailDDialogsProps {
        isOpen: boolean;
        onClose: () => void;
    }
    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    if (!isOpen) return null;
    return (
        <>
            <main>
                <div className="p-4 text-center bg-amber-900 text-white rounded-lg">
                    Detail D Dialogs
                </div>
            </main>
        </>
    );
}