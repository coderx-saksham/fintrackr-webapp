import { useState } from "react";
import { Sparkles } from "lucide-react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import VoiceExpenseButton from "./VoiceExpenseButton.jsx";

const NaturalLanguageExpense = ({ onParsed }) => {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleParse = async (overrideText) => {
        const value = (overrideText ?? text).trim();
        if (!value) {
            toast.error("Please enter an expense description");
            return;
        }

        setLoading(true);
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.AI_PARSE_EXPENSE, {
                text: value,
            });
            onParsed(response.data);
            toast.success("Expense parsed! Review and submit.");
        } catch (error) {
            console.error("Failed to parse expense:", error);
            toast.error("Failed to parse expense. Try a clearer description.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Add with AI / Voice
            </label>
            <div className="flex gap-2 flex-wrap">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Try: 500 rupees lunch at McDonald's yesterday"
                    className="input-box flex-1 mb-0 mt-0 min-w-[180px]"
                    onKeyDown={(e) => e.key === "Enter" && handleParse()}
                />
                <VoiceExpenseButton
                    onTranscript={(t) => {
                        setText(t);
                        handleParse(t);
                    }}
                />
                <button
                    type="button"
                    onClick={() => handleParse()}
                    disabled={loading}
                    className="add-btn add-btn-fill whitespace-nowrap"
                >
                    {loading ? "Parsing..." : "Parse with AI"}
                </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
                Tip: click Voice and say “spent 250 on coffee today”
            </p>
        </div>
    );
};

export default NaturalLanguageExpense;
