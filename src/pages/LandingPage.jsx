import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import ProductShowcase from "../components/ProductShowcase.jsx";
import AboutSection from "../components/AboutSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { clearLegacyDemoKeys } from "../util/dummyData.js";

const LandingPage = () => {
    const location = useLocation();

    useEffect(() => {
        // Never seed demo budgets/goals/bills for anonymous visitors
        clearLegacyDemoKeys();
    }, []);

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace("#", "");
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [location.hash]);

    return (
        <div className="bg-white font-sans text-gray-800">
            <Header />
            <main>
                <HeroSection />
                <ProductShowcase />
                <AboutSection />
                <ContactSection />
            </main>
            <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} FinTrackr. All rights reserved.
            </footer>
        </div>
    );
};

export default LandingPage;
