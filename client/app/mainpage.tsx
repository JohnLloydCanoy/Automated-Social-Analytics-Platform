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
    <footer>
        <p className="text-center text-gray-500 mt-16 mb-8">
            &copy; 2024 Automated Social Analytics Platform (ASAP). All rights reserved.
        </p>
        <p>socials</p>
        <p>twitter</p>
        <p>linkedin</p>
        <p>facebook</p>
        <p>instagram</p>
        <p>youtube</p>
        <p>tiktok</p>
        <p>pinterest</p>
        <p>github</p>
    </footer>
    </main>
  );
}