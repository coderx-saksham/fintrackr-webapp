import { useState } from "react";
import { Bot, Send } from "lucide-react";
import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";

const Assistant = () => {
    useUser();

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Hi! I'm your AI finance assistant. Ask me about your balance, spending habits, or savings tips.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setLoading(true);

        try {
            const history = messages
                .filter((m) => m.role === "user" || m.role === "assistant")
                .map((m) => ({ role: m.role, content: m.content }));

            const response = await axiosConfig.post(API_ENDPOINTS.AI_CHAT, {
                message: userMessage,
                history,
            });

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: response.data.reply },
            ]);
        } catch (error) {
            console.error("Chat failed:", error);
            toast.error("Failed to get AI response");
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, I couldn't process that. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dashboard activeMenu="AI Assistant">
            <div className="my-5 mx-auto max-w-3xl">
                <div className="card flex flex-col h-[calc(100vh-180px)]">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                        <Bot className="w-6 h-6 text-purple-700" />
                        <h2 className="text-lg font-semibold text-gray-800">
                            AI Finance Assistant
                        </h2>
                        <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                            Powered by Groq
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                        msg.role === "user"
                                            ? "bg-purple-700 text-white rounded-br-sm"
                                            : "bg-gray-100 text-gray-800 rounded-bl-sm"
                                    }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 text-gray-500 px-4 py-2.5 rounded-2xl text-sm animate-pulse">
                                    Thinking...
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Ask about your finances..."
                            className="input-box flex-1 mb-0 mt-0"
                            disabled={loading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            className="add-btn add-btn-fill flex items-center gap-1.5"
                        >
                            <Send className="w-4 h-4" />
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default Assistant;
