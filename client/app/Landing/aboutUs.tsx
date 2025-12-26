"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function aboutUs() {
    const pathname = usePathname();
    return (
        <section id="AboutUs" className="bg-[#1B3166] w-full scroll-mt-20 mt-5 px-50 py-5">
            <div className="flex items-center justify-between gap-10">
                <img src="/SittingIcon.png" alt="GuyInTheChair" width={500} height={500} />
                <div className="flex flex-col text-left max-w-lg">
                    <h2 className="text-5xl font-extrabold mb-6 text-black leading-tight">
                        About Us
                    </h2>                                               
                    <p className="text-lg text-gray-300 leading-relaxed">
                        At ASAP, we are dedicated to providing cutting-edge solutions for social media analytics. 
                        Our team of experts combines technology and creativity to help businesses unlock the full potential 
                        of their social media platforms.
                    </p>   
                    <p className="text-lg text-gray-300 leading-relaxed mt-4">
                        Our mission is to empower businesses with actionable insights, enabling them to make informed decisions 
                        and drive growth in the digital landscape. Join us on this journey to revolutionize social media analytics!
                    </p>
                </div>
                
            </div>
        </section>
    );
}