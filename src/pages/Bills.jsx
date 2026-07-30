import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { loadList, saveList, seedDummyData, STORE_KEYS } from "../util/dummyData.js";
import { addThousandsSeparator } from "../util/util.js";
import toast from "react-hot-toast";
import { Plus, Bell, CheckCircle2, Circle } from "lucide-react";

const Bills = () => {
  useUser();
  const [bills, setBills] = useState([]);
  const [form, setForm] = useState({ name: "", amount: "", dueDate: "", icon: "📄" });

  useEffect(() => {
    seedDummyData();
    setBills(loadList(STORE_KEYS.bills));
  }, []);

  const persist = (next) => {
    setBills(next);
    saveList(STORE_KEYS.bills, next);
  };

  const addBill = () => {
    if (!form.name || !form.amount || !form.dueDate) {
      toast.error("Fill all fields");
      return;
    }
    persist([
      ...bills,
      {
        id: "bl" + Date.now(),
        name: form.name,
        amount: Number(form.amount),
        dueDate: form.dueDate,
        paid: false,
        icon: form.icon || "📄",
      },
    ]);
    setForm({ name: "", amount: "", dueDate: "", icon: "📄" });
    toast.success("Bill reminder added");
  };

  const togglePaid = (id) => {
    persist(bills.map((b) => (b.id === id ? { ...b, paid: !b.paid } : b)));
  };

  const remove = (id) => persist(bills.filter((b) => b.id !== id));

  const upcoming = bills.filter((b) => !b.paid);
  const dueSoon = upcoming
    .filter((b) => {
      const d = new Date(b.dueDate);
      const now = new Date();
      const diff = (d - now) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const totalDue = upcoming.reduce((s, b) => s + b.amount, 0);

  return (
    <Dashboard activeMenu="Bills">
      <div className="my-5 mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap gap-4 justify-between items-end">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Bell className="w-6 h-6 text-purple-700" /> Upcoming Bills
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              ₹{addThousandsSeparator(totalDue)} pending · {dueSoon.length} due within 7 days
            </p>
          </div>
        </div>

        {dueSoon.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-100">
            <p className="text-sm font-medium text-amber-900 mb-2">⚠️ Due soon</p>
            <div className="flex flex-wrap gap-2">
              {dueSoon.map((b) => (
                <span
                  key={b.id}
                  className="text-xs bg-white border border-amber-200 px-2 py-1 rounded"
                >
                  {b.icon} {b.name} · {b.dueDate} · ₹{b.amount}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="card mb-6">
          <h3 className="font-medium mb-3">Add bill reminder</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              className="input-box mt-0 mb-0"
              placeholder="Bill name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="input-box mt-0 mb-0"
              type="number"
              placeholder="Amount ₹"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            <input
              className="input-box mt-0 mb-0"
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
            <button onClick={addBill} className="add-btn add-btn-fill justify-center">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {bills
            .slice()
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .map((b) => (
              <div
                key={b.id}
                className={`card flex items-center justify-between gap-4 py-4 ${b.paid ? "opacity-60" : ""}`}
              >
                <button onClick={() => togglePaid(b.id)} className="shrink-0">
                  {b.paid ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300" />
                  )}
                </button>
                <div className="flex-1">
                  <p className={`font-medium ${b.paid ? "line-through text-gray-400" : "text-gray-800"}`}>
                    {b.icon} {b.name}
                  </p>
                  <p className="text-sm text-gray-500">Due {b.dueDate}</p>
                </div>
                <p className="font-semibold text-gray-800">₹{addThousandsSeparator(b.amount)}</p>
                <button onClick={() => remove(b.id)} className="text-xs text-red-500">
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </Dashboard>
  );
};

export default Bills;
