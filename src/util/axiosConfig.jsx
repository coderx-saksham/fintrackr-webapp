import axios from "axios";
import {BASE_URL} from "./apiEndpoints.js";

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

//list of endpoints that do not required authorization header
const excludeEndpoints = ["/login", "/register", "/status", "/activate", "/health"];

//request interceptor
axiosConfig.interceptors.request.use((config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) => {
        return config.url?.includes(endpoint)
    });

    if (!shouldSkipToken) {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//response interceptor
axiosConfig.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if(error.response) {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            // Send users to the landing page (choose login/register), not a forced login toast loop
            if (!window.location.pathname.startsWith("/login") &&
                !window.location.pathname.startsWith("/signup") &&
                !window.location.pathname.startsWith("/home") &&
                window.location.pathname !== "/") {
                window.location.href = "/home";
            }
        } else if (error.response.status === 500) {
            console.error("Server error. Please try again later");
        }
    } else if(error.code === "ECONNABORTED") {
        console.error("Request timeout. Please try again.");
    }
    return Promise.reject(error);
})

export default axiosConfig;
