{
    /* AvatarSelector.tsx 
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAsyncAction } from "@/lib/useAsyncAction";
import {PRESET_AVATARS} from "@/app/profile/avatars";

interface AvatarSelectorProps {
    onSelect: (avatar: string) => void;
    currentAvatar: string | null;
    currentUserId: string;
}

function AvatarSelector({ onSelect, currentAvatar, currentUserId }: AvatarSelectorProps) {
    const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
    const { isLoading, start, fail } = useAsyncAction();

    const handleAvatarClick = async (avatar: string) => {
        try {
            start();

            const { data, error } = await supabase
                .from("profiles")
                .update({ avatar_url: avatar })
                .eq("id", currentUserId);
}

*/
}