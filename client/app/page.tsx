"use client";
import { useState, useEffect } from "react";
import Navigation from "./Landing/navigation";
import LandingPage from "./Landing/landingpage";
import AboutUs from "./Landing/aboutUs";
import Services from "./Landing/services";
import Blog from "./Landing/blog";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    // 1. Ask Python (Port 8000) for the posts
    fetch("http://127.0.0.1:8000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setStatus("Connected");
      })
      .catch((err) => {
        console.error(err);
        setStatus("Error: Is the Python Backend running?");
      });
  }, []);

  return (
    
    <main className="  justify-center ">
      <Navigation />
      <LandingPage />
      <AboutUs />
      <Services />
      <Blog />
      <h1 className=" items-center flex flex-col text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        ASAP DASHBOARD
      </h1>

      {/* STATUS LIGHT */}
      <div className={` items-center flex flex-col mb-8 px-4 py-2 rounded-full text-sm font-mono border ${
        status === "Connected" ? "border-green-500 text-green-400 bg-green-900/20" : "border-red-500 text-red-400 bg-red-900/20"
      }`}>
        ● System Status: {status}
      </div>
      {/* DATA DISPLAY */}
      <div className=" items-center flex flex-col w-full max-w-2xl grid gap-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts found in Supabase.</p>
        ) : (
          posts.map((post: any) => (
            <div key={post.id} className="p-6 border border-gray-800 rounded-xl bg-gray-900/50 hover:border-blue-500 transition-all">
              <h2 className="text-xl font-semibold mb-2 text-blue-300">Social Post #{post.id}</h2>
              <p className="text-gray-300 text-lg">{post.content}</p>
            </div>
          ))
        )}
      </div>
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