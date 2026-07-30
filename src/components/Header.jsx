import {useState} from "react";
import {assets} from "../assets/assets.js";
import {Link} from "react-router-dom";
import {Menu, X} from "lucide-react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [logoBroken, setLogoBroken] = useState(false);

    const navLinks = [
        { name: 'Home', to: '/home' },
        { name: 'About us', to: '/about' },
        { name: 'Contact us', to: '/contact' }
    ];

    return (
        <header className="border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-2">
                        {!logoBroken ? (
                            <img
                                src={assets.logo}
                                alt="logo"
                                className="h-10 w-10 object-contain"
                                onError={() => setLogoBroken(true)}
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-sm">
                                MM
                            </div>
                        )}
                        <span className="text-lg font-bold text-black truncate">Money Manager</span>
                    </div>

                    <nav className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link to={link.to} key={link.name} className="text-gray-600 hover:text-purple-600 transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex items-center space-x-4">
                            <Link to="/login" className="text-gray-600 hover:text-purple-600 transition-colors">
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200">
                    <div className="container mx-auto px-4 py-4">
                        <nav className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link key={link.name} to={link.to} className="text-gray-600 hover:text-purple-600 transition-colors">
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                                <Link to="/login" className="text-gray-600 hover:text-purple-600 transition-colors w-full text-left">
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-center"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
