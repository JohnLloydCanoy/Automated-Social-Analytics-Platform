"use client";






export default function LandingPage() {
    return (
        <section id="Home" className="scroll-mt-20 w-full max-w-6xl mx-auto mb-16 mt-10 px-4">
            <div className="flex items-center justify-between gap-10"> 
                <div className="flex flex-col text-left max-w-lg">  
                    <h2 className="text-5xl font-extrabold mb-6 text-black leading-tight">
                        Welcome to the Automated Social Analytics Platform (ASAP)
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Your one-stop solution for comprehensive social media analytics. 
                        Harness the power of automation to gain insights, track performance, 
                        and optimize your social media strategies across multiple platforms.
                    </p>
                </div>
                <img src="/Icon.png" alt="GuyInTheChair" width={500} height={500} />
            </div>
        </section>
    );
}