import { useNavigate } from "react-router-dom";
import Footer from "../components/Common/Footer";
import store from '../store/state';

function Home() {
  const navigate = useNavigate();
  // const {role} = store();
  const {role} = store();

  function handleDashboardButtonClick() {
    role === "admin" ? navigate("/admin/dashboard") : navigate("/dashboard");
  }
  return (
    <>
      <div className="bg-gradient-to-t from-blue-400 to-orange-100">
        <div className="flex items-center justify-center w-full h-screen">
          <div className="flex flex-col items-center mb-16 ">
            <h2 className="text-3xl">Welcome to the</h2>
            <h1 className="mb-4 text-6xl font-bold ">Mini Loan App</h1>
            <p className="">Easly Apply for Loan and Manage Installments</p>
            <button className="px-4 py-2 mt-10 font-bold text-white bg-gray-500 rounded hover:bg-gray-600" onClick={handleDashboardButtonClick}>
              DashBoard
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
