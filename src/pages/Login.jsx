import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import Input from "../components/Input.jsx";
import {validateEmail} from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import {AppContext} from "../context/AppContext.jsx";
import {LoaderCircle} from "lucide-react";
import Header from "../components/Header.jsx";
import { DEMO_USER, seedDummyData } from "../util/dummyData.js";

const Login = () => {
    const [email, setEmail] = useState(DEMO_USER.email);
    const [password, setPassword] = useState(DEMO_USER.password);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {setUser} = useContext(AppContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!validateEmail(email)) {
            setError("Please enter valid email address");
            setIsLoading(false);
            return;
        }

        if (!password.trim()) {
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }

        setError("");

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password,
            });
            const {token, user} = response.data;
            if (token) {
                localStorage.setItem("token", token);
                setUser(user);
                if (email.toLowerCase() === DEMO_USER.email) {
                    seedDummyData(true);
                }
                navigate("/dashboard");
            }
        }catch(error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                console.error('Something went wrong', error);
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-screen w-full flex flex-col">
            <Header />
            <div className="flex-grow w-full relative flex items-center justify-center overflow-hidden">
                <img
                    src={assets.login_bg}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover filter blur-sm"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.classList.add("bg-gradient-to-br", "from-purple-900", "to-indigo-800");
                    }}
                />

                <div className="relative z-10 w-full max-w-md px-6">
                    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8">
                        <h3 className="text-2xl font-semibold text-black text-center mb-2">
                            Welcome Back
                        </h3>
                        <p className="text-sm text-slate-700 text-center mb-2">
                            Please enter your details to login in
                        </p>
                        <p className="text-xs text-center text-purple-700 bg-purple-50 border border-purple-100 rounded-lg px-3 py-2 mb-6">
                            Demo: <b>{DEMO_USER.email}</b> / <b>{DEMO_USER.password}</b>
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                placeholder="name@example.com"
                                type="text"
                            />

                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                placeholder="*********"
                                type="password"
                            />

                            {error && (
                                <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                    {error}
                                </p>
                            )}

                            <button disabled={isLoading} className={`btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed': ''}`} type="submit">
                                {isLoading ? (
                                    <>
                                        <LoaderCircle className="animate-spin w-5 h-5" />
                                        Logging in...
                                    </>
                                ):("LOGIN")}
                            </button>

                            <p className="text-sm text-slate-800 text-center mt-6">
                                Don't have an account?
                                <Link to="/signup" className="font-medium text-primary underline hover:text-primary-dark transition-colors">Signup</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
