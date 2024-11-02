import { create } from "zustand";
import axiosInstance from "../components/helpers/axiosInstance";
import axios from "axios";
import { toast } from "react-toastify";

const store = create((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  role: null, // "admin" or "customer"
  setRole: (value) => set({ role: value }),
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  //   Login
  login: async function (email, password) {
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      const { userId, name, userEmail, role, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ id: userId, name, email: userEmail, role })
      );

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      set({
        user: { id: userId, name: name, email: userEmail, role: role },
        token,
      });
      set({ isAuthenticated: true, role: role });

      toast.success(response.data.message);
      return true;
    } catch (error) {
      console.error("Login Error: ", error);
      const message = error.response?.data?.message || "Server Error";
      toast.error(message);
      return false;
    }
  },

  //   Register
  register: async function (name, email, password) {
    try {
      const response = await axiosInstance.post("/api/auth/register", {
        name,
        email,
        password,
      });
      toast.success(response.data.message);
      return true;
    } catch (error) {
      console.error("Registration Error: ", error);
      const message = error.response?.data?.message || "Server Error";
      toast.error(message);
      return false;
    }
  },

  //  Admin Register
  adminRegister: async function (name, email, password, secretKey) {
    try {
      const response = await axiosInstance.post("/api/auth/register-admin", {
        name,
        email,
        password,
        secretKey,
      });
      toast.success(response.data.message);
      return true;
    } catch (error) {
      console.error("Registration Error: ", error);
      const message = error.response?.data?.message || "Server Error";
      toast.error(message);
      return false;
    }
  },

  logout: () => {
    set({ isAuthenticated: false, role: null });
    set({ user: null, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  },
}));

export default store;
