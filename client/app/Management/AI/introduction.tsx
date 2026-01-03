"use client";

import { useUserName } from "@/functions/nameGetter";


export default function Introduction(){
    const { userName } = useUserName();
    
    return(
        <>
            <main>
                <h1 className="font-black text-xl text-gray-800">Hello, Good Day, {userName}!</h1>
                <h2 className="text-4xl md:text-5xl font-light text-gray-800">
                    It&apos;s time to optimize your social presence
                </h2>
            </main>
        </>
    );
}