import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case "facebook": return <FaFacebook className="text-blue-600" />;
        case "twitter": return <FaTwitter className="text-sky-500" />;
        case "instagram": return <FaInstagram className="text-pink-600" />;
        case "linkedin": return <FaLinkedin className="text-blue-700" />;
        default: return null;
    }
};


export default function CustomEvent({ event }: any) {
    return (
        <div className="flex items-center gap-2 p-1 h-full">
            <div className="bg-white rounded-full p-1 shadow-sm">
                {getIcon(event.platform)} 
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold leading-tight truncate">{event.title}</span>
                <span className="text-[10px] opacity-80">{event.time}</span>
            </div>
        </div>
    );
}