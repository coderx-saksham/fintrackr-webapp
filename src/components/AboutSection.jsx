const AboutSection = () => {
    return (
        <section id="about" className="py-20 md:py-28 bg-gray-50 scroll-mt-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                    About Us
                </h2>
                <p className="mt-4 text-center text-gray-500 max-w-2xl mx-auto">
                    FinTrackr helps you understand where your money goes and build better financial habits.
                </p>

                <div className="mt-12 space-y-6 text-gray-600 leading-relaxed">
                    <p>
                        FinTrackr is a personal finance companion built for students and young professionals
                        who want a clear picture of income, expenses, budgets, and savings goals — without
                        complicated spreadsheets.
                    </p>
                    <p>
                        Track everyday spending, set category budgets, monitor bills, and get AI-powered
                        insights that highlight patterns you might miss. Our goal is simple: make money
                        management feel approachable, transparent, and useful every week.
                    </p>
                    <p>
                        Whether you are just starting out or refining an existing budget, FinTrackr gives
                        you one place to organize your finances and stay on track toward your goals.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div>
                        <p className="text-2xl font-bold text-purple-700">Track</p>
                        <p className="text-sm text-gray-500 mt-1">Income &amp; expenses in one dashboard</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-purple-700">Plan</p>
                        <p className="text-sm text-gray-500 mt-1">Budgets, bills &amp; savings goals</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-purple-700">Improve</p>
                        <p className="text-sm text-gray-500 mt-1">AI insights to spend smarter</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
