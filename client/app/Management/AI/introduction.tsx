"use client";

import { useUserName } from "@/functions/nameGetter";


export default function Introduction(){
    const { userName } = useUserName();
    
    return(
        <>
            <main>
                <h1 className="text-gray-500 font-medium">Hello, Good Day, {userName}!</h1>
            </main>
        </>
    );
}