import { useState } from "react";
import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import { Sparkles, Scissors, FlaskConical, Target, Loader2 } from "lucide-react";

const AiLab = () => {
  useUser();
  const [tab, setTab] = useState("plan");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const [planForm, setPlanForm] = useState({
    goalName: "Emergency Fund",
    targetAmount: 50000,
    months: 3,
  });
  const [scenario, setScenario] = useState("If I cut Food by 20% and Shopping by 15%");

  const runPlan = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await axiosConfig.post(API_ENDPOINTS.AI_SAVINGS_PLAN, {
        goalName: planForm.goalName,
        targetAmount: Number(planForm.targetAmount),
        months: Number(planForm.months),
      });
      setResult(res.data.plan || "");
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate savings plan");
    } finally {
      setLoading(false);
    }
  };

  const runCut = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.AI_CUT_COACH);
      setResult(res.data.advice || "");
    } catch (e) {
      console.error(e);
      toast.error("Failed to get cut advice");
    } finally {
      setLoading(false);
    }
  };

  const runWhatIf = async () => {
    if (!scenario.trim()) {
      toast.error("Enter a scenario");
      return;
    }
    setLoading(true);
    setResult("");
    try {
      const res = await axiosConfig.post(API_ENDPOINTS.AI_WHAT_IF, { scenario });
      setResult(res.data.analysis || "");
    } catch (e) {
      console.error(e);
      toast.error("What-if simulation failed");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "plan", label: "AI Savings Plan", icon: Target },
    { id: "cut", label: "AI Cut Coach", icon: Scissors },
    { id: "whatif", label: "What-If Simulator", icon: FlaskConical },
  ];

  return (
    <Dashboard activeMenu="AI Lab">
      <div className="my-5 mx-auto max-w-4xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-700" /> AI Finance Lab
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Powered by Groq · Plans, cuts & scenario simulations from your real data
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setResult("");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${
                tab === t.id
                  ? "bg-purple-800 text-white border-purple-800"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="card mb-6">
          {tab === "plan" && (
            <div>
              <h3 className="font-medium mb-3">Build a savings plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <input
                  className="input-box mt-0 mb-0"
                  value={planForm.goalName}
                  onChange={(e) => setPlanForm({ ...planForm, goalName: e.target.value })}
                  placeholder="Goal name"
                />
                <input
                  className="input-box mt-0 mb-0"
                  type="number"
                  value={planForm.targetAmount}
                  onChange={(e) => setPlanForm({ ...planForm, targetAmount: e.target.value })}
                  placeholder="Target ₹"
                />
                <input
                  className="input-box mt-0 mb-0"
                  type="number"
                  value={planForm.months}
                  onChange={(e) => setPlanForm({ ...planForm, months: e.target.value })}
                  placeholder="Months"
                />
              </div>
              <button onClick={runPlan} disabled={loading} className="add-btn add-btn-fill">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate Plan
              </button>
            </div>
          )}

          {tab === "cut" && (
            <div>
              <h3 className="font-medium mb-2">Where should I cut this month?</h3>
              <p className="text-sm text-gray-500 mb-4">
                Groq analyzes your category spending and ranks cut opportunities with ₹ impact.
              </p>
              <button onClick={runCut} disabled={loading} className="add-btn add-btn-fill">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Scissors className="w-4 h-4" />}
                Get Cut Advice
              </button>
            </div>
          )}

          {tab === "whatif" && (
            <div>
              <h3 className="font-medium mb-3">Simulate a scenario</h3>
              <textarea
                className="input-box mt-0 mb-3 min-h-[80px]"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                placeholder="e.g. Cut food 20% and stop Netflix"
              />
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Cut Food by 20%",
                  "Skip dining out for 1 month",
                  "Increase SIP by ₹5000",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setScenario(s)}
                    className="text-xs px-2 py-1 rounded border border-purple-100 bg-purple-50 text-purple-700"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button onClick={runWhatIf} disabled={loading} className="add-btn add-btn-fill">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FlaskConical className="w-4 h-4" />}
                Run Simulation
              </button>
            </div>
          )}
        </div>

        {(loading || result) && (
          <div className="card">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" /> AI Result
            </h3>
            {loading ? (
              <div className="flex items-center gap-2 text-gray-500 py-8 justify-center">
                <Loader2 className="w-5 h-5 animate-spin" /> Thinking with Groq…
              </div>
            ) : (
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{result}</div>
            )}
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default AiLab;
