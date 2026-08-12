import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { loadList, saveList, seedDummyData, STORE_KEYS, isDemoUser } from "../util/dummyData.js";
import { addThousandsSeparator } from "../util/util.js";
import toast from "react-hot-toast";
import { Plus, Target } from "lucide-react";

const Goals = () => {
  useUser();
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ name: "", target: "", saved: "", icon: "🎯", deadline: "" });
  const [contributeId, setContributeId] = useState(null);
  const [contributeAmt, setContributeAmt] = useState("");

  useEffect(() => {
    if (isDemoUser()) {
      seedDummyData();
    }
    setGoals(loadList(STORE_KEYS.goals));
  }, []);

  const persist = (next) => {
    setGoals(next);
    saveList(STORE_KEYS.goals, next);
  };

  const addGoal = () => {
    if (!form.name || !form.target) {
      toast.error("Name and target required");
      return;
    }
    persist([
      ...goals,
      {
        id: "g" + Date.now(),
        name: form.name,
        target: Number(form.target),
        saved: Number(form.saved || 0),
        icon: form.icon || "🎯",
        deadline: form.deadline || "2026-12-31",
      },
    ]);
    setForm({ name: "", target: "", saved: "", icon: "🎯", deadline: "" });
    toast.success("Goal created");
  };

  const contribute = (id) => {
    const amt = Number(contributeAmt);
    if (!amt || amt <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    persist(
      goals.map((g) => (g.id === id ? { ...g, saved: Math.min(g.target, g.saved + amt) } : g))
    );
    setContributeId(null);
    setContributeAmt("");
    toast.success("Contribution added!");
  };

  const remove = (id) => {
    persist(goals.filter((g) => g.id !== id));
  };

  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);

  return (
    <Dashboard activeMenu="Savings Goals">
      <div className="my-5 mx-auto max-w-4xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-700" /> Savings Goals
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Track big goals — ₹{addThousandsSeparator(totalSaved)} of ₹
            {addThousandsSeparator(totalTarget)} overall
          </p>
        </div>

        <div className="card mb-6">
          <h3 className="font-medium mb-3">New goal</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input
              className="input-box mt-0 mb-0"
              placeholder="Goal name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="input-box mt-0 mb-0"
              type="number"
              placeholder="Target ₹"
              value={form.target}
              onChange={(e) => setForm({ ...form, target: e.target.value })}
            />
            <input
              className="input-box mt-0 mb-0"
              type="number"
              placeholder="Saved ₹"
              value={form.saved}
              onChange={(e) => setForm({ ...form, saved: e.target.value })}
            />
            <input
              className="input-box mt-0 mb-0"
              type="date"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            />
            <button onClick={addGoal} className="add-btn add-btn-fill justify-center">
              <Plus className="w-4 h-4" /> Create
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-8 border border-dashed border-gray-200 rounded-xl md:col-span-2">
              No savings goals yet. Create one above to get started.
            </p>
          )}
          {goals.map((g) => {
            const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
            return (
              <div key={g.id} className="card">
                <div className="flex justify-between">
                  <h4 className="text-lg font-medium">
                    {g.icon} {g.name}
                  </h4>
                  <button onClick={() => remove(g.id)} className="text-xs text-red-500">
                    Delete
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  ₹{addThousandsSeparator(g.saved)} / ₹{addThousandsSeparator(g.target)} · Due{" "}
                  {g.deadline}
                </p>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mt-3">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm font-medium text-purple-700">{pct}% complete</span>
                  {contributeId === g.id ? (
                    <div className="flex gap-2">
                      <input
                        className="input-box mt-0 mb-0 w-24 py-1"
                        type="number"
                        placeholder="₹"
                        value={contributeAmt}
                        onChange={(e) => setContributeAmt(e.target.value)}
                      />
                      <button
                        onClick={() => contribute(g.id)}
                        className="text-xs bg-purple-600 text-white px-2 py-1 rounded"
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setContributeId(g.id)}
                      className="card-btn"
                    >
                      Contribute
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Dashboard>
  );
};

export default Goals;
