import { useNavigate } from "react-router-dom";

function DashBoard() {
const navigate = useNavigate();
    
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="my-12 text-3xl font-semibold sm:text-5xl">Customer DashBoard</h1>
        <div className="flex flex-col gap-3">
          <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 " onClick={() => navigate("/request-new-loan")}>Apply for New Loan</button>
          <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 " onClick={() => navigate("/loans")}>View All Loans</button>
        </div>
        <div className="flex flex-col items-center gap-2 px-6 mt-24 sm:px-12">
          <h2 className="mb-4 text-xl font-semibold sm:text-2xl">Terms and Conditions</h2>
          <p>
            Lorem ipsum dolor sit <span className="hidden sm:block">amet consectetur adipisicing elit.</span>
          </p>
          <p>
            Lorem ipsum dolor sit <span className="hidden sm:block">amet consectetur adipisicing elit.</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
