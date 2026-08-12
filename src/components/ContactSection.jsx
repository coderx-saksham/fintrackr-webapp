const ContactSection = () => {
    return (
        <section id="contact" className="py-20 md:py-28 scroll-mt-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                    Contact Us
                </h2>
                <p className="mt-4 text-center text-gray-500 max-w-2xl mx-auto">
                    Have a question or feedback? Reach out — we would love to hear from you.
                </p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Email</p>
                        <p className="mt-2 text-gray-800">support@fintrackr.app</p>
                        <p className="text-sm text-gray-500 mt-1">We typically reply within 1–2 business days</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Phone</p>
                        <p className="mt-2 text-gray-800">+91 98765 43210</p>
                        <p className="text-sm text-gray-500 mt-1">Mon–Fri, 10:00 AM – 6:00 PM IST</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Office</p>
                        <p className="mt-2 text-gray-800">Bengaluru, Karnataka</p>
                        <p className="text-sm text-gray-500 mt-1">India</p>
                    </div>
                </div>

                <div className="mt-12 max-w-xl mx-auto bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <p className="text-sm font-medium text-gray-800 mb-4">Send us a message</p>
                    <form
                        className="space-y-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert("Thanks for reaching out! This is a demo contact form.");
                            e.currentTarget.reset();
                        }}
                    >
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Your name"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Your email"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <textarea
                            name="message"
                            required
                            rows={4}
                            placeholder="How can we help?"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        />
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
