import { useState } from "react";
import { Sparkles } from "lucide-react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";

const CategorySuggestButton = ({ description, type, onSuggested }) => {
    const [loading, setLoading] = useState(false);

    const handleSuggest = async () => {
        if (!description?.trim()) {
            toast.error("Enter a description first (e.g. Electricity bill)");
            return;
        }

        setLoading(true);
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.AI_SUGGEST_CATEGORY, {
                description: description.trim(),
                type,
            });
            onSuggested(response.data);
            toast.success(response.data.reason || "Category suggested!");
        } catch (error) {
            console.error("Category suggestion failed:", error);
            const msg =
                error?.response?.data?.message ||
                "Failed to suggest category. Create categories first, then try again.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleSuggest}
            disabled={loading}
            className="text-sm flex items-center gap-1.5 text-purple-700 hover:text-purple-900 mb-3"
        >
            <Sparkles className="w-4 h-4" />
            {loading ? "Suggesting..." : "Suggest Category with AI"}
        </button>
    );
};

export default CategorySuggestButton;
