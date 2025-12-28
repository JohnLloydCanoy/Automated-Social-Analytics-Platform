"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";


export default function Introduction(){
    const [userName, setUserName] = useState("Loading...");
    useEffect(() => {
        const fetchUserName = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user && user.user_metadata) {
                const first = user.user_metadata.first_name || "";
                const last = user.user_metadata.last_name || "";
                if (first || last) {
                    setUserName(`${first} ${last}`.trim());
                } else {
                    setUserName("User");
                }
            }
        };
        fetchUserName();
    }, []);
    
    return(
        <>
            <main>
                <h1 className="text-gray-500 font-medium">Hello, Good Day, {userName}!</h1>
            </main>
        </>
    );
}