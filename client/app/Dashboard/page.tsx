import Hnavigation from "./DNavigation";
import VNagivation from "./VNavigation";


export default function DashboardPage() {
    return (
        <>
            <div className="flex h-screen overflow-hidden ">
                <aside className=" flex-shrink-0">
                    <VNagivation  />
                    <Hnavigation />
                </aside>
                
                
                <div className="p-10 ">
                    <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
                    <p>Welcome to your dashboard! Here you can manage your account and view analytics.</p>
                </div>
            </div>
        </>
    );
}