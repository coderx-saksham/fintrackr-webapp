import { useState } from "react";
import { FileText, RefreshCw } from "lucide-react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";

const AiMonthlySummaryCard = () => {
    const [summary, setSummary] = useState("");
    const [month, setMonth] = useState("");
    const [loading, setLoading] = useState(false);

    const generateReport = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.AI_MONTHLY_SUMMARY);
            setSummary(response.data.summary || "");
            setMonth(response.data.month || "");
            toast.success("Monthly report generated!");
        } catch (error) {
            console.error("Failed to generate monthly summary:", error);
            toast.error("Failed to generate monthly report");
        } finally {
            setLoading(false);
        }
    };

    const sections = summary
        ? summary.split(/##\s*/).filter((s) => s.trim())
        : [];

    return (
        <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FileText className="text-purple-700 w-5 h-5" />
                    <h3 className="text-lg font-semibold text-gray-800">
                        AI Monthly Report
                    </h3>
                    <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                        Powered by Groq
                    </span>
                </div>
                <button
                    onClick={generateReport}
                    disabled={loading}
                    className="card-btn"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    {summary ? "Regenerate" : "Generate Report"}
                </button>
            </div>

            {loading && (
                <p className="text-sm text-gray-500 animate-pulse">
                    Generating your monthly financial report...
                </p>
            )}

            {!loading && !summary && (
                <p className="text-sm text-gray-500">
                    Click &quot;Generate Report&quot; to get a readable summary of this month&apos;s finances.
                </p>
            )}

            {!loading && summary && (
                <div className="text-sm text-gray-700 space-y-4">
                    {month && (
                        <p className="text-xs text-gray-500 font-medium">
                            Report for {month}
                        </p>
                    )}
                    {sections.length > 0 ? (
                        sections.map((section, index) => {
                            const lines = section.trim().split("\n");
                            const title = lines[0]?.trim();
                            const body = lines.slice(1).join("\n").trim();
                            return (
                                <div key={index}>
                                    {title && (
                                        <h4 className="font-semibold text-gray-800 mb-1">
                                            {title}
                                        </h4>
                                    )}
                                    {body && (
                                        <p className="leading-relaxed whitespace-pre-line">
                                            {body}
                                        </p>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p className="leading-relaxed whitespace-pre-line">{summary}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AiMonthlySummaryCard;
