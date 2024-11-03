import { useNavigate } from "react-router-dom";

function DashBoard() {
const navigate = useNavigate();
    
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="my-12 text-5xl font-semibold">Customer DashBoard</h1>
        <div className="flex flex-col gap-3">
          <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 " onClick={() => navigate("/request-new-loan")}>Apply for New Loan</button>
          <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 " onClick={() => navigate("/loans")}>View All Loans</button>
        </div>
        <div className="flex flex-col items-center px-12 mt-24">
          <h2 className="mb-4 text-2xl font-semibold">Terms and Conditions</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
