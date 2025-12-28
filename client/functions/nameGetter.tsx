"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useUserName() {
    const [userName, setUserName] = useState<string>("Loading...");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user && user.user_metadata) {
                    const first = user.user_metadata.first_name || "";
                    const last = user.user_metadata.last_name || "";
                    if (first || last) {
                        setUserName(`${first} ${last}`.trim());
                    } else {
                        setUserName("User");
                    }
                } else {
                    setUserName("Guest");
                }
            } catch (error) {
                console.error("Error fetching user name:", error);
                setUserName("User");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserName();
    }, []);

    return { userName, isLoading };
}