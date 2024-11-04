import axios from "axios";

// Function to check if the token is expired
const isTokenExpired = (token) => {
    if (!token) return true; // No token means expired or invalid

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        const expiry = payload.exp * 1000; // Convert expiration time to milliseconds
        return Date.now() > expiry; // True if expired
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; // Treat as expired if decoding fails
    }
};

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log("config url: ", config.url);
        // Skip expiration check for login route
        if (config.url == "/api/auth/login") {
            console.log("Skipping token expiration check for login route.");
            return config;
        }
        if (config.url == "/api/auth/register" || config.url == "/api/auth/register-admin") {
            console.log("Skipping token expiration check for register route.");
            return config;
        }

        // Check if the token is expired
        if (isTokenExpired(token)) {
            // Clear token and redirect to login if expired
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login"; // Redirect to login
            console.log("Token expired. Redirecting to login.");
            return Promise.reject(new Error("Token expired")); // Prevent request from going through
        }

        // If token is valid, add it to the Authorization header
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 400 && error.response.data?.message === "Invalid token") {
                console.error("Invalid token detected. Logging out.");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            } else if (status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
