"use client";

export default function blog() {
    return (
        <section id="Blog" className="bg-[#1B3166] w-full scroll-mt-20 px-50 py-5">
            <div className="flex items-center justify-between gap-10">
                <img src="/Icon.png" alt="BlogIcon" width={500} height={500} />
                <div className="flex flex-col text-left max-w-lg">
                    <h2 className="text-5xl font-extrabold mb-6 text-black leading-tight">
                        Our Blog
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Welcome to the ASAP Blog! Here, we share the latest insights, trends, and tips on social media analytics and digital marketing. 
                        Stay informed with our expert articles designed to help you navigate the ever-evolving world of social media.
                    </p>
                </div>
            </div>
        </section>
    );
}