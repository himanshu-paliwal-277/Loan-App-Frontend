import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import AdminRegister from "./components/Auth/AdminRegister";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import DashBoard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import LoanForm from "./components/Loan/LoanForm";
import LoanList from "./components/Loan/LoanList";

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />

        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          {/* Customer can access Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="customer">
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/request-new-loan"
            element={
              <ProtectedRoute requiredRole="customer">
                <LoanForm />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/loans"
            element={
              <ProtectedRoute requiredRole="customer">
                <LoanList />
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
