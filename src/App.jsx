import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Income from "./pages/Income.jsx";
import Expense from "./pages/Expense.jsx";
import Category from "./pages/Category.jsx";
import Filter from "./pages/Filter.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import {Toaster} from "react-hot-toast";
import LandingPage from "./pages/LandingPage.jsx";
import Assistant from "./pages/Assistant.jsx";
import Budgets from "./pages/Budgets.jsx";
import Goals from "./pages/Goals.jsx";
import Bills from "./pages/Bills.jsx";
import AiLab from "./pages/AiLab.jsx";
import { clearLegacyDemoKeys } from "./util/dummyData.js";

// Clear old global demo seed so new visitors never inherit abcd demo lists
clearLegacyDemoKeys();

const App = () => {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/income" element={<Income />} />
                    <Route path="/expense" element={<Expense />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/filter" element={<Filter />} />
                    <Route path="/assistant" element={<Assistant />} />
                    <Route path="/budgets" element={<Budgets />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/bills" element={<Bills />} />
                    <Route path="/ai-lab" element={<AiLab />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

/** Always land on the marketing homepage so users choose Login or Register */
const Root = () => {
    return <Navigate to="/home" replace />;
}

export default App;
