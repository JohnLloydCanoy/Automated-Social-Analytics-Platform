import { FaTimes } from "react-icons/fa";

// Define what data this card needs to work
interface Props {
    data: any;
    onRemove: () => void;
    onToggle: () => void;
}

export default function SocialPlatformCard({ data, onRemove, onToggle }: Props) {
    const Icon = data.icon;
    
    return (
        <li className="relative flex flex-col items-center gap-2 min-w-[80px] flex-shrink-0 group">
            {/* X Button */}
            <button 
                onClick={onRemove}
                className="absolute -top-2 -right-1 bg-gray-200 text-gray-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-500 z-10"
            >
                <FaTimes className="w-3 h-3" />
            </button>

            {/* Icon Bubble */}
            <div className={`p-3 rounded-full bg-gray-50 ${data.color.replace('text-', 'bg-').replace('600', '100').replace('500', '100')} bg-opacity-10`}>
                <Icon className={`w-8 h-8 ${data.color}`} />
            </div>
            
            <span className="font-bold text-gray-700 text-sm">{data.name}</span>
            
            {/* Toggle Button */}
            <button 
                onClick={onToggle}
                className={`text-[10px] px-3 py-1 rounded-full font-bold transition-all border ${
                    data.connected 
                    ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200" 
                    : "bg-white text-gray-500 border-gray-300 hover:border-blue-500 hover:text-blue-500"
                }`}
            >
                {data.connected ? "Connected" : "Connect +"}
            </button>
        </li>
    );
}