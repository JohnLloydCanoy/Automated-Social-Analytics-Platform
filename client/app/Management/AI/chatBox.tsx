import Introduction from "../AI/introduction";

export default function ChatBox() {
    return (
        <>
            <main>
                <div>
                    <Introduction />
                    <h1 className="font-black text-xl text-gray-800">Chat Box</h1>
                    <div className="border p-4 mt-4">
                        <p className="text-gray-600">This is where the chat interface will be implemented.</p>
                    </div>
                </div>
                
            </main>
        </>
    );
}