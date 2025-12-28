import Hnavigation from "../Navigation/HNavigation";
import VNagivation from "../Navigation/VNavigation";
import Introduction from "../AI/introduction";

export default function AIPage() {
    return (
        <div className="flex h-screen overflow-hidden p-2 bg-gray-50">
            <aside className="flex shrink-0"><VNagivation /></aside>

            <div className="flex flex-col flex-1 h-screen">
                <header className="ml-2 mr-2 mb-2"><Hnavigation /></header>
                <main className="flex-1 overflow-y-auto p-2 pb-5 relative">
                    <div className="bg-[#ffffff] p-6 rounded-2xl shadow-lg shadow-black/5 h-full">
                        <h1 className="text-gray-500 font-medium">Hello, Good Day!</h1>
                        <h1 className="text-3xl font-bold mb-2 text-gray-800">AI Management</h1>
                        <p className="text-gray-400">Leverage AI to enhance your social media strategies.</p>
                        <h1 className="font-black text-xl text-gray-800">AI Tools & Features</h1>
                        <p className="text-gray-500 text-sm mt-1">Explore the AI-powered tools to optimize your social media presence.</p>
                        {/* 
                        AI management content goes here
                        This where the Simple chat box will go.
                        */}
                        <div className="items-center justify-center mt-6">
                            <Introduction />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}