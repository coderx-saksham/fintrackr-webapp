import logo from "./logo.png";
import login_bg from "./login-bg.png";
import landing from "./landing.png";
import {
    Bot,
    Coins,
    FunnelPlus,
    LayoutDashboard,
    List,
    Wallet,
    Target,
    Bell,
    PiggyBank,
    Sparkles,
} from "lucide-react";

export const assets = {
    logo,
    login_bg,
    landing,
}

export const SIDE_BAR_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "Category",
        icon: List,
        path: "/category",
    },
    {
        id: "03",
        label: "Income",
        icon: Wallet,
        path: "/income",
    },
    {
        id: "04",
        label: "Expense",
        icon: Coins,
        path: "/expense",
    },
    {
        id: "05",
        label: "Budgets",
        icon: PiggyBank,
        path: "/budgets",
    },
    {
        id: "06",
        label: "Savings Goals",
        icon: Target,
        path: "/goals",
    },
    {
        id: "07",
        label: "Bills",
        icon: Bell,
        path: "/bills",
    },
    {
        id: "08",
        label: "Filters",
        icon: FunnelPlus,
        path: "/filter",
    },
    {
        id: "09",
        label: "AI Assistant",
        icon: Bot,
        path: "/assistant",
    },
    {
        id: "10",
        label: "AI Lab",
        icon: Sparkles,
        path: "/ai-lab",
    },
];
