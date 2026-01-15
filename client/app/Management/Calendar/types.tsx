export interface Events{
    title: string;
    platform: "Facebook" | "Instagram" | "Twitter" | "LinkedIn" | "Tiktok" | "Pinterest";
    
    start: Date;
    end: Date;
    time: string;
    // Optional fields for extended event details
    guestList?: string[];
    caption?: string;
    music?: string;
    hashtags?: string[];
    automaticComments?: boolean;
    ownComments?: string[];
}

export interface DetailDDialogsProps {
    isOpen: boolean;
    onClose: () => void;
}