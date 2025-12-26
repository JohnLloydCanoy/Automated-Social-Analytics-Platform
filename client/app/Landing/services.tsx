"use client";

export default function Services() {
    return (
        <section id="Services" className=" w-full scroll-mt-20  px-50 py-5">
            <div className="flex items-center justify-between gap-10">
                <div className="flex flex-col text-left max-w-lg">
                    <h2 className="text-5xl font-extrabold mb-6 text-black leading-tight">
                        Our Services
                    </h2>
                    <p className="text-lg text-gray-900 leading-relaxed">
                        At ASAP, we offer a range of services designed to help you maximize your social media presence.
                    </p>
                    <ul className="list-disc list-inside mt-4 text-gray-900">
                        <li className="mb-2">Automated Social Media Analytics</li>
                        <li className="mb-2">Comprehensive Reporting</li>
                        <li className="mb-2">Performance Tracking</li>
                        <li className="mb-2">Customizable Dashboards</li>
                        <li className="mb-2">Multi-Platform Integration</li>
                    </ul>
                </div>
                <img src="/Icon.png" alt="ServicesIcon" width={500} height={500} />
            </div>
        </section>
    );
}