import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import InfoCard from "../components/InfoCard.jsx";
import {Coins, Wallet, WalletCards} from "lucide-react";
import {addThousandsSeparator} from "../util/util.js";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx";
import Transactions from "../components/Transactions.jsx";
import AiInsightsCard from "../components/AiInsightsCard.jsx";
import AiMonthlySummaryCard from "../components/AiMonthlySummaryCard.jsx";
import HealthScoreCard from "../components/HealthScoreCard.jsx";
import WeeklyDigestCard from "../components/WeeklyDigestCard.jsx";
import { seedDummyData, loadList, STORE_KEYS, isDemoUser } from "../util/dummyData.js";
import { AppContext } from "../context/AppContext.jsx";

const Home = () => {
    useUser();
    const { user } = useContext(AppContext);

    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quickStats, setQuickStats] = useState({ goals: 0, billsDue: 0, overBudget: 0, budgetCount: 0 });

    const refreshQuickStats = () => {
        const goals = loadList(STORE_KEYS.goals);
        const bills = loadList(STORE_KEYS.bills);
        const budgets = loadList(STORE_KEYS.budgets);
        setQuickStats({
            goals: goals.length,
            billsDue: bills.filter((b) => !b.paid).length,
            overBudget: budgets.filter((b) => b.spent > b.limit).length,
            budgetCount: budgets.length,
        });
    };

    const fetchDashboardData = async () => {
        if (loading) return;
        if (!localStorage.getItem("token")) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
            if (response.status === 200) {
                setDashboardData(response.data);
            }
        }catch (error) {
            // Auth failures are handled by axios interceptor / useUser — avoid noisy toast on boot
            if (error.response?.status === 401) return;
            console.error('Something went wrong while fetching dashboard data:', error);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isDemoUser(user?.email)) {
            seedDummyData();
        }
        refreshQuickStats();
        fetchDashboardData();
        return () => {};
    }, [user?.email]);

    return (
        <div>
            <Dashboard activeMenu="Dashboard">
                <div className="my-5 mx-auto">
                    <HealthScoreCard dashboardData={dashboardData} />
                    <WeeklyDigestCard />
                    <AiInsightsCard />
                    <AiMonthlySummaryCard />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        <button onClick={() => navigate("/budgets")} className="card text-left py-4 hover:border-purple-200">
                            <p className="text-xs text-gray-500">Budgets</p>
                            <p className="text-lg font-semibold text-gray-800 mt-1">
                                {quickStats.overBudget > 0
                                    ? `${quickStats.overBudget} over`
                                    : quickStats.budgetCount === 0
                                        ? "None yet"
                                        : "On track"}
                            </p>
                        </button>
                        <button onClick={() => navigate("/goals")} className="card text-left py-4 hover:border-purple-200">
                            <p className="text-xs text-gray-500">Savings Goals</p>
                            <p className="text-lg font-semibold text-gray-800 mt-1">{quickStats.goals} active</p>
                        </button>
                        <button onClick={() => navigate("/bills")} className="card text-left py-4 hover:border-purple-200">
                            <p className="text-xs text-gray-500">Bills Due</p>
                            <p className="text-lg font-semibold text-gray-800 mt-1">{quickStats.billsDue} pending</p>
                        </button>
                        <button onClick={() => navigate("/ai-lab")} className="card text-left py-4 hover:border-purple-200 bg-purple-50">
                            <p className="text-xs text-purple-600">AI Lab</p>
                            <p className="text-lg font-semibold text-purple-800 mt-1">Plan · Cut · What-If</p>
                        </button>
                    </div>

                    {isDemoUser(user?.email) && (
                        <div className="mb-4 flex justify-end">
                            <button
                                onClick={() => {
                                    seedDummyData(true);
                                    refreshQuickStats();
                                    toast.success("Demo data restored");
                                }}
                                className="text-xs text-gray-400 hover:text-purple-700"
                            >
                                Reset demo data
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InfoCard
                            icon={<WalletCards />}
                            label="Total Balance"
                            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                            color="bg-purple-800"
                        />
                        <InfoCard
                            icon={<Wallet />}
                            label="Total Income"
                            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                            color="bg-green-800"
                        />
                        <InfoCard
                            icon={<Coins />}
                            label="Total Expense"
                            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                            color="bg-red-800"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <RecentTransactions
                            transactions={dashboardData?.recentTransactions}
                            onMore={() => navigate("/expense")}
                        />

                        <FinanceOverview
                            totalBalance={dashboardData?.totalBalance || 0}
                            totalIncome={dashboardData?.totalIncome || 0}
                            totalExpense={dashboardData?.totalExpense || 0}
                        />

                        <Transactions
                            transactions={dashboardData?.recent5Expenses || []}
                            onMore={() => navigate("/expense")}
                            type="expense"
                            title="Recent Expenses"
                        />

                        <Transactions
                            transactions={dashboardData?.recent5Incomes || []}
                            onMore={() => navigate("/income")}
                            type="income"
                            title="Recent Incomes"
                        />
                    </div>
                </div>
            </Dashboard>
        </div>
    )
}

export default Home;
