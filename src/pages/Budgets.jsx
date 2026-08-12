import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { loadList, saveList, seedDummyData, STORE_KEYS, isDemoUser } from "../util/dummyData.js";
import { addThousandsSeparator } from "../util/util.js";
import toast from "react-hot-toast";
import { Plus, AlertTriangle } from "lucide-react";

const Budgets = () => {
  useUser();
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({ category: "", limit: "", spent: "", icon: "💰" });

  useEffect(() => {
    if (isDemoUser()) {
      seedDummyData();
    }
    setBudgets(loadList(STORE_KEYS.budgets));
  }, []);

  const persist = (next) => {
    setBudgets(next);
    saveList(STORE_KEYS.budgets, next);
  };

  const addBudget = () => {
    if (!form.category || !form.limit) {
      toast.error("Category and limit required");
      return;
    }
    const next = [
      ...budgets,
      {
        id: "b" + Date.now(),
        category: form.category,
        limit: Number(form.limit),
        spent: Number(form.spent || 0),
        icon: form.icon || "💰",
      },
    ];
    persist(next);
    setForm({ category: "", limit: "", spent: "", icon: "💰" });
    toast.success("Budget added");
  };

  const remove = (id) => {
    persist(budgets.filter((b) => b.id !== id));
    toast.success("Removed");
  };

  const overCount = budgets.filter((b) => b.spent > b.limit).length;

  return (
    <Dashboard activeMenu="Budgets">
      <div className="my-5 mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Category Budget Limits</h2>
            <p className="text-sm text-gray-500 mt-1">
              Set monthly caps and track overspend in real time
            </p>
          </div>
          {overCount > 0 && (
            <span className="flex items-center gap-1.5 text-sm text-red-700 bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
              {overCount} over budget
            </span>
          )}
        </div>

        <div className="card mb-6">
          <h3 className="font-medium text-gray-800 mb-3">Add budget</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              className="input-box mt-0 mb-0"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <input
              className="input-box mt-0 mb-0"
              type="number"
              placeholder="Limit ₹"
              value={form.limit}
              onChange={(e) => setForm({ ...form, limit: e.target.value })}
            />
            <input
              className="input-box mt-0 mb-0"
              type="number"
              placeholder="Spent ₹"
              value={form.spent}
              onChange={(e) => setForm({ ...form, spent: e.target.value })}
            />
            <button onClick={addBudget} className="add-btn add-btn-fill justify-center">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {budgets.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-8 border border-dashed border-gray-200 rounded-xl">
              No budgets yet. Add your first category limit above.
            </p>
          )}
          {budgets.map((b) => {
            const pct = Math.min(100, Math.round((b.spent / b.limit) * 100));
            const over = b.spent > b.limit;
            return (
              <div key={b.id} className="card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {b.icon} {b.category}
                    </h4>
                    <p className="text-sm text-gray-500 mt-0.5">
                      ₹{addThousandsSeparator(b.spent)} / ₹{addThousandsSeparator(b.limit)}
                      {over && (
                        <span className="text-red-600 ml-2 font-medium">
                          Over by ₹{addThousandsSeparator(b.spent - b.limit)}
                        </span>
                      )}
                    </p>
                  </div>
                  <button onClick={() => remove(b.id)} className="text-xs text-red-500 hover:underline">
                    Remove
                  </button>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${over ? "bg-red-500" : pct > 80 ? "bg-amber-500" : "bg-green-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 text-right">{pct}% used</p>
              </div>
            );
          })}
        </div>
      </div>
    </Dashboard>
  );
};

export default Budgets;
