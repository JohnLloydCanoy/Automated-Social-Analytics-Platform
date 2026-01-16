import { useEffect, useRef, useState } from 'react';
import { DetailDDialogsProps } from '../types';

// Figuring out dialog positioning logic

export default function DetailDDialogs({ isOpen, onClose, position }: DetailDDialogsProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [alignment, setAlignment] = useState({ x: 'left', y: 'top' });

    useEffect(() => {
        if (isOpen && position) {

            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            
            const boxW = 300; 
            const boxH = 250; 

            let finalX = position.x;
            let alignX = 'left';

            if (position.x + boxW > screenW) {
                finalX = position.x - boxW; 
                alignX = 'right';
            }

            let finalY = position.y;
            

            if (position.y + boxH > screenH) {
                finalY = position.y - boxH; 
            }

            setCoords({ x: finalX, y: finalY });
        }
    }, [isOpen, position]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 overflow-hidden" 
            onClick={onClose}
        >
            <div 
                ref={dialogRef}
                className="absolute bg-white shadow-xl border border-gray-200 rounded-lg p-4 w-[300px] animate-in fade-in zoom-in-95 duration-100"
                style={{
                    top: coords.y,
                    left: coords.x,
                }}
                onClick={(e) => e.stopPropagation()} 
            >

                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-gray-800">Add Content</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                
                <p className="text-sm text-gray-500 mb-4">
                    Schedule a post for this slot?
                </p>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
                        Cancel
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}