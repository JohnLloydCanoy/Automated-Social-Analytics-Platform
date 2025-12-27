import Hnavigation from "../Navigation/HNavigation";
import VNagivation from "../Navigation/VNavigation";

export default function SettingsPage() {
    return (
        <div className="flex h-screen overflow-hidden p-2 bg-gray-50">
            <aside className="flex shrink-0"><VNagivation /></aside>
            <div className="flex flex-col flex-1 h-screen">
                <header className="ml-2 mr-2 mb-2"><Hnavigation /></header>
                <main className="flex-1 overflow-y-auto p-2 pb-20 relative">
                    <div className="bg-white p-6 rounded-2xl shadow-lg shadow-black/5 mb-4">
                        <h1 className="text-gray-500 font-medium">Hello, Good Day!</h1>
                        <h1 className="text-3xl font-bold mb-2 text-gray-800">Settings</h1>
                        <p className="text-gray-400">Customize your account settings and preferences.</p>
                    </div>
                </main>
            </div>
        </div>
    );
}