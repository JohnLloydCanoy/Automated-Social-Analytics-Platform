"use client";
import Button from "@/public/Components/Button";


export default function LandingPage() {
    return (
        <section id="Home" className="scroll-mt-20 w-full max-w-7xl mx-auto mb-16 mt-25 px-4">
            <div className="flex items-center justify-between gap-20"> 
                <div className="flex flex-col text-left max-w-lg">  
                    <h2 className="text-5xl font-extrabold mb-6 text-[#0f2e72] leading-tight">
                        Welcome to the Automated Social Analytics Platform (ASAP)
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mt-1">Where we create solutions for your online engagements and business</p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Your one-stop solution for comprehensive social media analytics. 
                        Harness the power of automation to gain insights, track performance, 
                        and optimize your social media strategies across multiple platforms.
                    </p>
                    <Button>Get Started</Button>
                </div>
                <img src="/Icon.png" alt="GuyInTheChair" width={500} height={500} />
            </div>
        </section>
    );
}