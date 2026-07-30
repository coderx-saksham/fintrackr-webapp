import { useState } from "react";
import { Newspaper, RefreshCw, Loader2 } from "lucide-react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";

const WeeklyDigestCard = () => {
  const [digest, setDigest] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fetchDigest = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.AI_WEEKLY_DIGEST);
      setDigest(response.data.digest || "");
      setLoaded(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load weekly digest");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-6 border-l-4 border-l-purple-600">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-purple-700" />
          <h3 className="text-lg font-semibold text-gray-800">AI Weekly Money Digest</h3>
          <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
            Groq
          </span>
        </div>
        <button onClick={fetchDigest} disabled={loading} className="card-btn">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          {loaded ? "Refresh" : "Generate"}
        </button>
      </div>
      {!loaded && !loading && (
        <p className="text-sm text-gray-500">
          Get a newsletter-style weekly summary of wins, watch-outs, and one action for next week.
        </p>
      )}
      {loading && (
        <p className="text-sm text-gray-500 py-4 flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Writing your digest…
        </p>
      )}
      {digest && !loading && (
        <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{digest}</div>
      )}
    </div>
  );
};

export default WeeklyDigestCard;
