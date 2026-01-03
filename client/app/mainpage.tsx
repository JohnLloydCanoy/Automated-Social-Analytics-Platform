"use client";
import { useState, useEffect } from "react";
import Navigation from "./Landing/navigation";
import LandingPage from "./Landing/landingpage";
import AboutUs from "./Landing/aboutUs";
import Services from "./Landing/services";
import Blog from "./Landing/blog";

export default function MainPage() {
    const [posts, setPosts] = useState([]);
    const [status, setStatus] = useState("Loading...");

return (
    
    <main className="  justify-center ">
        <Navigation />
        <LandingPage />
        <AboutUs />
        <Services />
        <Blog />
    <footer className="bg-[#020327] text-center p-6 text-white ">
        <p className="text-center mb-8">
            &copy; 2024 Automated Social Analytics Platform (ASAP). All rights reserved.
        </p>
        <div className="flex justify-center space-x-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact Us</a>
            <a href="#" className="hover:underline">FAQ</a>
            
        </div>

    </footer>
    </main>
);
}