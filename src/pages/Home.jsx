import { useNavigate } from "react-router-dom";
import Footer from "../components/Common/Footer";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gradient-to-t from-blue-400 to-orange-100">
        <div className="flex items-center justify-center w-full h-screen">
          <div className="flex flex-col items-center mb-16 ">
            <h2 className="text-3xl">Welcome to the</h2>
            <h1 className="mb-4 text-6xl font-bold ">Mini Loan App</h1>
            <p className="">Easly Apply for Loan and Manage Installments</p>
            <button className="px-4 py-2 mt-10 font-bold text-white bg-gray-300 rounded hover:bg-gray-500" onClick={() => navigate("/dashboard")}>
              DashBoard
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-500" onClick={() => navigate("/login")}>Login</button>
          <button className="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-500" onClick={() => navigate("/register")}>Register</button>
          <button className="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-500" onClick={() => navigate("/admin-register")}>Register Admin</button>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
