export default function ChatBox() {
    return(
        <>
            <main>
                <div className="w-full max-w-4xl mx-auto">
                            <div className="bg-gray-50 rounded-full shadow-md border border-gray-200 flex items-center px-6 py-4 hover:shadow-lg transition-shadow">
                                <button className="mr-4 text-gray-600 hover:text-gray-800 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                                
                                <input 
                                    type="text" 
                                    placeholder="Ask AI Assistant" 
                                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-base"
                                />
                                
                                <button className="ml-4 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2 px-3 py-1 rounded-full hover:bg-gray-200">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                    <span className="text-sm font-medium">Tools</span>
                                </button>

                                <button className="ml-4 text-gray-600 hover:text-gray-800 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
            </main>
        </>
    );
}