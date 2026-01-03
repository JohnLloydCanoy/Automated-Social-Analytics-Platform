import Introduction from "./introduction";
import ChatBox from "./AIComponents/chatbox";

export default function Assistant() {
    return (
        <>
            <main>
                <div className="">
                    <Introduction />
                    <ChatBox />
                </div>
            </main>
        </>
    );
}