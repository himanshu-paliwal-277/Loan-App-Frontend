import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import AdminRegister from "./components/Auth/AdminRegister";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import DashBoard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import { useEffect } from "react";
import store from "./store/state";

function App() {
   // Initialize isAuthenticated based on local storage
   const {isAuthenticated, setIsAuthenticated} = store();
   const { role, setRole } = store();

   useEffect(() => {
     const storedUser = localStorage.getItem("user");
     if (storedUser) {
      setIsAuthenticated(true);
      setRole(JSON.parse(storedUser).role);
     }
     console.log("isAuthenticated: ", isAuthenticated);
     console.log("role: ", role);
   }, [role, isAuthenticated, setIsAuthenticated, setRole]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-register" element={<AdminRegister />} />

        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route
            path="/unauthorized"
            element={<div>Unauthorized Access</div>}
          />
          {/* Customer can access Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="customer">
                <DashBoard />
              </ProtectedRoute>
            }
          />

          {/* Only Admin can access Admin Page */}
          {/* <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
