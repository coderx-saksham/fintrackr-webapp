import { Activity } from "lucide-react";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export function computeHealthScore(dashboardData) {
  const income = Number(dashboardData?.totalIncome || 0);
  const expense = Number(dashboardData?.totalExpense || 0);
  const balance = Number(dashboardData?.totalBalance || 0);

  // Demo-friendly fallbacks when little real data exists
  const i = income > 0 ? income : 55000;
  const e = expense > 0 ? expense : 32000;
  const b = balance !== 0 ? balance : i - e;

  const savingsRate = i > 0 ? ((i - e) / i) * 100 : 0;
  const expenseRatio = i > 0 ? (e / i) * 100 : 100;
  const balanceBuffer = i > 0 ? (b / i) * 100 : 0;

  const savingsScore = clamp((savingsRate / 30) * 40, 0, 40);
  const expenseScore = clamp(((100 - expenseRatio) / 100) * 35, 0, 35);
  const bufferScore = clamp((balanceBuffer / 50) * 25, 0, 25);

  const score = Math.round(savingsScore + expenseScore + bufferScore);

  let label = "Needs Attention";
  let color = "text-red-600";
  let bar = "bg-red-500";
  if (score >= 75) {
    label = "Excellent";
    color = "text-green-600";
    bar = "bg-green-500";
  } else if (score >= 55) {
    label = "Healthy";
    color = "text-emerald-600";
    bar = "bg-emerald-500";
  } else if (score >= 40) {
    label = "Fair";
    color = "text-amber-600";
    bar = "bg-amber-500";
  }

  return {
    score,
    label,
    color,
    bar,
    breakdown: [
      { name: "Savings Rate", value: `${savingsRate.toFixed(0)}%`, points: Math.round(savingsScore), max: 40 },
      { name: "Expense Control", value: `${expenseRatio.toFixed(0)}% of income`, points: Math.round(expenseScore), max: 35 },
      { name: "Balance Buffer", value: `${balanceBuffer.toFixed(0)}% of income`, points: Math.round(bufferScore), max: 25 },
    ],
  };
}

const HealthScoreCard = ({ dashboardData }) => {
  const h = computeHealthScore(dashboardData);

  return (
    <div className="card mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-700" />
          <h3 className="text-lg font-semibold text-gray-800">Financial Health Score</h3>
        </div>
        <div className="text-right">
          <p className={`text-3xl font-bold ${h.color}`}>{h.score}/100</p>
          <p className={`text-sm font-medium ${h.color}`}>{h.label}</p>
        </div>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
        <div className={`h-full ${h.bar} rounded-full`} style={{ width: `${h.score}%` }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {h.breakdown.map((item) => (
          <div key={item.name} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-xs text-gray-500">{item.name}</p>
            <p className="text-sm font-medium text-gray-800 mt-0.5">{item.value}</p>
            <p className="text-xs text-purple-600 mt-1">
              {item.points}/{item.max} pts
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthScoreCard;
