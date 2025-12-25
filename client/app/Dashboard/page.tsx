import Hnavigation from "./DNavigation";
import VNagivation from "./VNavigation";


export default function DashboardPage() {
    return (
        <>
            <div className="flex h-screen overflow-hidden p-2">
                <aside className="flex shrink-0">
                    <VNagivation  />
                </aside>
                <div className="flex flex-col flex-1">
                    <header className="ml-2  mr-2 mb-2">
                        <Hnavigation />
                    </header>
                    <main className="flex-1 overflow-y-auto p-10">
                        <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
                        <p>Welcome to your dashboard! Here you can manage your account and view analytics.</p>
                    </main>
                </div>
            </div>
        </>
    );
}