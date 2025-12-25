export default function GlobalLoader({ message = "Loading..." }: { message?: string }) {
    return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#08193f] bg-opacity-90 backdrop-blur-sm transition-all">
            <div className="text-center animate-fade-in-up">
                {/* 1. The Spinner Animation */}
                <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 border-4 border-blue-200 rounded-full opacity-20"></div>
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    {/* Optional: Put your logo in the middle */}
                    <img src="/ASAP-LOGO.png" className="absolute inset-0 w-8 h-8 m-auto animate-pulse" />
                </div>
                
                {/* 2. The Text */}
                <h3 className="text-white text-lg font-bold tracking-widest">{message}</h3>
            </div>
        </div>
    );
}