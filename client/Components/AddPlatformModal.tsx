import { FaTimes } from "react-icons/fa";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    availablePlatforms: any[];
    onAdd: (platform: any) => void;
}

export default function AddPlatformModal({ isOpen, onClose, availablePlatforms, onAdd }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md scale-100 animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-black text-gray-800">Add Platform</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <FaTimes className="text-gray-500" />
                    </button>
                </div>
                
                {/* List of Buttons */}
                <div className="grid grid-cols-4 gap-4">
                    {availablePlatforms.map((account) => {
                        const Icon = account.icon;
                        return (
                            <button 
                                key={account.name}
                                onClick={() => onAdd(account)}
                                className="flex flex-col items-center gap-2 p-2 hover:bg-blue-50 rounded-xl transition-colors group"
                            >
                                <div className={`p-2 rounded-full bg-gray-50 group-hover:bg-white transition-colors`}>
                                    <Icon className={`w-8 h-8 ${account.color}`} />
                                </div>
                                <span className="text-xs font-bold text-gray-600 group-hover:text-blue-600">{account.name}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Empty State (Optional) */}
                {availablePlatforms.length === 0 && (
                    <p className="text-center text-gray-400 text-sm py-4">
                        All platforms added!
                    </p>
                )}
            </div>
        </div>
    );
}