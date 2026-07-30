import { useEffect, useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";

const AiInsightsCard = () => {
    const [insights, setInsights] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchInsights = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.AI_INSIGHTS);
            setInsights(response.data.insights || "");
        } catch (error) {
            console.error("Failed to fetch AI insights:", error);
            toast.error("Failed to load AI insights");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInsights();
    }, []);

    const lines = insights
        ? insights.split("\n").filter((line) => line.trim())
        : [];

    return (
        <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="text-purple-700 w-5 h-5" />
                    <h3 className="text-lg font-semibold text-gray-800">
                        AI Financial Insights
                    </h3>
                    <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                        Powered by Groq
                    </span>
                </div>
                <button
                    onClick={fetchInsights}
                    disabled={loading}
                    className="card-btn"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                </button>
            </div>

            {loading && !insights ? (
                <p className="text-sm text-gray-500 animate-pulse">
                    Analyzing your finances...
                </p>
            ) : (
                <div className="text-sm text-gray-700 space-y-2">
                    {lines.length > 0 ? (
                        lines.map((line, index) => (
                            <p key={index} className="leading-relaxed">
                                {line.replace(/^[-•*]\s*/, "")}
                            </p>
                        ))
                    ) : (
                        <p className="text-gray-500">
                            No insights available yet. Add some transactions to get started.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AiInsightsCard;
