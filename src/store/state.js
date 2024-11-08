import { create } from "zustand";
import axiosInstance from "../components/helpers/axiosInstance";
import axios from "axios";
import { toast } from "react-toastify";

const store = create((set) => ({
  isAuthenticated: Boolean(localStorage.getItem("user")),
  role: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role : null, // "admin" or "customer"
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

  // apply for loan (for customer)
  applyForLoan: async function (amount, term) {
    try {
      const response = await axiosInstance.post("/api/loans/apply", {
        amount,
        term,
      })

      toast.success(response.data.message);
      return true;
    }
    catch(error) {
      console.error("Error applying for loan: ", error);
      const message = error.response?.data?.message || "Server Error";
      toast.error(message);
      return false;
    }
  },

  // view all loans (for customer)
  fetchUserLoans: async function() {
    try {
      const response = await axiosInstance.get("/api/loans");
      console.log("Loans: ", response.data);
      toast.success(response.data.message);
      return response.data;
    }
    catch(error) {
      console.error("Error when fetching loans: ", error);
      const message = error.response?.data?.message || "Server Error";
      toast.error(message);
    }
  },
  
  // view all users loans (for customer)
  fetchAllUserLoansByAdmin: async function() {
    try {
      const response = await axiosInstance.get("/api/loans/allDetails");
      toast.success(response.data.message);
      return response.data;
    }
    catch(error) {
      console.error("Error when fetching loans by admin: ", error);
      const message = error.response?.data?.message || "Server Error";
      toast.error(message);
    }
  },

  // Approve loan (for admin)
  approveLoan: async function (loanId) {
    try {
      const response = await axiosInstance.patch(`/api/loans/approve/${loanId}`);
      toast.success(response.data.message);
      return true;
    } catch (error) {
      console.error("Error approving loan: ", error);
      const message = error.response?.data?.message || "Server Error";
      toast.error(message);
      return false;
    }
  },

  // Reject loan (for admin)
  rejectLoan: async function (loanId) {
    try {
      const response = await axiosInstance.patch(`/api/loans/reject/${loanId}`);
      toast.success(response.data.message);
      return true;
    } catch (error) {
      console.error("Error approving loan: ", error);
      const message = error.response?.data?.message || "Server Error";
      toast.error(message);
      return false;
    }
  },

  // get all repayment of loan (for customer)
  getRepayments: async function (loanId) {
    try {
      const response = await axiosInstance.get(`/api/repayments/${loanId}`);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      console.error("Error in fetching repayments: ", error);
      const message = error.response?.data?.message || "Server Error";
      toast.error(message);
    }
  },

  // make repayment (for customer)
  makeRepayment: async function(amount, repaymentId) {
  try {
    const response = await axiosInstance.post(`/api/repayments/make`, {
      amount,
      repaymentId,
    });
    toast.success(response.data.message);
    return true;
  } catch (error) {
    console.error("Error making repayment: ", error);
    const message = error.response?.data?.message || "Server Error";
    toast.error(message);
    return false;
  }
}

  
}));



export default store;
