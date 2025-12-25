export default function Hnavigation() {
    return (
        <nav className="bg-blue-600 p-4 text-white">
            <ul className="flex space-x-4">
                <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
                <li><a href="/profile" className="hover:underline">Profile</a></li>
                <li><a href="/settings" className="hover:underline">Settings</a></li>
                <li><a href="/logout" className="hover:underline">Logout</a></li>
            </ul>
        </nav>
    );
}