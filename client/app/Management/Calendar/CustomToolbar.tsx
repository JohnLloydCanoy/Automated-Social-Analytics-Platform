import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ToolbarProps } from "react-big-calendar";

export default function CustomToolbar(props: ToolbarProps) {
    const { label, onNavigate, onView, view } = props;

    return (
        <div className="flex justify-between items-center mb-6">
            {/* Left: Navigation */}
            <div className="flex gap-2">
                <button 
                    onClick={() => onNavigate('PREV')} 
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600"
                >
                    <FaChevronLeft />
                </button>
                <button 
                    onClick={() => onNavigate('NEXT')} 
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600"
                >
                    <FaChevronRight />
                </button>
                <button 
                    onClick={() => onNavigate('TODAY')} 
                    className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-bold text-gray-700"
                >
                    Today
                </button>
            </div>

            {/* Center: Month Name */}
            <span className="text-xl font-black text-gray-800">{label}</span>

            {/* Right: View Switcher */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
                {['month', 'week', 'day'].map((v) => (
                    <button
                        key={v}
                        onClick={() => onView(v as any)}
                        className={`
                            px-4 py-1.5 rounded-lg text-sm font-bold capitalize transition-all
                            ${view === v ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}
                        `}
                    >
                        {v}
                    </button>
                ))}
            </div>
        </div>
    );
}