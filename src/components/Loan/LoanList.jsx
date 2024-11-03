import { useEffect, useState } from "react";
import store from "../../store/state";
import { ToastContainer } from "react-toastify";

function LoanList() {
  const { fetchAllLoans } = store();
  const [loans, setLoans] = useState([]);
  const { user } = store(); 

  async function fetchLoans() {
    try {
      const data = await fetchAllLoans();
      console.log(data);
      const loans = data.loans.map(({ amount, term, status }, index) => ({
        s_no: index + 1,
        amount,
        term,
        status,
      }));
      console.log(loans);
      setLoans(loans);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  }

  useEffect(() => {
    fetchLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="my-5 text-3xl font-semibold text-center">{user.name} Loans</h1>
      {loans.length === 0 && <p>No Loans</p>}
      {loans.length > 0 && (
        <table className="w-[60%] mx-auto text-lg shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="flex justify-between w-full py-4 text-white bg-green-500">
              {Object?.keys(loans[0]).map((key) => (
                <th className="w-[20%]  text-center overflow-hidden " key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
              <th className="w-[20%]  text-center overflow-hidden " >Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr className={`flex justify-between items-center w-full py-3 border-b-2 border-gray-100`} key={loan.s_no}>
                <td className="w-[20%] overflow-hidden text-center">{loan.s_no}.</td>
                <td className="w-[20%] text-center overflow-hidden">{loan.amount}$</td>
                <td className="w-[20%] text-center overflow-hidden">{loan.term > 1 ? `${loan.term} weeks` : `${loan.term} week`}</td>
                <td className={`w-[20%] text-center overflow-hidden font-semibold ${loan.status === "pending" ? "text-yellow-500" : loan.status === "approved" ? "text-green-500" : "text-red-500"}`}>{loan.status}</td>
                <td className="w-[20%] text-center overflow-hidden">
                  <button className={`px-3 text-white rounded font-semibold py-[3px] ${loan.status === "pending" ? "bg-yellow-500" : loan.status === "approved" ? "bg-green-500" : "bg-red-500"} ${loan.status === "paid" ? "cursor-not-allowed" : loan.status === "approved" ? "cursor-pointer hover:bg-green-600 active:bg-green-700 " : "cursor-text"}`}>{loan.status === "pending" ? "wait" : loan.status === "approved" ? "pay" : "paid"}</button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ToastContainer position="bottom-right" autoClose={2000} />
      {/* <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            /> */}
    </>
  );
}

export default LoanList;
