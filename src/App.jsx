import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import AdminRegister from "./components/Auth/AdminRegister";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import DashBoard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
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
      </Routes>
    </>
  );
}

export default App;
