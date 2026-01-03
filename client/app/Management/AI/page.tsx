import Hnavigation from "../Navigation/HNavigation";
import VNagivation from "../Navigation/VNavigation";
import ChatBox from "./assistant";


export default function AIPage() {
    return (
        <div className="flex h-screen overflow-hidden p-2 bg-gray-50">
            <aside className="flex shrink-0"><VNagivation /></aside>
            <div className="flex flex-col flex-1 h-screen">
                <header className="ml-2 mr-2 mb-2"><Hnavigation /></header>
                <main className="flex-1 overflow-y-auto p-2 pb-5 relative">
                    <div className="bg-[#ffffff] p-6 rounded-2xl shadow-lg shadow-black/5 h-full flex flex-col">
                        {/* Header Section */}
                        
                        {/* Chat Input Section */}
                        <ChatBox />
                    </div>
                </main>
            </div>
        </div>
    );
}